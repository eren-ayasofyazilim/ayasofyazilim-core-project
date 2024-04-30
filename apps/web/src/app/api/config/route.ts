import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
  const client = await getAccountServiceClient();
  const result =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration(false);
  return new Response(JSON.stringify({ message: result.currentUser }));
}
