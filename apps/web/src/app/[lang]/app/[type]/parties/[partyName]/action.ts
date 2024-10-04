import { getCRMServiceClient } from "src/lib";

export async function getPartyRequests() {
  const client = await getCRMServiceClient();
  return {
    merchants: {
      get: async (id: string) =>
        (await client.merchant.getApiCrmServiceMerchantsByIdDetail({ id }))
          .merchant,
    },
    "refund-points": {
      get: async (id: string) =>
        client.refundPoint.getApiCrmServiceRefundPointsByIdDetail({ id }),
    },
    customs: {
      get: async (id: string) =>
        client.customs.getApiCrmServiceCustomsByIdDetail({ id }),
    },
    "tax-free": {
      get: async (id: string) =>
        client.taxFree.getApiCrmServiceTaxFreesByIdDetail({ id }),
    },
    "tax-office": {
      get: async (id: string) =>
        client.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({ id }),
    },
  };
}

export async function getPartyDetail(partyType: string, partyId: string) {
  const client = await getPartyRequests();
  try {
    const response =
      await client[partyType as keyof typeof client].get(partyId);
    return response;
  } catch (error) {
    return null;
  }
}
