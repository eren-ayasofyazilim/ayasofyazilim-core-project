"use server";
import type {
  GetApiIdentityClaimTypesData,
  GetApiIdentityRolesByIdClaimsData,
  GetApiIdentityUsersByIdClaimsData,
  PutApiIdentityRolesByIdClaimsData,
  PutApiIdentityUsersByIdClaimsData,
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

export async function putRoleClaimsApi(
  body: PutApiIdentityRolesByIdClaimsData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.roles.putRoleClaims(body),
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

export async function putUserClaimsApi(
  body: PutApiIdentityUsersByIdClaimsData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.users.putUserClaims(body),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getUserClaimsApi(
  body: GetApiIdentityUsersByIdClaimsData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.users.getUserClaims(body),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
