"use server";

import type {
  ApiError,
  DeleteApiContractServiceRefundTablesRefundTableHeadersData,
  GetApiContractServiceRefundTablesRefundTableHeadersData,
  GetApiContractServiceRefundTablesRefundTableHeadersDetailByIdData,
  PostApiContractServiceRefundTablesRefundTableHeadersData,
  PutApiContractServiceRefundTablesRefundTableHeadersData,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import { getContractServiceClient } from "src/lib";

export async function getRefundTableHeadersServer(
  body: GetApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  const response = await getContractServiceClient().then((client) =>
    client.refundTables
      .getApiContractServiceRefundTablesRefundTableHeaders(body)
      .then((apiResponse) => {
        return {
          data: apiResponse,
          status: 200,
        };
      })
      .catch((error: ApiError) => {
        return {
          data: error,
          status: error.status,
        };
      }),
  );
  revalidatePath("/");
  return response;
}
export async function postRefundTableHeadersServer(
  body: PostApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  const response = await getContractServiceClient().then((client) =>
    client.refundTables
      .postApiContractServiceRefundTablesRefundTableHeaders(body)
      .then((apiResponse) => {
        return {
          data: apiResponse,
          status: 200,
        };
      })
      .catch((error: ApiError) => {
        return {
          data: error,
          status: error.status,
        };
      }),
  );
  revalidatePath("/");
  return response;
}
export async function putRefundTableHeadersServer(
  body: PutApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  const response = await getContractServiceClient().then((client) =>
    client.refundTables
      .putApiContractServiceRefundTablesRefundTableHeaders(body)
      .then((apiResponse) => {
        return {
          data: apiResponse,
          status: 200,
        };
      })
      .catch((error: ApiError) => {
        return {
          data: error,
          status: error.status,
        };
      }),
  );
  revalidatePath("/");
  return response;
}
export async function deleteRefundTableHeadersServer(
  body: DeleteApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  const response = await getContractServiceClient().then((client) =>
    client.refundTables
      .deleteApiContractServiceRefundTablesRefundTableHeaders(body)
      .then((apiResponse) => {
        return {
          data: apiResponse,
          status: 200,
        };
      })
      .catch((error: ApiError) => {
        return {
          data: error,
          status: error.status,
        };
      }),
  );
  revalidatePath("/");
  return response;
}

export async function getRefundTableHeadersByIdServer(
  body: GetApiContractServiceRefundTablesRefundTableHeadersDetailByIdData,
) {
  "use server";
  const response = await getContractServiceClient().then((client) =>
    client.refundTables
      .getApiContractServiceRefundTablesRefundTableHeadersDetailById(body)
      .then((apiResponse) => {
        return {
          data: apiResponse,
          status: 200,
        };
      })
      .catch((error: ApiError) => {
        return {
          data: error,
          status: error.status,
        };
      }),
  );
  revalidatePath("/");
  return response;
}

export async function getRefundTableHeadersDetailByIdServer(
  body: GetApiContractServiceRefundTablesRefundTableHeadersDetailByIdData,
) {
  "use server";
  const response = await getContractServiceClient().then((client) =>
    client.refundTables
      .getApiContractServiceRefundTablesRefundTableHeadersDetailById(body)
      .then((apiResponse) => {
        return {
          data: apiResponse,
          status: 200,
        };
      })
      .catch((error: ApiError) => {
        return {
          data: error,
          status: error.status,
        };
      }),
  );
  revalidatePath("/");
  return response;
}
