import { AccountServiceClient } from "ayasofyazilim-saas/AccountService";
import { ProjectServiceClient } from "ayasofyazilim-saas/ProjectService";
import { cookies } from "next/headers";

export function getAccountServiceClient(token:string): AccountServiceClient {
  console.log("Lib Token ", token, process.env.BASE_URL)
  return new AccountServiceClient({
    TOKEN: token.replace("Bearer ", ""),
    BASE: "http://192.168.1.38:44322",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}
export function getProjectServiceClient(): ProjectServiceClient {
  const cookieStore = cookies();
  return new ProjectServiceClient({
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookieStore.toString(),
    },
  });
}
