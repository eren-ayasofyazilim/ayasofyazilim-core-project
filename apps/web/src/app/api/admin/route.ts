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
