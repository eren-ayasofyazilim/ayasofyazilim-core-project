"use server";

import type {
  GetApiContractServiceMerchantsByIdContractsContractHeadersData,
  PostApiContractServiceMerchantsByIdContractsContractHeadersData,
} from "@ayasofyazilim/saas/ContractService";
import type {
  GetApiCrmServiceMerchantsData,
  GetApiCrmServiceTaxOfficesData,
  PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
  PutApiCrmServiceMerchantsByIdData,
} from "@ayasofyazilim/saas/CRMService";
import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCountriesData,
} from "@ayasofyazilim/saas/LocationService";
import type { GetApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import type { FilterColumnResult } from "@repo/ayasofyazilim-ui/molecules/tables";
import {
  getContractServiceClient,
  getCRMServiceClient,
  getLocationServiceClient,
  getTravellersServiceClient,
  structuredError,
} from "src/lib";

export type ApiRequestTypes = keyof Awaited<ReturnType<typeof getApiRequests>>;
export type GetTableDataTypes = Exclude<ApiRequestTypes, "locations">;
export type DeleteTableDataTypes = Exclude<
  ApiRequestTypes,
  "travellers" | "locations"
>;
export type GetDetailTableDataTypes = Exclude<
  ApiRequestTypes,
  "travellers" | "locations"
>;

export async function getApiRequests() {
  const crmClient = await getCRMServiceClient();
  const travellerClient = await getTravellersServiceClient();
  const contractsClient = await getContractServiceClient();
  const locationClient = await getLocationServiceClient();
  const tableRequests = {
    merchants: {
      getDetail: async (id: string) =>
        (await crmClient.merchant.getApiCrmServiceMerchantsByIdDetail({ id }))
          .merchant,
      get: async (data: GetApiCrmServiceMerchantsData) =>
        await crmClient.merchant.getApiCrmServiceMerchants(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdSubMerchants(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdAffiliations(
          data,
        ),
      deleteRow: async (id: string) =>
        await crmClient.merchant.deleteApiCrmServiceMerchantsByIdWithComponents(
          {
            id,
          },
        ),
      getBasicInformation: async (data: { id: string }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdBasicInformation(
          data,
        ),
      getAdresses: async (data: { id: string }) =>
        await crmClient.merchant.getApiCrmServiceMerchantsByIdAddresses(data),
      getContractHeadersByMerchantId: async (
        data: GetApiContractServiceMerchantsByIdContractsContractHeadersData,
      ) =>
        await contractsClient.contractsMerchant.getApiContractServiceMerchantsByIdContractsContractHeaders(
          data,
        ),
      postContractHeadersById: async (
        data: PostApiContractServiceMerchantsByIdContractsContractHeadersData,
      ) =>
        await contractsClient.contractsMerchant.postApiContractServiceMerchantsByIdContractsContractHeaders(
          data,
        ),
      getContractHeaderMissingStepsById: async (id: string) =>
        await contractsClient.contractsMerchant.getApiContractServiceMerchantsContractsContractHeadersByIdGetMissingSteps(
          { id },
        ),
      getContractHeaderById: async (id: string) =>
        await contractsClient.contractsMerchant.getApiContractServiceMerchantsContractsContractHeadersById(
          { id },
        ),
      putMerchantBase: async (form: PutApiCrmServiceMerchantsByIdData) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsById({
          requestBody: form.requestBody,
          id: form.id,
        });
      },
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.merchant.putApiCrmServiceMerchantsByIdAddressesByAddressId(
          {
            requestBody: form.requestBody,
            addressId: form.addressId,
            id: form.id,
          },
        );
      },
    },
    "refund-points": {
      getDetail: async (id: string) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdDetail({
          id,
        }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPoints(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdSubRefundPoints(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdAffiliations(
          data,
        ),
      deleteRow: async (id: string) =>
        await crmClient.refundPoint.deleteApiCrmServiceRefundPointsByIdWithComponents(
          {
            id,
          },
        ),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.refundPoint.putApiCrmServiceRefundPointsByIdAddressesByAddressId(
          {
            requestBody: form.requestBody,
            addressId: form.addressId,
            id: form.id,
          },
        );
      },
    },
    customs: {
      getDetail: async (id: string) =>
        await crmClient.customs.getApiCrmServiceCustomsByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        await crmClient.customs.getApiCrmServiceCustoms(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) => await crmClient.customs.getApiCrmServiceCustomsByIdSubCustoms(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.customs.getApiCrmServiceCustomsByIdAffiliations(data),
      deleteRow: async (id: string) =>
        await crmClient.customs.deleteApiCrmServiceCustomsByIdWithComponents({
          id,
        }),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.customs.putApiCrmServiceCustomsByIdAddressesByAddressId(
          {
            requestBody: form.requestBody,
            addressId: form.addressId,
            id: form.id,
          },
        );
      },
    },
    "tax-free": {
      getDetail: async (id: string) =>
        await crmClient.taxFree.getApiCrmServiceTaxFreesByIdDetail({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        await crmClient.taxFree.getApiCrmServiceTaxFrees(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxFree.getApiCrmServiceTaxFreesByIdSubTaxFree(data),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxFree.getApiCrmServiceTaxFreesByIdAffiliations(data),

      deleteRow: async (id: string) =>
        await crmClient.taxFree.deleteApiCrmServiceTaxFreesByIdWithComponents({
          id,
        }),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.taxFree.putApiCrmServiceTaxFreesByIdAddressesByAddressId(
          {
            requestBody: form.requestBody,
            addressId: form.addressId,
            id: form.id,
          },
        );
      },
    },
    "tax-offices": {
      getDetail: async (id: string) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({ id }),
      get: async (data: GetApiCrmServiceTaxOfficesData = {}) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOffices(data),
      getSubCompanies: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdSubTaxOffices(
          data,
        ),
      getIndivuals: async (data: {
        id: string;
        maxResultCount: number;
        skipCount: number;
      }) =>
        await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdAffiliations(
          data,
        ),

      deleteRow: async (id: string) =>
        await crmClient.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents(
          {
            id,
          },
        ),
      putAddress: async (
        form: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
      ) => {
        return await crmClient.taxOffice.putApiCrmServiceTaxOfficesByIdAddressesByAddressId(
          {
            requestBody: form.requestBody,
            addressId: form.addressId,
            id: form.id,
          },
        );
      },
    },
    individuals: {
      getDetail: async (id: string) =>
        await crmClient.individual.getApiCrmServiceIndividualsById({ id }),
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        await crmClient.individual.getApiCrmServiceIndividuals(data),
      deleteRow: async (id: string) =>
        await crmClient.taxOffice.deleteApiCrmServiceTaxOfficesByIdWithComponents(
          {
            id,
          },
        ),
    },
    locations: {
      getCountries: async (data: GetApiLocationServiceCountriesData) =>
        await locationClient.country.getApiLocationServiceCountries(data),
      getCities: async (data: GetApiLocationServiceCitiesData) =>
        await locationClient.city.getApiLocationServiceCities(data),
    },

    travellers: {
      get: async (data: GetApiTravellerServiceTravellersData) =>
        await travellerClient.traveller.getApiTravellerServiceTravellers(data),
    },
  };
  return tableRequests;
}
export async function getTableData(
  type: GetTableDataTypes,
  page = 0,
  maxResultCount = 10,
  filter?: FilterColumnResult,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests[type].get({
        maxResultCount,
        skipCount: page * 10,
        ...filter,
      }),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteTableRow(type: DeleteTableDataTypes, id: string) {
  try {
    const requests = await getApiRequests();
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
export async function getTableDataDetail(
  type: GetDetailTableDataTypes,
  id: string,
) {
  try {
    const requests = await getApiRequests();
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
