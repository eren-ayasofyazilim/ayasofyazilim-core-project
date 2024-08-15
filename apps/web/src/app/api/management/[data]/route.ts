/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
import type { Volo_Abp_Http_RemoteServiceErrorResponse } from "@ayasofyazilim/saas/AccountService";
import type { NextRequest } from "next/server";
import { getSettingServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { errorResponse, isApiError } from "../../util";

const clients: Clients = {
  vats: async () => {
    const client = await getSettingServiceClient();
    const vats = client.vat;
    return {
      get: async () => vats.getApiSettingServiceVat(),
      post: async (requestBody: any) =>
        vats.postApiSettingServiceVat({ requestBody }),
      put: async (data: any) => {
        data.requestBody.id = data.id;
        return vats.putApiSettingServiceVat(data);
      },
      delete: async (id: string) => vats.deleteApiSettingServiceVat({ id }),
    };
  },
  productGroups: async () => {
    const client = await getSettingServiceClient();
    const productGroups = client.productGroup;
    return {
      get: () => productGroups.getApiSettingServiceProductGroup({}),
      post: async (requestBody: any) =>
        productGroups.postApiSettingServiceProductGroup({ requestBody }),
      put: async (data: any) => {
        data.requestBody.id = data.id;
        return productGroups.putApiSettingServiceProductGroup(data);
      },
      delete: async (id: string) =>
        productGroups.deleteApiSettingServiceProductGroup({ id }),
    };
  },

  productGroupsVats: async () => {
    const client = await getSettingServiceClient();
    const productGroupVats = client.productGroupVat;
    return {
      get: () => productGroupVats.getApiSettingServiceProductGroupVat({}),
      post: async (requestBody: any) =>
        productGroupVats.postApiSettingServiceProductGroupVat({ requestBody }),
      put: async (data: any) => {
        data.requestBody.id = data.id;
        return productGroupVats.putApiSettingServiceProductGroupVat(data);
      },
      delete: async (id: string) =>
        productGroupVats.deleteApiSettingServiceProductGroupVat({ id }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const filter = searchParams.get("filter");
  if (!clients[params.data]) {
    // return status 404
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](page, filter);
  try {
    const data = await client.get();
    return new Response(JSON.stringify(data));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      const message = body.error?.message || error.statusText;
      return errorResponse(message, error.status);
    }
    const errorText = `${(error as any)?.statusText} ${(error as any)?.status}`;
    return errorResponse(errorText, (error as any)?.status);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const roles = await client.post(requestBody);
    return new Response(JSON.stringify(roles));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status,
      );
    }
    return errorResponse("Something went wrong");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  let retVal = "something went wrong";
  const client = await clients[params.data](request);
  const id = await request.json();
  const deleteById = await client.delete(id);
  if (deleteById === undefined) retVal = "successfull";
  return new Response(JSON.stringify(retVal));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  if (!clients[params.data]) {
    return errorResponse("Invalid data type");
  }
  const client = await clients[params.data](request);
  const requestBody = await request.json();
  try {
    const roles = await client.put({
      id: requestBody.id,
      requestBody: JSON.parse(requestBody.requestBody),
    });
    return new Response(JSON.stringify(roles));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const body = error.body as Volo_Abp_Http_RemoteServiceErrorResponse;
      return errorResponse(
        body.error?.message || "Something went wrong",
        error.status,
      );
    }
    return errorResponse("Something went wrong");
  }
}
