const TRANSITIONS = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

function canTransition(from, to) {
 return TRANSITIONS[from]?.includes(to) ?? false;
}

module.exports = { TRANSITIONS, canTransition };