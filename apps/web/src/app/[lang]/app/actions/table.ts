"use server";

import { getCRMServiceClient, structuredError } from "src/lib";
import type {
  GetCustomsDTO,
  GetMerchantDTO,
  GetRefundPointDTO,
  GetTaxFreeDTO,
  GetTaxOfficeDTO,
} from "../[type]/parties/types";

export type TableDataTypes = keyof Awaited<
  ReturnType<typeof tableDataRequests>
>;
export async function tableDataRequests() {
  const client = await getCRMServiceClient();
  const tableRequests = {
    merchants: {
      getDetail: async (id: string) =>
        (await client.merchant.getApiCrmServiceMerchantsByIdDetail({ id }))
          .merchant,
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.merchant.getApiCrmServiceMerchants(
          data,
        )) as GetMerchantDTO,
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await client.merchant.getApiCrmServiceMerchantsByIdSubMerchants(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await client.merchant.getApiCrmServiceMerchantsByIdAffiliations(data),
      deleteRow: async (id: string) =>
        await client.merchant.deleteApiCrmServiceMerchantsByIdWithComponents({
          id,
        }),
      getBasicInformation: async (data: { id: string }) =>
        await client.merchant.getApiCrmServiceMerchantsByIdBasicInformation(
          data,
        ),
      getAdresses: async (data: { id: string }) =>
        await client.merchant.getApiCrmServiceMerchantsByIdAddresses(data),
    },
    "refund-points": {
      getDetail: async (id: string) =>
        await client.refundPoint.getApiCrmServiceRefundPointsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.refundPoint.getApiCrmServiceRefundPoints(
          data,
        )) as GetRefundPointDTO,
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await client.refundPoint.getApiCrmServiceRefundPointsByIdSubRefundPoints(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await client.refundPoint.getApiCrmServiceRefundPointsByIdAffiliations(
          data,
        ),
      deleteRow: async (id: string) =>
        await client.refundPoint.deleteApiCrmServiceRefundPointsByIdWithComponents(
          {
            id,
          },
        ),
    },
    customs: {
      getDetail: async (id: string) =>
        await client.customs.getApiCrmServiceCustomsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.customs.getApiCrmServiceCustoms(data)) as GetCustomsDTO,
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) => await client.customs.getApiCrmServiceCustomsByIdSubCustoms(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) => await client.customs.getApiCrmServiceCustomsByIdAffiliations(data),
      deleteRow: async (id: string) =>
        await client.customs.deleteApiCrmServiceCustomsByIdWithComponents({
          id,
        }),
    },
    "tax-free": {
      getDetail: async (id: string) =>
        await client.taxFree.getApiCrmServiceTaxFreesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.taxFree.getApiCrmServiceTaxFrees(data)) as GetTaxFreeDTO,
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) => await client.taxFree.getApiCrmServiceTaxFreesByIdSubTaxFree(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) => await client.taxFree.getApiCrmServiceTaxFreesByIdAffiliations(data),

      deleteRow: async (id: string) =>
        await client.taxFree.deleteApiCrmServiceTaxFreesByIdWithComponents({
          id,
        }),
    },
    "tax-offices": {
      getDetail: async (id: string) =>
        await client.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.taxOffice.getApiCrmServiceTaxOffices(
          data,
        )) as GetTaxOfficeDTO,
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await client.taxOffice.getApiCrmServiceTaxOfficesByIdSubTaxOffices(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await client.taxOffice.getApiCrmServiceTaxOfficesByIdAffiliations(data),

      deleteRow: async (id: string) =>
        await client.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents({
          id,
        }),
    },
    individuals: {
      getDetail: async (id: string) =>
        await client.individual.getApiCrmServiceIndividualsById({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.individual.getApiCrmServiceIndividuals(
          data,
        )) as GetTaxOfficeDTO,
      deleteRow: async (id: string) =>
        await client.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents({
          id,
        }),
    },
  };

  return tableRequests;
}

export async function getTableData(
  type: TableDataTypes,
  page = 0,
  maxResultCount = 10,
) {
  try {
    const requests = await tableDataRequests();
    return {
      type: "success",
      data: await requests[type].get({
        maxResultCount,
        skipCount: page * 10,
      }),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteTableRow(type: TableDataTypes, id: string) {
  try {
    const requests = await tableDataRequests();
    return {
      type: "success",
      data: await requests[type].deleteRow(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getTableDataDetail(type: TableDataTypes, id: string) {
  try {
    const requests = await tableDataRequests();
    return {
      type: "success",
      data: await requests[type].getDetail(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
