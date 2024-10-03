"use server";
import type { GetApiTagServiceTagResponse } from "@ayasofyazilim/saas/TagService";
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

export async function createTag() {
  try {
    const client = await getTagServiceClient();
    const response = await client.tag.postApiTagServiceTag();
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
