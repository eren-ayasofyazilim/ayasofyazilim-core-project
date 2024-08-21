/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
import type { NextRequest } from "next/server";
import {
  getIdentityServiceClient,
  getMerchantServiceClient,
  getSaasServiceClient,
} from "src/lib";
import type { Clients } from "../../util";
import { commonDELETE, commonGET, commonPOST, commonPUT } from "../../util";

const clients: Clients = {
  merchants: async () => {
    const client = await getMerchantServiceClient();
    const merchant = client.organization;

    return {
      get: async () => {
        const getDetails =
          await merchant.getApiMerchantServiceOrganizationsDetail();

        return getDetails.items?.map((organization) => {
          const contactInfo = organization.contactInformation || {};
          const telephone = contactInfo.telephones?.[0] || {};
          const address = contactInfo.addresses?.[0] || {};
          const email = contactInfo.emails?.[0] || {};
          const productGroup = organization.productGroups?.[0] || {};

          return {
            id: organization.id || "",
            name: organization.name || "",
            taxpayerId: organization.taxpayerId || "",
            legalStatusCode: organization.legalStatusCode || "",
            customerNumber: organization.customerNumber || "",
            areaCode: telephone.areaCode || "",
            localNumber: telephone.localNumber || "",
            ituCountryCode: telephone.ituCountryCode || "",
            primaryFlag: telephone.primaryFlag || false,
            telephoneTypeCode: telephone.typeCode || 0,
            addressLine: address.addressLine || "",
            city: address.city || "",
            terriority: address.terriority || "",
            postalCode: address.postalCode || "",
            country: address.country || "",
            fullAddress: address.fullAddress || "",
            addressPrimaryFlag: address.primaryFlag || false,
            addressTypeCode: address.typeCode || 0,
            emailAddress: email.emailAddress || "",
            emailPrimaryFlag: email.primaryFlag || false,
            emailTypeCode: email.typeCode || 0,
            productName: productGroup.name || "",
            vatRate: productGroup.vatRate || 0,
            productCode: productGroup.productCode || "",
            isActive: productGroup.isActive || false,
          };
        });
      },
      post: async (requestBody: any) =>
        merchant.postApiMerchantServiceOrganizations({
          requestBody,
          entityInformationTypeId: "e5f7f9e0-ceee-71f6-7b93-3a136c155b82",
        }),
      put: async (_requestBody) => {
        const requestBody = _requestBody as {
          id: string;
          requestBody: {
            name: string;
            taxpayerId: string;
            legalStatusCode: string;
            customerNumber: string;
            areaCode: string;
            localNumber: string;
            ituCountryCode: string;
            primaryFlag: boolean;
            telephoneTypeCode: number;
            addressLine: string;
            city: string;
            terriority: string;
            postalCode: string;
            country: string;
            fullAddress: string;
            addressPrimaryFlag: boolean;
            addressTypeCode: number;
            emailAddress: string;
            emailPrimaryFlag: boolean;
            emailTypeCode: number;
            productName: string;
            vatRate: number;
            productCode: string;
            isActive: boolean;
          };
        };
        const currentDetails =
          await merchant.getApiMerchantServiceOrganizationsDetailById({
            id: requestBody.id,
          });

        const updatedDetails = {
          ...currentDetails,
          name: requestBody.requestBody.name,
          taxpayerId: requestBody.requestBody.taxpayerId,
          legalStatusCode: requestBody.requestBody.legalStatusCode,
          customerNumber: requestBody.requestBody.customerNumber,
          contactInformation: {
            ...currentDetails.contactInformation,
            telephones: [
              {
                ...currentDetails.contactInformation?.telephones?.[0],
                areaCode: requestBody.requestBody.areaCode,
                localNumber: requestBody.requestBody.localNumber,
                ituCountryCode: requestBody.requestBody.ituCountryCode,
                primaryFlag: requestBody.requestBody.primaryFlag,
                typeCode: requestBody.requestBody.telephoneTypeCode,
              },
            ],
            addresses: [
              {
                ...currentDetails.contactInformation?.addresses?.[0],
                addressLine: requestBody.requestBody.addressLine,
                city: requestBody.requestBody.city,
                terriority: requestBody.requestBody.terriority,
                postalCode: requestBody.requestBody.postalCode,
                country: requestBody.requestBody.country,
                fullAddress: requestBody.requestBody.fullAddress,
                primaryFlag: requestBody.requestBody.addressPrimaryFlag,
                typeCode: requestBody.requestBody.addressTypeCode,
              },
            ],
            emails: [
              {
                ...currentDetails.contactInformation?.emails?.[0],
                emailAddress: requestBody.requestBody.emailAddress,
                primaryFlag: requestBody.requestBody.emailPrimaryFlag,
                typeCode: requestBody.requestBody.emailTypeCode,
              },
            ],
          },
          productGroups: [
            {
              ...currentDetails.productGroups?.[0],
              name: requestBody.requestBody.productName,
              vatRate: requestBody.requestBody.vatRate,
              productCode: requestBody.requestBody.productCode,
              isActive: requestBody.requestBody.isActive,
            },
          ],
        };

        return merchant.putApiMerchantServiceOrganizations({
          requestBody: updatedDetails as any,
        });
      },
      delete: async (id: string) =>
        merchant.deleteApiMerchantServiceOrganizations({ id }),
    };
  },
  refundPoints: async () => {
    const client = await getIdentityServiceClient();
    const user = client.user;
    return {
      get: () =>
        Promise.resolve([
          {
            Company:
              "Travelex Döviz Ticaret Yetkili Müessese Anonim Şirketi (assigned to Mehmet Baykam)",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02822 - http://www.travelex.com.tr\nAntalya Airport Terminal 1, 1\nYenigöl\nMuratpaşa, Antalya\nTurkey",
          },
          {
            Company:
              "Travelex Döviz Ticaret Yetkili Müessese Anonim Şirketi - 5382-AYT-T1 ASD (assigned to Mehmet Baykam)",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02824 - http://www.travelex.com.tr\nAntalya Terminal 1, 1\nYenigöl\nMuratpaşa, Antalya\nTurkey",
          },
          {
            Company:
              "Travelex Ankara Döviz Ticareti Yetkili Müessese Anonim Şirketi (assigned to Mehmet Baykam)",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02827 - http://www.travelex.com.tr\nAnkara Airport, 325/3\nBalıkhisar Köyü\nAkyurt, Ankara\nTurkey",
          },
          {
            Company:
              "Travelex Döviz Ticaret Yetkili Müessese Anonim Şirketi - 5389-Kusadasi Egeport (assigned to Mehmet Baykam)",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02829 - http://www.travelex.com.tr\nKuşadası Egeport, 18\nCamikebir Mah.\nKuşadası, Aydın\nTurkey",
          },
          {
            Company:
              "Travelex Ankara Döviz Ticareti Yetkili Müessese Anonim Şirketi - 5371-IZM-LSD (assigned to Mehmet Baykam)",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02830 - http://www.travelex.com.tr\nİzmir Airport, 1\nDokuzeylül(9 Eylül) Mah.\nGaziemir, İzmir\nTurkey",
          },
          {
            Company:
              "Travelex Ankara Döviz Ticareti Yetkili Müessese Anonim Şirketi - 5362-ALA-LSA (assigned to Mehmet Baykam)",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02831 - http://www.travelex.com.tr\nGazipasa Airport, 1\nPaşaköy\nAlanya, Antalya\nTurkey",
          },

          {
            Company:
              "Global Exchange Döviz Ticaret Yetkili Müessese Anonim Şirketi",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address:
              "TR02832 - http://www.globalexchange.com.tr/tr/istanbul\nYenigöl Mahallesi Serik Caddesi, 100/4\nYenigöl\nMuratpaşa, Antalya\nTurkey",
          },
        ]),
      post: async (requestBody: any) =>
        user.postApiIdentityUsers({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        user.putApiIdentityUsersById({ id, requestBody }),
      delete: async (id: string) => user.deleteApiIdentityUsersById({ id }),
    };
  },
  customs: async () => {
    const client = await getSaasServiceClient();
    const edition = client.edition;
    return {
      get: () =>
        Promise.resolve([
          {
            Company: "340900",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR02855\nTurkey",
          },
          {
            Company: "341454",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR02961\nTurkey",
          },
          {
            Company: "343200",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR02963\nTurkey",
          },
          {
            Company: "070200",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR02983\nTurkey",
          },
          {
            Company: "060200",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR02992\nTurkey",
          },
          {
            Company: "330900",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR03191\nTurkey",
          },
          {
            Company: "070400",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR03471\nTurkey",
          },
          {
            Company: "220200",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR03494\nTurkey",
          },
          {
            Company: "221300",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR03574\nTurkey",
          },
          {
            Company: "350700",
            CustomerNumber: "-",
            ProductGroups: "-",
            Address: "TR03610\nTurkey",
          },
        ]),
      post: async (requestBody: any) =>
        edition.postApiSaasEditions({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        edition.putApiSaasEditionsById({ id, requestBody }),
      delete: async (id: string) => edition.deleteApiSaasEditionsById({ id }),
    };
  },
  taxFree: async () => {
    const client = await getSaasServiceClient();
    const tenant = client.tenant;
    return {
      get: () => Promise.resolve([]),
      post: async (requestBody: any) =>
        tenant.postApiSaasTenants({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        tenant.putApiSaasTenantsById({ id, requestBody }),
      delete: async (id: string) => tenant.deleteApiSaasTenantsById({ id }),
    };
  },
  taxOffices: async () => {
    const client = await getSaasServiceClient();
    const tenant = client.tenant;
    return {
      get: () =>
        Promise.resolve([
          {
            Company: "Düzce Vergi Dairesi Müdürlüğü",
            CustomerNumber: "81260",
            ProductGroups: "-",
            Address: "TR14341\nBond Street 233\nTurkey",
          },
          {
            Company: "Osmaniye Vergi Dairesi Müdürlüğü",
            CustomerNumber: "80201",
            ProductGroups: "-",
            Address: "TR14340\nBond Street 232\nTurkey",
          },
          {
            Company: "Kilis Vergi Dairesi Müdürlüğü",
            CustomerNumber: "79201",
            ProductGroups: "-",
            Address: "TR14339\nBond Street 231\nTurkey",
          },
          {
            Company: "Yenice Malmüdürlüğü",
            CustomerNumber: "78105",
            ProductGroups: "-",
            Address: "TR02093\nBond Street 230\nTurkey",
          },
          {
            Company: "Ovacık Malmüdürlüğü",
            CustomerNumber: "78103",
            ProductGroups: "-",
            Address: "TR02699\nBond Street 229\nTurkey",
          },
          {
            Company: "Karabük Vergi Dairesi Müdürlüğü",
            CustomerNumber: "78201",
            ProductGroups: "-",
            Address: "TR14338\nBond Street 228\nTurkey",
          },
          {
            Company: "Yalova Vergi Dairesi Müdürlüğü",
            CustomerNumber: "77201",
            ProductGroups: "-",
            Address: "TR14337\nBond Street 227\nTurkey",
          },
          {
            Company: "Iğdır Vergi Dairesi Müdürlüğü",
            CustomerNumber: "76201",
            ProductGroups: "-",
            Address: "TR14336\nBond Street 226\nTurkey",
          },
          {
            Company: "Ardahan Vergi Dairesi Müdürlüğü",
            CustomerNumber: "75201",
            ProductGroups: "-",
            Address: "TR14335\nBond Street 225\nTurkey",
          },
          {
            Company: "Bartın Vergi Dairesi Müdürlüğü",
            CustomerNumber: "74260",
            ProductGroups: "-",
            Address: "TR14334\nBond Street 224\nTurkey",
          },
        ]),
      post: async (requestBody: any) =>
        tenant.postApiSaasTenants({ requestBody }),
      put: async ({ id, requestBody }: { id: string; requestBody: any }) =>
        tenant.putApiSaasTenantsById({ id, requestBody }),
      delete: async (id: string) => tenant.deleteApiSaasTenantsById({ id }),
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
