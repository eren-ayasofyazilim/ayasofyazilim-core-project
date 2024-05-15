import { NextRequest } from "next/server";
import { getAccountServiceClient } from "src/lib";

export async function GET(request: NextRequest) {
  const client = await getAccountServiceClient(request);
  const user = await client.profile.getApiAccountMyProfile();

  return new Response(JSON.stringify(user));
}
