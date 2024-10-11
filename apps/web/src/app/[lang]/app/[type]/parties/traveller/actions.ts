"use server";

import type {
  GetApiTravellerServiceTravellersByIdResponse,
  GetApiTravellerServiceTravellersData,
  PostApiTravellerServiceTravellersWithComponentsData,
  PutApiTravellerServiceTravellersByIdData,
  PutApiTravellerServiceTravellersByIdResponse,
  UniRefund_TravellerService_Travellers_CreateTravellerResponseDto,
  Volo_Abp_Application_Dtos_PagedResultDto_15,
} from "@ayasofyazilim/saas/TravellerService";
import type { ErrorTypes, ServerResponse } from "src/lib";
import { getTravellersServiceClient, structuredError } from "src/lib";

export async function getTravellers(
  body: GetApiTravellerServiceTravellersData,
): Promise<ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_15>> {
  try {
    const client = await getTravellersServiceClient();
    const response = (await client.traveller.getApiTravellerServiceTravellers(
      body,
    )) as Volo_Abp_Application_Dtos_PagedResultDto_15;
    return {
      data: response,
      message: "Travellers fetched succesfully",
      status: 200,
      type: "success",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function createTravellerWithComponents(
  body: PostApiTravellerServiceTravellersWithComponentsData,
): Promise<
  | ServerResponse<UniRefund_TravellerService_Travellers_CreateTravellerResponseDto>
  | ErrorTypes
> {
  try {
    const client = await getTravellersServiceClient();
    const response =
      await client.traveller.postApiTravellerServiceTravellersWithComponents(
        body,
      );
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Traveller created successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getTravellerById({
  id,
}: {
  id: string;
}): Promise<ServerResponse<GetApiTravellerServiceTravellersByIdResponse>> {
  try {
    const client = await getTravellersServiceClient();
    const response =
      await client.traveller.getApiTravellerServiceTravellersById({
        id,
      });
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Traveller fetched successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function updateTraveller(
  formdata: PutApiTravellerServiceTravellersByIdData,
): Promise<ServerResponse<PutApiTravellerServiceTravellersByIdResponse>> {
  try {
    const client = await getTravellersServiceClient();
    const response =
      await client.traveller.putApiTravellerServiceTravellersById(formdata);
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Traveller updated successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}
