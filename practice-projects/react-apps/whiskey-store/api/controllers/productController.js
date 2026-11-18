const productSchema = require("../validators/productValidator");
const productQuerySchema = require("../validators/productQueryValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");
const logger = require("../utils/logger");

// Every filter the list understands, as [query key, Prisma field].
const LIST_FACETS = [
  ["style", "style"],
  ["brand", "brand"],
  ["country", "country"],
  ["region", "region"],
  ["age", "ageYears"],
  ["volume", "volumeMl"],
];
const BOOLEAN_FILTERS = ["peated", "giftBox", "inStock"];

const SORT_MAP = {
  name_asc: [{ name: "asc" }],
  name_desc: [{ name: "desc" }],
  price_asc: [{ priceCents: "asc" }],
  price_desc: [{ priceCents: "desc" }],
  age_desc: [{ ageYears: { sort: "desc", nulls: "last" } }],
  rating_desc: [{ rating: "desc" }, { reviewCount: "desc" }],
  newest: [{ createdAt: "desc" }],
};

// Builds the Prisma `where` from validated query params.
// `omitFacet` skips one facet, so that facet's counts reflect every OTHER
// active filter (standard e-commerce behaviour: picking "Islay" doesn't hide
// the other regions, it just updates their counts).
function buildWhere(q, omitFacet) {
  const and = [];

  if (q.search) {
    const contains = { contains: q.search, mode: "insensitive" };
    and.push({
      OR: [{ name: contains }, { brand: contains }, { region: contains }],
    });
  }

  for (const [key, field] of LIST_FACETS) {
    if (key !== omitFacet && q[key]?.length) {
      and.push({ [field]: { in: q[key] } });
    }
  }

  for (const key of BOOLEAN_FILTERS) {
    if (q[key] !== undefined) and.push({ [key]: q[key] });
  }

  if (q.onSale !== undefined) {
    and.push({
      compareAtPriceCents: q.onSale ? { not: null } : null,
    });
  }

  if (q.minPrice !== undefined) {
    and.push({ priceCents: { gte: Math.round(q.minPrice * 100) } });
  }
  if (q.maxPrice !== undefined) {
    and.push({ priceCents: { lte: Math.round(q.maxPrice * 100) } });
  }

  return { AND: and };
}

function validateQuery(query) {
  return productQuerySchema.validate(query, { abortEarly: false });
}

exports.getProducts = async (req, res, next) => {
  const { value: q, error } = validateQuery(req.query);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  try {
    const where = buildWhere(q);
    const skip = (q.page - 1) * q.limit;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        // `id` as the last key = a stable order, so offset pagination never
        // shows the same product on two pages when sort values tie.
        orderBy: [...SORT_MAP[q.sort], { id: "asc" }],
        skip,
        take: q.limit,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      data,
      total,
      page: q.page,
      limit: q.limit,
      totalPages: Math.ceil(total / q.limit),
    });
  } catch (err) {
    logger.error("Get products failed", { errorMessage: err.message });
    return next(new CustomError("Get products failed", 500));
  }
};

// Facet options with counts, computed against the same filters as the list.
// The UI sends its current filters here too, so counts update as you filter.
exports.getFilters = async (req, res, next) => {
  const { value: q, error } = validateQuery(req.query);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  try {
    const facetQueries = LIST_FACETS.map(([key, field]) =>
      prisma.product.groupBy({
        by: [field],
        where: buildWhere(q, key),
        _count: { _all: true },
        orderBy: { [field]: "asc" },
      }),
    );

    // Price bounds come from the whole catalog, so the slider range is stable.
    const priceBounds = prisma.product.aggregate({
      _min: { priceCents: true },
      _max: { priceCents: true },
    });

    const [groups, bounds] = await Promise.all([
      Promise.all(facetQueries),
      priceBounds,
    ]);

    const facets = {};
    LIST_FACETS.forEach(([key, field], i) => {
      facets[key] = groups[i]
        .filter((g) => g[field] !== null)
        .map((g) => ({ value: g[field], count: g._count._all }));
    });

    res.json({
      facets,
      priceRange: {
        min: Math.floor((bounds._min.priceCents ?? 0) / 100),
        max: Math.ceil((bounds._max.priceCents ?? 0) / 100),
      },
    });
  } catch (err) {
    logger.error("Get filters failed", { errorMessage: err.message });
    return next(new CustomError("Get filters failed", 500));
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { reviews: true },
    });
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    res.json(product);
  } catch (err) {
    return next(new CustomError("Get Product by id failed", 500));
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const product = await prisma.product.create({
      data: value,
    });
    res.status(201).json(product);
  } catch (err) {
    if (err.code === "P2002") {
      return next(new CustomError("Slug already in use", 409));
    }
    return next(new CustomError("Create product failed", 500));
  }
};

exports.putProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: value,
    });

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return next(new CustomError("Slug already in use", 409));
    }
    if (err.code === "P2025") {
      return next(new CustomError("Product not found", 404));
    }
    return next(new CustomError("Update product failed", 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    if (err.code === "P2025") {
      return next(new CustomError("Product not found", 404));
    }
    return next(new CustomError("Delete product failed", 500));
  }
};
