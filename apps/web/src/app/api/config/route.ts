import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
  const client = getAccountServiceClient();

  const config =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration();
  return new Response(JSON.stringify(config));
}
