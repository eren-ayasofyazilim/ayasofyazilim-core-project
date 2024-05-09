import { AccountServiceClient } from "@ayasofyazilim/saas/AccountService";
import { ProjectServiceClient } from "@ayasofyazilim/saas/ProjectService";
import { IdentityServiceClient } from "@ayasofyazilim/saas/IdentityService"
import { auth } from "auth";

export async function getIdentityServiceClient(): IdentityServiceClient {
  const session = await auth();
  const token = session?.accessToken || "";
  return new IdentityServiceClient({
    TOKEN: token,
    BASE: process.env.BASE_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}

export async function getAccountServiceClient(): AccountServiceClient {
  const session = await auth();
  const token = session?.accessToken || "";
  return new AccountServiceClient({
    TOKEN: token,
    BASE: process.env.AUTH_URL,
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
export function getProjectServiceClient(): ProjectServiceClient {
  return new ProjectServiceClient({
    BASE: process.env.PROJECT_SERVICE_URL ?? "",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
export function getProjectServiceDetailClient(): ProjectServiceClient {
  return new ProjectServiceClient({
    BASE: process.env.PROJECT_SERVICE_URL ?? "",
    HEADERS: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  });
}
