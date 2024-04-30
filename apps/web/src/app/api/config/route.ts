import { getAccountServiceClient } from "src/lib";

export async function GET(request: Request) {
  let auth = request.headers.get("Authorization") || "";
  const client = getAccountServiceClient(auth);
  const result =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration(false);
  return new Response(JSON.stringify({ message: result.currentUser }));
}
