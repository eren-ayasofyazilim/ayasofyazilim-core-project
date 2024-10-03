"use server";
import type { GetApiTagServiceTagResponse, UniRefund_TagService_Tags_CreateTagRequestDto } from "@ayasofyazilim/saas/TagService";
import type { ServerResponse } from "src/lib";
import { getTagServiceClient, structuredError } from "src/lib";

export async function getTags(): Promise<
  ServerResponse<GetApiTagServiceTagResponse>
> {
  try {
    const client = await getTagServiceClient();
    const response = await client.tag.getApiTagServiceTag();
    return {
      data: response,
      message: "Tags fetched succesfully",
      status: 200,
      type: "success",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function createTag(requestBody: UniRefund_TagService_Tags_CreateTagRequestDto) {
  try {
    const client = await getTagServiceClient();
    const response = await client.tag.postApiTagServiceTag(
      { requestBody }
    );
    return {
      type: "success",
      data: response,
      status: 200,
      message: "Tag created successfully",
    };
  } catch (error) {
    return structuredError(error);
  }
}
