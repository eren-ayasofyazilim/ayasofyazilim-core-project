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
import {
  CustomsFormSubPositions,
  MerchantsFormSubPositions,
  RefundPointsFormSubPositions,
  TaxFreeFormSubPositions,
  TaxOfficesFormSubPositions,
} from "../../table-data";
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
    organizationSchemaSubPositions: MerchantsFormSubPositions.organization,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  "refund-points": {
    organizationSchema:
      $UniRefund_CRMService_RefundPoints_UpdateRefundPointOrganizationDto,
    organizationSchemaSubPositions: RefundPointsFormSubPositions.organization,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  customs: {
    organizationSchema:
      $UniRefund_CRMService_Customss_UpdateCustomsOrganizationDto,
    organizationSchemaSubPositions: CustomsFormSubPositions.organization,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  "tax-free": {
    organizationSchema:
      $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
    organizationSchemaSubPositions: TaxFreeFormSubPositions.organization,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
  "tax-offices": {
    organizationSchema:
      $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
    organizationSchemaSubPositions: TaxOfficesFormSubPositions.organization,
    telephoneSchema:
      $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
    addressSchema: $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
    emailSchema:
      $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  },
};
