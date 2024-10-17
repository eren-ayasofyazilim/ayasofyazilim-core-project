"use server";
import type {
  GetApiContractServiceMerchantsByIdContractsContractHeadersData,
  GetApiContractServiceMerchantsContractsContractHeadersByIdGetMissingStepsData,
  GetApiContractServiceMerchantsContractsContractHeadersByIdGetMissingStepsResponse,
  PagedResultDto_ContractHeaderDetailForMerchantDto,
  PostApiContractServiceMerchantsByIdContractsContractHeadersData,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantDto,
} from "@ayasofyazilim/saas/ContractService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getContractServiceClient, structuredError } from "src/lib";

export async function getContractHeadersByMerchantId(
  body: GetApiContractServiceMerchantsByIdContractsContractHeadersData,
): Promise<ServerResponse<PagedResultDto_ContractHeaderDetailForMerchantDto>> {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.contractsMerchant.getApiContractServiceMerchantsByIdContractsContractHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Contracts fetched successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function postContractHeadersByMerchantId(
  body: PostApiContractServiceMerchantsByIdContractsContractHeadersData,
): Promise<
  ServerResponse<UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantDto>
> {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.contractsMerchant.postApiContractServiceMerchantsByIdContractsContractHeaders(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Contract header created successfully.",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getContractHeaderMissingStepsById(
  body: GetApiContractServiceMerchantsContractsContractHeadersByIdGetMissingStepsData,
): Promise<
  ServerResponse<GetApiContractServiceMerchantsContractsContractHeadersByIdGetMissingStepsResponse>
> {
  "use server";
  try {
    const client = await getContractServiceClient();
    const response =
      await client.contractsMerchant.getApiContractServiceMerchantsContractsContractHeadersByIdGetMissingSteps(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Contracts fetched successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}
