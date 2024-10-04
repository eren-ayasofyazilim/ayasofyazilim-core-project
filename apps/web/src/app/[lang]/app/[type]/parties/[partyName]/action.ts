"use server";
import { getCRMServiceClient } from "src/lib";
import type { PartyNameType } from "../table-data";

export async function getPartyRequests() {
  const client = await getCRMServiceClient();
  return {
    merchants: {
      getDetail: async (id: string) =>
        (await client.merchant.getApiCrmServiceMerchantsByIdDetail({ id }))
          .merchant,
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        client.merchant.getApiCrmServiceMerchants(data),
      deleteRow: async (id: string) =>
        client.merchant.deleteApiCrmServiceMerchantsByIdWithComponents({
          id,
        }),
    },
    "refund-points": {
      getDetail: async (id: string) =>
        client.refundPoint.getApiCrmServiceRefundPointsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        client.refundPoint.getApiCrmServiceRefundPoints(data),
      deleteRow: async (id: string) =>
        client.refundPoint.deleteApiCrmServiceRefundPointsByIdWithComponents({
          id,
        }),
    },
    customs: {
      getDetail: async (id: string) =>
        client.customs.getApiCrmServiceCustomsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        client.customs.getApiCrmServiceCustoms(data),
      deleteRow: async (id: string) =>
        client.customs.deleteApiCrmServiceCustomsByIdWithComponents({
          id,
        }),
    },
    "tax-free": {
      getDetail: async (id: string) =>
        client.taxFree.getApiCrmServiceTaxFreesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        client.taxFree.getApiCrmServiceTaxFrees(data),
      deleteRow: async (id: string) =>
        client.taxFree.deleteApiCrmServiceTaxFreesByIdWithComponents({
          id,
        }),
    },
    "tax-offices": {
      getDetail: async (id: string) =>
        client.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        client.taxOffice.getApiCrmServiceTaxOffices(data),
      deleteRow: async (id: string) =>
        client.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents({
          id,
        }),
    },
  };
}

export async function getPartyTableData(
  partyType: PartyNameType,
  page: number,
  maxResultCount: number,
) {
  const client = await getPartyRequests();
  try {
    const response = await client[partyType].get({
      maxResultCount: Number(maxResultCount) || 10,
      skipCount: page * 10,
    });
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return catchError(error);
  }
}
export async function getPartyDetail(
  partyType: PartyNameType,
  partyId: string,
) {
  const client = await getPartyRequests();
  try {
    const response = await client[partyType].getDetail(partyId);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return catchError(error);
  }
}
export async function deletePartyRow(
  partyType: PartyNameType,
  partyId: string,
) {
  const client = await getPartyRequests();
  try {
    const response = await client[partyType].deleteRow(partyId);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return catchError(error);
  }
}

function catchError(error: unknown) {
  return {
    type: "error",
    data: null,
    status: 500,
    message:
      (error as { statusText?: string }).statusText || "An error occurred",
  };
}
