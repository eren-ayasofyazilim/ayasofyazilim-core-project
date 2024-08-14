import { ApiError } from "@ayasofyazilim/saas/AccountService";

export type Clients = Record<string, any>;

export const errorResponse = (message: string, status = 400) =>
  new Response(JSON.stringify({ message }), { status });

export function isApiError(error: unknown): error is ApiError {
  if ((error as ApiError).name === "ApiError") {
    return true;
  }
  return error instanceof ApiError;
}
