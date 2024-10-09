import {
  $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_CRMService_Customss_UpdateCustomsOrganizationDto,
  $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  $UniRefund_CRMService_RefundPoints_UpdateRefundPointOrganizationDto,
  $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import type {
  addressTypeCodes,
  emailTypeCodes,
  telephoneTypeCodes,
} from "@repo/ui/utils/table/form-schemas";
import type { PutOrganization } from "./types";

export interface UpdatePartiesDto {
  taxOfficeId: string;
  organizationSchema: PutOrganization;
  telephone: {
    areaCode: string;
    localNumber: string;
    ituCountryCode: string;
    primaryFlag: boolean;
    typeCode: telephoneTypeCodes;
  };
  address: {
    addressLine: string;
    city: string;
    terriority: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    primaryFlag: boolean;
    typeCode: addressTypeCodes;
  };
  email: {
    emailAddress: string;
    primaryFlag: boolean;
    typeCode: emailTypeCodes;
  };
}

export const editSchemasOfParties = {
  merchants: {
    organizationSchema:
      $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  "refund-points": {
    organizationSchema:
      $UniRefund_CRMService_RefundPoints_UpdateRefundPointOrganizationDto,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  customs: {
    organizationSchema:
      $UniRefund_CRMService_Customss_UpdateCustomsOrganizationDto,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  "tax-free": {
    organizationSchema:
      $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  "tax-offices": {
    organizationSchema:
      $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
};
