"use server";
import type {
  ApiError,
  UniRefund_CRMService_Organizations_UpdateOrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import { revalidatePath } from "next/cache";
import { getCRMServiceClient } from "src/lib";

export async function getCRMMerchantDetailServer(body: { id: string }) {
  "use server";
  const response = await getCRMServiceClient().then((client) =>
    client.merchant
      .getApiCrmServiceMerchantsByIdDetail({
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
export async function getCRMDetailServer(data: string, body: { id: string }) {
  "use server";
  const client = await getCRMServiceClient();
  let response;
  if (data === "refund-points") {
    response = await client.refundPoint.getApiCrmServiceRefundPointsByIdDetail({
      id: body.id,
    });
  } else if (data === "customs") {
    response = await client.customs.getApiCrmServiceCustomsByIdDetail({
      id: body.id,
    });
  } else if (data === "tax-free") {
    response = await client.taxFree.getApiCrmServiceTaxFreesByIdDetail({
      id: body.id,
    });
  } else if (data === "tax-offices") {
    response = await client.taxOffice.getApiCrmServiceTaxOfficesByIdDetail({
      id: body.id,
    });
  }
  revalidatePath("/");
  return {
    data: response,
    status: 200,
  };
}
export async function updateMerchantCRMDetailServer(
  id: string,
  organizationId: string,
  type: "merchant",
  requestBody: UniRefund_CRMService_Organizations_UpdateOrganizationDto,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    await client.merchant.putApiCrmServiceMerchantsByIdOrganizationsByOrganizationId(
      {
        id,
        organizationId,
        requestBody,
      },
    );
    revalidatePath("/");
    return true;
  } catch (error) {
    return error;
  }
}
// export async function updateCRMDetailServer(
//   // id: string,
//   // requestBody:
//   //   | UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto
//   //   | UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto
//   //   | UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto,
// ) {
//   "use server";
//   try {
//     const client = await getCRMServiceClient();
//     // if ("emailAddress" in requestBody) {
//     //   await client.emailCommonData.putApiCrmServiceEmailsById({
//     //     id,
//     //     requestBody,
//     //   });
//     // } else if ("addressLine" in requestBody) {
//     //   await client.addressType.putApiCrmServiceAddressesById({
//     //     id,
//     //     requestBody,
//     //   });
//     // } else if ("localNumber" in requestBody) {
//     //   await client.telephoneType.putApiCrmServiceTelephonesById({
//     //     id,
//     //     requestBody,
//     //   });
//     // }
//     // revalidatePath("/");
//     return true;
//   } catch (error) {
//     return error;
//   }
// }
