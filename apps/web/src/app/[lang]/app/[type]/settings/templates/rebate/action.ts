"use server";
import type {
  DeleteApiContractServiceRebateTablesRebateTableHeadersByIdData,
  GetApiContractServiceRebateTablesRebateTableHeadersByIdData,
  GetApiContractServiceRebateTablesRebateTableHeadersTemplatesData,
  PagedResultDto_RebateTableHeaderDto,
  PostApiContractServiceRebateTablesRebateTableHeadersData,
  PutApiContractServiceRebateTablesRebateTableHeadersByIdData,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getContractServiceClient, structuredError } from "src/lib";

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
    } as ServerResponse<PagedResultDto_RebateTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //get rebate tables templates
export async function getRebateTablesRebateTableHeadersDetailsById(
  body: GetApiContractServiceRebateTablesRebateTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.getApiContractServiceRebateTablesRebateTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //get rebate tables details
export async function deleteRebateTablesRebateTableHeadersById(
  body: DeleteApiContractServiceRebateTablesRebateTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.deleteApiContractServiceRebateTablesRebateTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //delete fee details
/** RebateTable **/

export async function postRebateTablesRebateTableHeaders(
  body: PostApiContractServiceRebateTablesRebateTableHeadersData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.postApiContractServiceRebateTablesRebateTableHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //post rebate tables headers

export async function putRebateTablesRebateTableHeadersById(
  body: PutApiContractServiceRebateTablesRebateTableHeadersByIdData,
) {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.rebateTables.putApiContractServiceRebateTablesRebateTableHeadersById(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto>;
  } catch (error) {
    return structuredError(error);
  }
} //put rebate tables headers
