"use server";
import { getCRMServiceClient, structuredError } from "src/lib";
import type { PartyNameType } from "../../types";
import type {
  PutAddress,
  PutEmail,
  PutMerchantOrganization,
  PutOrganization,
  PutRefundPointOrganization,
  PutTaxFreeOrganization,
  PutTelephone,
} from "./types";

export async function putPartyRequests(partyType: PartyNameType) {
  const client = await getCRMServiceClient();
  const partyRequests = {
    merchants: {
      putOrganization: async (form: PutOrganization["data"]) => {
        const data = form as PutMerchantOrganization;
        return await client.merchant.putApiCrmServiceMerchantsByIdOrganizationsByOrganizationId(
          {
            requestBody: data.requestBody,
            organizationId: data.organizationId,
            id: data.id,
          },
        );
      },
      putTelephone: async (form: PutTelephone["data"]) => {
        const data = form;
        return await client.merchant.putApiCrmServiceMerchantsByIdTelephonesByTelephoneId(
          {
            requestBody: data.requestBody,
            telephoneId: data.telephoneId,
            id: data.id,
          },
        );
      },
      putAddress: async (form: PutAddress["data"]) => {
        const data = form;
        return await client.merchant.putApiCrmServiceMerchantsByIdAddressesByAddressId(
          {
            requestBody: data.requestBody,
            addressId: data.addressId,
            id: data.id,
          },
        );
      },
      putEmail: async (form: PutEmail["data"]) => {
        const data = form;
        return await client.merchant.putApiCrmServiceMerchantsByIdEmailsByEmailId(
          {
            requestBody: data.requestBody,
            emailId: data.emailId,
            id: data.id,
          },
        );
      },
    },
    "refund-points": {
      putOrganization: async (form: PutOrganization["data"]) => {
        const data = form as PutRefundPointOrganization;
        return await client.refundPoint.putApiCrmServiceRefundPointsByIdOrganizationsByOrganizationId(
          {
            requestBody: data.requestBody,
            organizationId: data.organizationId,
            id: data.id,
          },
        );
      },
      putTelephone: async (form: PutTelephone["data"]) => {
        const data = form;
        return await client.refundPoint.putApiCrmServiceRefundPointsByIdTelephonesByTelephoneId(
          {
            requestBody: data.requestBody,
            telephoneId: data.telephoneId,
            id: data.id,
          },
        );
      },
      putAddress: async (form: PutAddress["data"]) => {
        const data = form;
        return await client.refundPoint.putApiCrmServiceRefundPointsByIdAddressesByAddressId(
          {
            requestBody: data.requestBody,
            addressId: data.addressId,
            id: data.id,
          },
        );
      },
      putEmail: async (form: PutEmail["data"]) => {
        const data = form;
        return await client.refundPoint.putApiCrmServiceRefundPointsByIdEmailsByEmailId(
          {
            requestBody: data.requestBody,
            emailId: data.emailId,
            id: data.id,
          },
        );
      },
    },
    customs: {
      putOrganization: async (form: PutOrganization["data"]) => {
        const data = form as PutRefundPointOrganization;
        return await client.customs.putApiCrmServiceCustomsByIdOrganizationsByOrganizationId(
          {
            requestBody: data.requestBody,
            organizationId: data.organizationId,
            id: data.id,
          },
        );
      },
      putTelephone: async (form: PutTelephone["data"]) => {
        const data = form;
        return await client.customs.putApiCrmServiceCustomsByIdTelephonesByTelephoneId(
          {
            requestBody: data.requestBody,
            telephoneId: data.telephoneId,
            id: data.id,
          },
        );
      },
      putAddress: async (form: PutAddress["data"]) => {
        const data = form;
        return await client.customs.putApiCrmServiceCustomsByIdAddressesByAddressId(
          {
            requestBody: data.requestBody,
            addressId: data.addressId,
            id: data.id,
          },
        );
      },
      putEmail: async (form: PutEmail["data"]) => {
        const data = form;
        return await client.customs.putApiCrmServiceCustomsByIdEmailsByEmailId({
          requestBody: data.requestBody,
          emailId: data.emailId,
          id: data.id,
        });
      },
    },
    "tax-free": {
      putOrganization: async (form: PutOrganization["data"]) => {
        const data = form as PutTaxFreeOrganization;
        return await client.taxFree.putApiCrmServiceTaxFreesByIdOrganizationsByOrganizationId(
          {
            requestBody: data.requestBody,
            organizationId: data.organizationId,
            id: data.id,
          },
        );
      },
      putTelephone: async (form: PutTelephone["data"]) => {
        const data = form;
        return await client.taxFree.putApiCrmServiceTaxFreesByIdTelephonesByTelephoneId(
          {
            requestBody: data.requestBody,
            telephoneId: data.telephoneId,
            id: data.id,
          },
        );
      },
      putAddress: async (form: PutAddress["data"]) => {
        const data = form;
        return await client.taxFree.putApiCrmServiceTaxFreesByIdAddressesByAddressId(
          {
            requestBody: data.requestBody,
            addressId: data.addressId,
            id: data.id,
          },
        );
      },
      putEmail: async (form: PutEmail["data"]) => {
        const data = form;
        return await client.taxFree.putApiCrmServiceTaxFreesByIdEmailsByEmailId(
          {
            requestBody: data.requestBody,
            emailId: data.emailId,
            id: data.id,
          },
        );
      },
    },
    "tax-offices": {
      putOrganization: async (form: PutOrganization["data"]) => {
        const data = form as PutTaxFreeOrganization;
        return await client.taxOffice.putApiCrmServiceTaxOfficesByIdOrganizationsByOrganizationId(
          {
            requestBody: data.requestBody,
            organizationId: data.organizationId,
            id: data.id,
          },
        );
      },
      putTelephone: async (form: PutTelephone["data"]) => {
        const data = form;
        return await client.taxOffice.putApiCrmServiceTaxOfficesByIdTelephonesByTelephoneId(
          {
            requestBody: data.requestBody,
            telephoneId: data.telephoneId,
            id: data.id,
          },
        );
      },
      putAddress: async (form: PutAddress["data"]) => {
        const data = form;
        return await client.taxOffice.putApiCrmServiceTaxOfficesByIdAddressesByAddressId(
          {
            requestBody: data.requestBody,
            addressId: data.addressId,
            id: data.id,
          },
        );
      },
      putEmail: async (form: PutEmail["data"]) => {
        const data = form;
        return await client.taxOffice.putApiCrmServiceTaxOfficesByIdEmailsByEmailId(
          {
            requestBody: data.requestBody,
            emailId: data.emailId,
            id: data.id,
          },
        );
      },
    },
  };
  return partyRequests[partyType];
}

export async function putParty(
  partyType: PartyNameType,
  params: PutOrganization | PutTelephone | PutAddress | PutEmail,
) {
  const client = await putPartyRequests(partyType);
  try {
    let response;
    if (params.action === "organization") {
      response = await client.putOrganization(params.data);
    } else if (params.action === "telephone") {
      response = await client.putTelephone(params.data);
    } else if (params.action === "address") {
      response = await client.putAddress(params.data);
    } else {
      response = await client.putEmail(params.data);
    }
    return {
      type: "success",
      data: response,
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
