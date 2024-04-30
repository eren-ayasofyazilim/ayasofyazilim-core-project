import { getAccountServiceClient } from "src/lib";
import { auth as nextAuth } from "auth";

export async function GET(request: Request) {
  const session = await nextAuth();
  let token = session?.accessToken || "";
  const client = await getAccountServiceClient(token);
  const result =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration(false);
  return new Response(JSON.stringify({ message: result.currentUser }));
}
