import type { NextRequest } from "next/server";
import { getSaasServiceClient } from "src/lib";


export async function GET(request: NextRequest) {
  const client = await getSaasServiceClient(request);
  const tenants = await client.tenant.getApiSaasTenants();
  return new Response(JSON.stringify(tenants));
}



export async function POST(request: NextRequest) {
  const client = await getSaasServiceClient(request);
  const requestBody = await request.json();
  const tenants = await client.tenant.postApiSaasTenants({ requestBody })
  return new Response(JSON.stringify(tenants));
}



export async function DELETE(request: NextRequest) {
  let retVal = "something went wrong";
  const client = await getSaasServiceClient(request);
  const id = await request.json();
  console.log("id from reqest ", id)
  const deleteById = await client.tenant.deleteApiSaasTenantsById({ id })
  if (deleteById === undefined) retVal = "successfull"
  return new Response(JSON.stringify(retVal));
}



export async function PUT(request: NextRequest) {
  const client = await getSaasServiceClient(request);
  const requestBody = await request.json();
  const tenants = await client.tenant.putApiSaasTenantsById({
    id: requestBody.id,
    requestBody: JSON.parse(requestBody.requestBody)
  });
  return new Response(JSON.stringify(tenants));
}

