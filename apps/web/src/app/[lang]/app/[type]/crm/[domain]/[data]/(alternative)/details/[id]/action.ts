"use server";
import {
  ApiError,
  UniRefund_CRMService_Organizations_UpdateOrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import { revalidatePath } from "next/cache";
import { getCRMServiceClient } from "src/lib";
export async function getCRMDetailServer(body: { id: string }) {
  "use server";
  const response = await getCRMServiceClient().then((client) =>
    client.merchant
      .getApiCrmServiceMerchantsDetailById({
        id: body.id,
      })
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
export async function updateCRMDetailServer(
  id: string,
  organizationId: string,
  type: "merchant",
  requestBody: UniRefund_CRMService_Organizations_UpdateOrganizationDto,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response = await client?.[
      type
    ].putApiCrmServiceMerchantsByIdOrganizationByOrganizationId({
      id,
      organizationId,
      requestBody,
    });
    revalidatePath("/");
    return response;
  } catch (error) {
    return error;
  }
}
