import type { NextRequest } from "next/server";
import { getAccountServiceClient } from "src/lib";

export async function GET(request: NextRequest) {
  const client = await getAccountServiceClient();
  const result =
    await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration({
      includeLocalizationResources: false,
    });
  return new Response(JSON.stringify({ message: result.currentUser }));
}
