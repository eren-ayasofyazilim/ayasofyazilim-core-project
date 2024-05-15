import { Volo_Abp_Account_UpdateProfileDto } from "@ayasofyazilim/saas/AccountService";
import { NextRequest } from "next/server";
import { getAccountServiceClient } from "src/lib";

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Volo_Abp_Account_UpdateProfileDto;
  const client = await getAccountServiceClient(request);
  const response = await client.profile.putApiAccountMyProfile({
    requestBody: body,
  });
  return new Response(JSON.stringify(response));
}
