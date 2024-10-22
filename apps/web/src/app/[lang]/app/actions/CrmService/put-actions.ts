"use server";

import type {
  PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
  PutApiCrmServiceMerchantsByIdData,
} from "@ayasofyazilim/saas/CRMService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function putMerchantBaseApi(
  data: PutApiCrmServiceMerchantsByIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests.merchants.putMerchantBase(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function putCrmAddressApi(
  partyName:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-offices"
    | "tax-free",
  data: PutApiCrmServiceMerchantsByIdAddressesByAddressIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success" as const,
      data: await requests[partyName].putAddress(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
