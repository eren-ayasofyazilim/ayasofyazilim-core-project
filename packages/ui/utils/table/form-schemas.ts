import {
  $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";

// re-usable shorter imports
export const UpdateOrganizationDto =
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
export const UpdateTelephoneTypeDto =
  $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
export const UpdateAddressTypeDto =
  $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto;
export const UpdateEmailCommonDataDto =
  $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto;

// re-usable schema sub-positions to prevent repeated code
const TelephoneSubPosition = ["localNumber", "typeCode"];
const AddressSubPosition = [
  "country",
  "terriority",
  "city",
  "postalCode",
  "addressLine",
  "fullAddress",
  "typeCode",
];
const EmailSubPosition = ["emailAddress", "typeCode"];
export const ContactFormSubPositions = {
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};

// re-usable schemas to prevent repeated code
export const emailSchema = createZodObject(
  UpdateEmailCommonDataDto,
  ContactFormSubPositions.email,
);
export const telephoneSchema = createZodObject(
  UpdateTelephoneTypeDto,
  ContactFormSubPositions.telephone,
);

export const addressSchema = createZodObject(
  UpdateAddressTypeDto,
  ContactFormSubPositions.address,
);

export type telephoneTypeCodes = "HOME" | "OFFICE" | "MOBILE" | "FAX";

export type addressTypeCodes = "HOME" | "OFFICE";

export type emailTypeCodes = "WORK" | "PERSONAL";
