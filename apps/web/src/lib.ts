import { AppClient } from "ayasofyazilim-saas";
import { cookies } from "next/headers";

export function getAppClient(): AppClient {
  const cookieStore = cookies();
  const cookie = cookieStore.get("Cookie1");
  return new AppClient({
    BASE: "http://192.168.1.37:44399",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookie?.value || "",
    },
  });
}
