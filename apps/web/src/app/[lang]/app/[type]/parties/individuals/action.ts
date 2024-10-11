"use server";
import type { Volo_Abp_Application_Dtos_PagedResultDto_15 } from "@ayasofyazilim/saas/CRMService";
import { getCRMServiceClient, structuredError } from "src/lib";

export async function getPartyRequests(partyType: "individuals") {
  const client = await getCRMServiceClient();
  const partyRequests = {
    individuals: {
      get: async (data: { maxResultCount: number; skipCount: number }) =>
        (await client.individual.getApiCrmServiceIndividuals(
          data,
        )) as Volo_Abp_Application_Dtos_PagedResultDto_15,
    },
  };
  return partyRequests[partyType];
}

export async function getPartyTableData(
  partyType: "individuals",
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
