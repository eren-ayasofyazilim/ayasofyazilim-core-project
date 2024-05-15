import { NextRequest } from "next/server";
import { getIdentityServiceClient } from "src/lib";

export async function GET(request: NextRequest) {
  const client = await getIdentityServiceClient(request);
  const roles = await client.role.getApiIdentityRolesAll();

  return new Response(JSON.stringify(roles));
}

export async function POST(request: NextRequest) {
  const client = await getIdentityServiceClient(request);
  const requestBody = await request.json();
  const roles = await client.role.postApiIdentityRoles({ requestBody })

  return new Response(JSON.stringify(roles));
}


export async function DELETE(request: NextRequest) {
  let retVal =  "something went wrong";
  const client = await getIdentityServiceClient(request);
  const id = await request.json();
  console.log("id from reqest ", id)
  const deleteById = await client.role.deleteApiIdentityRolesById({ id })
  if(deleteById === undefined) retVal = "successfull"

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