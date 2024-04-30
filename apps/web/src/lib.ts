import { AccountServiceClient } from "ayasofyazilim-saas/AccountService";
import { ProjectServiceClient } from "ayasofyazilim-saas/ProjectService";
import { cookies } from "next/headers";

export function getAccountServiceClient(token:string = ""): AccountServiceClient {
  return new AccountServiceClient({
    TOKEN: token?.replace("Bearer ", "") || "",
    BASE: process.env.AUTH_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Cookie": cookies().toString(),
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
