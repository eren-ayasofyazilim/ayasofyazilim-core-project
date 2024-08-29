"use server";
import type {
  ApiError,
  DeleteApiContractServiceRefundTablesRefundFeeDetailsByIdData,
  DeleteApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  DeleteApiContractServiceRefundTablesRefundTableDetailsByIdData,
  DeleteApiContractServiceRefundTablesRefundTableHeadersByIdData,
  GetApiContractServiceRebateTablesRebateTableHeadersDetailByIdData,
  GetApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
  GetApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  GetApiContractServiceRefundTablesRefundFeeHeadersData,
  GetApiContractServiceRefundTablesRefundFeeHeadersDetailByIdData,
  GetApiContractServiceRefundTablesRefundTableHeadersByIdData,
  GetApiContractServiceRefundTablesRefundTableHeadersData,
  PostApiContractServiceRefundTablesRefundFeeDetailsByRefundFeeHeaderIdData,
  PostApiContractServiceRefundTablesRefundFeeHeadersData,
  PostApiContractServiceRefundTablesRefundTableDetailsByRefundTableHeaderIdData,
  PostApiContractServiceRefundTablesRefundTableHeadersData,
  PutApiContractServiceRefundTablesRefundFeeDetailsByIdData,
  PutApiContractServiceRefundTablesRefundFeeHeadersByIdData,
  PutApiContractServiceRefundTablesRefundTableDetailsByIdData,
  PutApiContractServiceRefundTablesRefundTableHeadersByIdData,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto,
  UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto,
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
  Volo_Abp_Application_Dtos_PagedResultDto_111,
  Volo_Abp_Application_Dtos_PagedResultDto_18,
  Volo_Abp_Application_Dtos_PagedResultDto_19,
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

/*** RefundTable ***/
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
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_111>;
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
export async function putRefundTableHeadersById(
  body: PutApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundTableHeadersById(
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
export async function deleteRefundTableHeadersById(
  body: DeleteApiContractServiceRefundTablesRefundTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundTableHeadersById(
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

export async function postRefundTableHeadersDetailById(
  body: PostApiContractServiceRefundTablesRefundTableDetailsByRefundTableHeaderIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundTableDetailsByRefundTableHeaderId(
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
export async function putRefundTableRefundTableDetailsById(
  body: PutApiContractServiceRefundTablesRefundTableDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundTableDetailsById(
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
export async function deleteRefundTableHeadersDetailById(
  body: DeleteApiContractServiceRefundTablesRefundTableDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundTableDetailsById(
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
/* RefundFees */
export async function getRefundTableFeeHeaders(
  body: GetApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundFeeHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_19>;
  } catch (error) {
    return structuredError(error);
  }
} //get header list
export async function getRefundTableFeeHeadersById(
  body: GetApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundFeeHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //get header by id
export async function postRefundTableFeeHeaders(
  body: PostApiContractServiceRefundTablesRefundFeeHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundFeeHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //create fee header
export async function putRefundTableFeeHeadersById(
  body: PutApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundFeeHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //update fee header
export async function deleteRefundTableFeeHeadersById(
  body: DeleteApiContractServiceRefundTablesRefundFeeHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundFeeHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //delete fee header

export async function getRefundTableFeeHeadersDetailById(
  body: GetApiContractServiceRefundTablesRefundFeeHeadersDetailByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.getApiContractServiceRefundTablesRefundFeeHeadersDetailById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //get header details by id
export async function postRefundTableFeeHeaderDetailsByRefundTableHeaderId(
  body: PostApiContractServiceRefundTablesRefundFeeDetailsByRefundFeeHeaderIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.postApiContractServiceRefundTablesRefundFeeDetailsByRefundFeeHeaderId(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
} //create fee details
export async function putRefundTableFeeHeaderDetailsById(
  body: PutApiContractServiceRefundTablesRefundFeeDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.putApiContractServiceRefundTablesRefundFeeDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
} //update fee details
export async function deleteRefundTableFeeHeaderDetailsById(
  body: DeleteApiContractServiceRefundTablesRefundFeeDetailsByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.refundTables.deleteApiContractServiceRefundTablesRefundFeeDetailsById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Refunds_RefundFeeDetails_RefundFeeDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
} //delete fee details

/* RefundFees */
/*** RefundTable ***/

/*** RebateTable ***/
export async function getRebateTablesRebateTableHeadersTemplates(
  body: GetApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.getApiContractServiceRebateTablesRebateTableHeadersTemplates(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_18>;
  } catch (error) {
    return structuredError(error);
  }
} //get rebate tables templates
export async function getRebateTablesRebateTableHeadersDetailsById(
  body: GetApiContractServiceRebateTablesRebateTableHeadersDetailByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.getApiContractServiceRebateTablesRebateTableHeadersDetailById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    // console.log(error);
    return structuredError(error);
  }
} //get rebate tables details

/** RebateTable **/
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
//       return "res";
//     }
//     return "null";
//   } catch (error) {
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
