"use server";
import { getCRMServiceClient, structuredError } from "src/lib";
import type {
  CreateCustomsDTO,
  CreateMerchantDTO,
  CreateRefundPointDTO,
  CreateTaxFreeDTO,
  CreateTaxOfficeDTO,
  GetCustomsDTO,
  GetMerchantDTO,
  GetRefundPointDTO,
  GetTaxFreeDTO,
  GetTaxOfficeDTO,
  PartiesCreateDTOType,
  PartyNameType,
} from "../types";

export async function getPartyRequests(partyType: PartyNameType) {
  const client = await getCRMServiceClient();
  const partyRequests = {
    merchants: {
      getDetail: async (id: string) =>
        (await client.merchant.getApiCrmServiceMerchantsByIdDetail({ id }))
          .merchant,
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.merchant.getApiCrmServiceMerchants(
          data,
        )) as GetMerchantDTO,
      getSub: async (id: string) =>
        await client.merchant.getApiCrmServiceMerchantsByIdSubMerchants({
          id,
        }),
      deleteRow: async (id: string) =>
        await client.merchant.deleteApiCrmServiceMerchantsByIdWithComponents({
          id,
        }),
      post: async (data: PartiesCreateDTOType) =>
        await client.merchant.postApiCrmServiceMerchantsWithComponents({
          requestBody: data as CreateMerchantDTO,
        }),
    },
    "refund-points": {
      getDetail: async (id: string) =>
        await client.refundPoint.getApiCrmServiceRefundPointsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.refundPoint.getApiCrmServiceRefundPoints(
          data,
        )) as GetRefundPointDTO,
      getSub: async (id: string) =>
        await client.refundPoint.getApiCrmServiceRefundPointsByIdSubRefundPoints(
          { id },
        ),
      deleteRow: async (id: string) =>
        await client.refundPoint.deleteApiCrmServiceRefundPointsByIdWithComponents(
          {
            id,
          },
        ),
      post: async (data: PartiesCreateDTOType) =>
        await client.refundPoint.postApiCrmServiceRefundPointsWithComponents({
          requestBody: data as CreateRefundPointDTO,
        }),
    },
    customs: {
      getDetail: async (id: string) =>
        await client.customs.getApiCrmServiceCustomsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.customs.getApiCrmServiceCustoms(data)) as GetCustomsDTO,
      getSub: async (id: string) =>
        await client.customs.getApiCrmServiceCustomsByIdSubCustoms({ id }),
      deleteRow: async (id: string) =>
        await client.customs.deleteApiCrmServiceCustomsByIdWithComponents({
          id,
        }),
      post: async (data: PartiesCreateDTOType) =>
        await client.customs.postApiCrmServiceCustomsWithComponents({
          requestBody: data as CreateCustomsDTO,
        }),
    },
    "tax-free": {
      getDetail: async (id: string) =>
        await client.taxFree.getApiCrmServiceTaxFreesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.taxFree.getApiCrmServiceTaxFrees(data)) as GetTaxFreeDTO,
      getSub: async (id: string) =>
        await client.taxFree.getApiCrmServiceTaxFreesByIdSubTaxFree({ id }),
      deleteRow: async (id: string) =>
        await client.taxFree.deleteApiCrmServiceTaxFreesByIdWithComponents({
          id,
        }),
      post: async (data: PartiesCreateDTOType) =>
        await client.taxFree.postApiCrmServiceTaxFreesWithComponents({
          requestBody: data as CreateTaxFreeDTO,
        }),
    },
    "tax-offices": {
      getDetail: async (id: string) =>
        await client.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.taxOffice.getApiCrmServiceTaxOffices(
          data,
        )) as GetTaxOfficeDTO,
      getSub: async (id: string) =>
        await client.taxOffice.getApiCrmServiceTaxOfficesByIdSubTaxOffices({
          id,
        }),
      deleteRow: async (id: string) =>
        await client.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents({
          id,
        }),
      post: async (data: PartiesCreateDTOType) =>
        await client.taxOffice.postApiCrmServiceTaxOfficesWithComponents({
          requestBody: data as CreateTaxOfficeDTO,
        }),
    },
  };
  return partyRequests[partyType];
}

export async function getPartyTableData(
  partyType: PartyNameType,
  page: number,
  maxResultCount: number,
) {
  const client = await getPartyRequests(partyType);
  try {
    const response = await client.get({
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
    return structuredError(error);
  }
}
export async function getPartySubTableData(
  partyType: PartyNameType,
  partyId: string,
) {
  const client = await getPartyRequests(partyType);
  try {
    const response = await client.getSub(partyId);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getPartyDetail(
  partyType: PartyNameType,
  partyId: string,
) {
  const client = await getPartyRequests(partyType);
  try {
    const response = await client.getDetail(partyId);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function deletePartyRow(
  partyType: PartyNameType,
  partyId: string,
) {
  const client = await getPartyRequests(partyType);
  try {
    const response = await client.deleteRow(partyId);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function createPartyRow(
  partyType: PartyNameType,
  data: PartiesCreateDTOType,
) {
  const client = await getPartyRequests(partyType);
  try {
    const response = await client.post(data);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
