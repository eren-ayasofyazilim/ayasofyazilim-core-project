import { AccountServiceClient } from "ayasofyazilim-saas/AccountService";
import { ProjectServiceClient } from "ayasofyazilim-saas/ProjectService";
import { cookies } from "next/headers";

export function getAccountServiceClient(): AccountServiceClient {
  const cookieStore = cookies();
  return new AccountServiceClient({
    BASE: "http://192.168.1.37:44399",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookieStore.toString(),
    },
  });
}
export function getProjectServiceClient(): ProjectServiceClient {
  const cookieStore = cookies();
  return new ProjectServiceClient({
    BASE: "http://192.168.1.37:44399",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookieStore.toString(),
    },
  });
}
