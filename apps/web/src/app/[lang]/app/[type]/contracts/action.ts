"use server";

import type {
  ApiError,
  DeleteApiContractServiceRefundTablesRefundTableDetailsData,
  DeleteApiContractServiceRefundTablesRefundTableHeadersData,
  GetApiContractServiceRefundTablesRefundTableHeadersByIdData,
  GetApiContractServiceRefundTablesRefundTableHeadersData,
  GetApiContractServiceRefundTablesRefundTableHeadersDetailByIdData,
  PostApiContractServiceRefundTablesRefundTableDetailsData,
  PostApiContractServiceRefundTablesRefundTableHeadersData,
  PutApiContractServiceRefundTablesRefundTableDetailsData,
  PutApiContractServiceRefundTablesRefundTableHeadersData,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
  Volo_Abp_Application_Dtos_PagedResultDto_115,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import { isApiError } from "src/app/api/util";
import { getContractServiceClient } from "src/lib";

type ServerResponse<T = undefined> = BaseServerResponse &
  (undefined extends T ? ErrorTypes : SuccessServerResponse<T>);

type ErrorTypes = ErrorServerResponse | ApiErrorServerResponse;

interface BaseServerResponse {
  status: number;
  message: string;
}

interface SuccessServerResponse<T> {
  type: "success";
  status: number;
  data: T;
  message: string;
}
interface ApiErrorServerResponse {
  type: "api-error";
  status: number;
  data: ApiError;
  message: string;
}
interface ErrorServerResponse {
  type: "error";
  status: number;
  data: unknown;
  message: string;
}

function structuredError(error: unknown): ErrorTypes {
  if (isApiError(error)) {
    return {
      type: "api-error",
      data: error,
      status: error.status,
      message: error.message,
    };
  }
  return {
    type: "error",
    data: error,
    status: 500,
    message: "An error occurred",
  };
}

export async function getRefundTableHeaders(
  body: GetApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundTableHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_115>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundTableHeaders(
  body: PostApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundTableHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function putRefundTableHeaders(
  body: PutApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundTableHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteRefundTableHeaders(
  body: DeleteApiContractServiceRefundTablesRefundTableHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundTableHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getRefundTableHeadersById(
  body: GetApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getRefundTableHeadersDetailById(
  body: GetApiContractServiceRefundTablesRefundTableHeadersDetailByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundTableHeadersDetailById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function postRefundTableHeadersDetail(
  body: PostApiContractServiceRefundTablesRefundTableDetailsData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundTableDetails(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function putRefundTableRefundTableDetails(
  body: PutApiContractServiceRefundTablesRefundTableDetailsData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundTableDetails(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteRefundTableHeadersDetail(
  body: DeleteApiContractServiceRefundTablesRefundTableDetailsData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundTableDetails(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}

// export async function useAction({
//   // client,
//   service,
//   path,
//   body,
// }: {
//   // client: () => Promise<Record<string,any>>;
//   service: "refundTables";
//   path: string;
//   body?: unknown;
// }) {
//   try {
//     const cl = await getContractServiceClient();
//     const sv = cl[service];
//     const fnc = sv[path as keyof typeof sv];
//     if (typeof fnc === "function") {
//       const res = (fnc as (body: unknown) => void)(body);
//       // console.log(res);
//       return "res";
//     }
//     return "null";
//   } catch (error) {
//     console.log(error);
//     return "error";
//     if (isApiError(error)) {
//       return {
//         type: "api-error",
//         data: error,
//         status: error.status,
//         message: error.message,
//       };
//     }
//     return {
//       type: "error",
//       data: error,
//       status: 500,
//     };
//   }
// }
