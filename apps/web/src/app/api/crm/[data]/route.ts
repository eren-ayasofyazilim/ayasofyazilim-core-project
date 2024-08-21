/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
import type { NextRequest } from "next/server";
import { getCRMServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { commonDELETE, commonGET, commonPOST, commonPUT } from "../../util";

const clients: Clients = {
  merchants: async () => {
    const client = await getCRMServiceClient();
    const merchant = client.merchant;
    return {
      get: async (page: number, filter, _maxResultCount: any) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return merchant.getApiCrmServiceMerchants({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        merchant.postApiCrmServiceMerchantsWithComponents({ requestBody }),
      delete: async (id: string) =>
        merchant.deleteApiCrmServiceMerchantsWithComponentsById({ id }),
    };
  },
  refundPoints: async () => {
    const client = await getCRMServiceClient();
    const refundPoint = client.refundPoint;
    return {
      get: async (page: number, filter, _maxResultCount: any) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return refundPoint.getApiCrmServiceRefundPoints({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        refundPoint.postApiCrmServiceRefundPointsWithComponents({
          requestBody,
        }),
      delete: async (id: string) =>
        refundPoint.deleteApiCrmServiceRefundPointsWithComponentsById({ id }),
    };
  },
  customs: async () => {
    const client = await getCRMServiceClient();
    const customs = client.customs;
    return {
      get: async (page: number, filter, _maxResultCount: any) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return customs.getApiCrmServiceCustoms({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        customs.postApiCrmServiceCustomsWithComponents({
          requestBody,
        }),
      delete: async (id: string) =>
        customs.deleteApiCrmServiceCustomsWithComponentsById({ id }),
    };
  },
  taxFree: async () => {
    const client = await getCRMServiceClient();
    const taxFree = client.taxFree;
    return {
      get: async (page: number, filter, _maxResultCount: any) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return taxFree.getApiCrmServiceTaxFrees({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        taxFree.postApiCrmServiceTaxFreesWithComponents({
          requestBody,
        }),
      delete: async (id: string) =>
        taxFree.deleteApiCrmServiceTaxFreesWithComponentsById({ id }),
    };
  },
  taxOffices: async () => {
    const client = await getCRMServiceClient();
    const taxOffices = client.taxOffice;
    return {
      get: async (page: number, filter, _maxResultCount: any) => {
        const maxResultCount = Number(_maxResultCount) || 10;
        return taxOffices.getApiCrmServiceTaxOffices({
          maxResultCount: maxResultCount || 10,
          skipCount: page * 10,
        });
      },
      post: async (requestBody: any) =>
        taxOffices.postApiCrmServiceTaxOfficesWithComponents({
          requestBody,
        }),
      delete: async (id: string) =>
        taxOffices.deleteApiCrmServiceTaxOfficesWithComponentsById({ id }),
    };
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonGET(request, { params }, clients);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonPOST(request, { params }, clients);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonDELETE(request, { params }, clients);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { data: string } },
) {
  return commonPUT(request, { params }, clients);
}
