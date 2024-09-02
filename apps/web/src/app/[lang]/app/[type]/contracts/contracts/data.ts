export const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    company: { type: "string" },
    businessId: { type: "string" },
    daysForBilling: { type: "string" },
    termsOfPayment: { type: "number" },
    deliveryFee: { type: "boolean" },
    factoring: { type: "boolean" },
    active: { type: "boolean" },
    stores: { type: "number" },
    createdOn: { type: "date" },
  },
};
