/* eslint-disable @typescript-eslint/no-explicit-any -- TODO: we need to fix this*/
import type { NextRequest } from "next/server";
import type { CreateMerchants } from "src/app/[lang]/app/[type]/crm/[domain]/[data]/new/page";
import { getCRMServiceClient } from "src/lib";
import type { Clients } from "../../util";
import { commonDELETE, commonGET, commonPOST, commonPUT } from "../../util";

function createRequestBody(formData: CreateMerchants) {
  return {
    requestBody: {
      entityInformationTypes: [
        {
          organizations: [
            {
              name: formData.name,
              taxpayerId: formData.taxpayerId,
              legalStatusCode: formData.legalStatusCode,
              customerNumber: formData.customerNumber,
              contactInformations: [
                {
                  telephones: [
                    {
                      areaCode: formData.areaCode,
                      localNumber: formData.localNumber,
                      ituCountryCode: formData.ituCountryCode,
                      primaryFlag: formData.primaryFlag,
                      typeCode: formData.telephoneTypeCode,
                    },
                  ],
                  addresses: [
                    {
                      addressLine: formData.addressLine,
                      city: formData.city,
                      terriority: formData.terriority,
                      postalCode: formData.postalCode,
                      country: formData.country,
                      fullAddress: formData.fullAddress,
                      primaryFlag: formData.addressPrimaryFlag,
                      typeCode: formData.addressTypeCode,
                    },
                  ],
                  emails: [
                    {
                      emailAddress: formData.emailAddress,
                      primaryFlag: formData.emailPrimaryFlag,
                      typeCode: formData.emailTypeCode,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  };
}

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
      post: async (formData: unknown) => {
        await merchant.postApiCrmServiceMerchantsWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },

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
      post: async (formData: unknown) => {
        await refundPoint.postApiCrmServiceRefundPointsWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
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
      post: async (formData: unknown) => {
        await customs.postApiCrmServiceCustomsWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
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
      post: async (formData: unknown) => {
        await taxFree.postApiCrmServiceTaxFreesWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
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
      post: async (formData: unknown) => {
        await taxOffices.postApiCrmServiceTaxOfficesWithComponents(
          createRequestBody(formData as CreateMerchants),
        );
      },
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
