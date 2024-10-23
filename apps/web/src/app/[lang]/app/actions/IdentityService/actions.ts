"use server";
import type {
  GetApiIdentityClaimTypesData,
  GetApiIdentityRolesByIdClaimsData,
  PutApiIdentityRolesByIdClaimsData,
} from "@ayasofyazilim/saas/IdentityService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getClaimsApi(body: GetApiIdentityClaimTypesData = {}) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.claims.get(body),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function putClaimsApi(body: PutApiIdentityRolesByIdClaimsData) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.roles.putClaims(body),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getRoleClaimsApi(
  body: GetApiIdentityRolesByIdClaimsData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.roles.getRoleClaims(body),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
