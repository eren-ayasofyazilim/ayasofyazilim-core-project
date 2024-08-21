/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
import type { NextRequest } from "next/server";
import { getIdentityServiceClient } from "src/lib";
import { commonDELETE, commonGET, commonPUT } from "../../util";

const clients: Record<string, any> = {
  organizationUser: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async ({
        id,
        maxResultCount = 1000,
      }: {
        id: string;
        maxResultCount: number;
      }) =>
        organization.getApiIdentityOrganizationUnitsByIdMembers({
          id,
          maxResultCount,
        }),
      put: async ({
        id,
        requestBody,
      }: {
        id: string;
        requestBody: { userIds: string[] };
      }) =>
        organization.putApiIdentityOrganizationUnitsByIdMembers({
          id,
          requestBody,
        }),
      delete: async ({ id, memberId }: { id: string; memberId: string }) =>
        organization.deleteApiIdentityOrganizationUnitsByIdMembersByMemberId({
          id,
          memberId,
        }),
    };
  },

  organizationRole: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      get: async ({
        id,
        maxResultCount = 1000,
      }: {
        id: string;
        maxResultCount: number;
      }) =>
        organization.getApiIdentityOrganizationUnitsByIdRoles({
          id,
          maxResultCount,
        }),
      put: async ({
        id,
        requestBody,
      }: {
        id: string;
        requestBody: { roleIds: string[] };
      }) =>
        organization.putApiIdentityOrganizationUnitsByIdRoles({
          id,
          requestBody,
        }),
      delete: async ({ id, roleId }: { id: string; roleId: string }) =>
        organization.deleteApiIdentityOrganizationUnitsByIdRolesByRoleId({
          id,
          roleId,
        }),
    };
  },

  MoveAllUsers: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      put: async ({
        id,
        organizationId,
      }: {
        id: string;
        organizationId: string;
      }) =>
        organization.putApiIdentityOrganizationUnitsByIdMoveAllUsers({
          id,
          organizationId,
        }),
    };
  },

  organizationEdit: async () => {
    const client = await getIdentityServiceClient();
    const organization = client.organizationUnit;
    return {
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        organization.putApiIdentityOrganizationUnitsById({ id, requestBody }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  return commonGET(request, { params }, clients, id);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonDELETE(request, { params }, clients);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonPUT(request, { params }, clients);
}
