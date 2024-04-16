import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
  const client = getAccountServiceClient();
  const user = await client.profile.getApiAccountMyProfile();
  return new Response(JSON.stringify(user));
}
