import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  token: process.env.REACT_APP_SANITY_TOKEN,
  dataset: "production",
  apiVersion: "2024-02-06",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
