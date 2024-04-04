"use server";
import { AccountServiceClient } from "ayasofyazilim-saas/AccountService";
import { cookies } from "next/headers";

const appClient = new AccountServiceClient({
  BASE: "http://192.168.1.37:44399",
});

export async function GET(request: Request) {
  // get search params from request
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";
  // Use the client instance to make the API call
  const response =
    await appClient.abpApplicationLocalization.getApiAbpApplicationLocalization(
      lang
    );

  // set cookie
  cookies().set("locale", lang);
  // return response as json
  return new Response(JSON.stringify(response));
}
