import { getIdentityServiceClient } from "src/lib";

export async function GET(request: Request) {
  const client = await getIdentityServiceClient();
  const roles = await client.role.getApiIdentityRolesAll();

  return new Response(JSON.stringify(roles));
}

export async function POST(request: Request) {
  const client = await getIdentityServiceClient();
  const requestBody = await request.json();
  const roles = await client.role.postApiIdentityRoles({ requestBody })

  return new Response(JSON.stringify(roles));
}


export async function DELETE(request: Request) {
  let retVal =  "something went wrong";
  const client = await getIdentityServiceClient();
  const id = await request.json();
  console.log("id from reqest ", id)
  const deleteById = await client.role.deleteApiIdentityRolesById({ id })
  if(deleteById === undefined) retVal = "successfull"

  return new Response(JSON.stringify(retVal));
}
