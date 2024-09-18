"use server";
import type {
  DeleteApiCrmServiceMerchantsByIdWithComponentsData,
  GetApiCrmServiceIndividualsData,
  GetApiCrmServiceIndividualsResponse,
  GetApiCrmServiceMerchantsByIdDetailData,
  GetApiCrmServiceMerchantsByIdSubMerchantsData,
  GetApiCrmServiceMerchantsData,
  PostApiCrmServiceIndividualsWithComponentsData,
  PostApiCrmServiceIndividualsWithComponentsResponse,
  UniRefund_CRMService_Merchants_MerchantDetailDto,
  Volo_Abp_Application_Dtos_PagedResultDto_16,
} from "@ayasofyazilim/saas/CRMService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getCRMServiceClient, structuredError } from "src/lib";

export async function getCrmServiceMerchants(
  body: GetApiCrmServiceMerchantsData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response = await client.merchant.getApiCrmServiceMerchants(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCrmServiceMerchantsDetailById(
  body: GetApiCrmServiceMerchantsByIdDetailData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.getApiCrmServiceMerchantsByIdDetail(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_CRMService_Merchants_MerchantDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getSubCompanyByMerchantId(
  body: GetApiCrmServiceMerchantsByIdSubMerchantsData,
): Promise<ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>> {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.getApiCrmServiceMerchantsByIdSubMerchants(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "An error occurred while fetching Sub Companies.",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getIndividualByMerchantId(
  body: GetApiCrmServiceIndividualsData,
): Promise<ServerResponse<GetApiCrmServiceIndividualsResponse>> {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response = await client.individual.getApiCrmServiceIndividuals(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "An error occurred while fetching Sub Companies.",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteSubMerchantByMerchantId(
  body: DeleteApiCrmServiceMerchantsByIdWithComponentsData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.deleteApiCrmServiceMerchantsByIdWithComponents(
        body,
      );
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Sub Company deleted successfully.",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function postIndividual(
  body: PostApiCrmServiceIndividualsWithComponentsData,
): Promise<ServerResponse<PostApiCrmServiceIndividualsWithComponentsResponse>> {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.individual.postApiCrmServiceIndividualsWithComponents(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Individual created successfully.",
    };
  } catch (error) {
    return structuredError(error);
  }
}
