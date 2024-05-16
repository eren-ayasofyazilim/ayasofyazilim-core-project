import { Volo_Abp_Identity_IdentityRoleCreateDto, Volo_Abp_Identity_IdentityRoleUpdateDto } from "@ayasofyazilim/saas/IdentityService";
import { NextRequest } from "next/server";
import { getIdentityServiceClient } from "src/lib";

const config = {
  role: {
    client: async (req: NextRequest) => getIdentityServiceClient(req),
    get: async (req: NextRequest) => (await config.role.client(req)).role.getApiIdentityRolesAll(),
    put: (req: NextRequest, id: string, requestBody: Volo_Abp_Identity_IdentityRoleUpdateDto | undefined) => getIdentityServiceClient(req).role.putApiIdentityRolesById({
      id: id,
      requestBody: requestBody
    }),
    post: (req: NextRequest, requestBody: Volo_Abp_Identity_IdentityRoleCreateDto | undefined) => getIdentityServiceClient(req).role.postApiIdentityRoles({ requestBody }),
    delete: (req: NextRequest, id: string) => getIdentityServiceClient(req).role.deleteApiIdentityRolesById({ id })
  }
}

export async function GET(request: NextRequest) {
  const roles = await config["role"].get(request);
  console.log("roles from get ", roles);
  return new Response(JSON.stringify(roles));
}

export async function POST(request: NextRequest) {
  const client = await getIdentityServiceClient(request);
  const requestBody = await request.json();
  const roles = await client.role.postApiIdentityRoles({ requestBody })

  return new Response(JSON.stringify(roles));
}


export async function DELETE(request: NextRequest) {
  let retVal = "something went wrong";
  const client = await getIdentityServiceClient(request);
  const id = await request.json();
  console.log("id from reqest ", id)
  const deleteById = await client.role.deleteApiIdentityRolesById({ id })
  if (deleteById === undefined) retVal = "successfull"

  return new Response(JSON.stringify(retVal));
}

export async function PUT(request: NextRequest) {
  const client = await getIdentityServiceClient(request);
  const requestBody = await request.json();
  const roles = await client.role.putApiIdentityRolesById({
    id: requestBody.id,
    requestBody: JSON.parse(requestBody.requestBody)
  });

  return new Response(JSON.stringify(roles));
}