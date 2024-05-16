import { Volo_Abp_Identity_IdentityRoleCreateDto, Volo_Abp_Identity_IdentityRoleUpdateDto } from "@ayasofyazilim/saas/IdentityService";
import { NextRequest } from "next/server";
import { getIdentityServiceClient } from "src/lib";


const clients = {
  role: async (req: NextRequest) => {
    const client = await getIdentityServiceClient(req);
    const role = client.role;
    return {
      get: async () => role.getApiIdentityRolesAll(),
      post: async (requestBody: Volo_Abp_Identity_IdentityRoleCreateDto) => role.postApiIdentityRoles({ requestBody }),
      put: async (id: string, requestBody: Volo_Abp_Identity_IdentityRoleUpdateDto) => role.putApiIdentityRolesById({ id, requestBody }),
      delete: async (id: string) => role.deleteApiIdentityRolesById({ id })
    }
  }
}

export async function GET(request: NextRequest) {
  const client = await clients["role"](request);
  const data = await client.get();
  return new Response(JSON.stringify(data));
}

export async function POST(request: NextRequest) {
  const client = await clients["role"](request);
  const requestBody = await request.json();
  const roles = await client.post(requestBody)

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