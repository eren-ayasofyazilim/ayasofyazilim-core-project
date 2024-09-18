import { $UniRefund_CRMService_Organizations_UpdateOrganizationDto } from "@ayasofyazilim/saas/CRMService";

export const organization =
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
export const telephone = {
  required: ["areaCode", "ituCountryCode", "localNumber", "typeCode"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    areaCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    localNumber: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    ituCountryCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Home", "Office", "Mobile", "Fax"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
export const address = {
  required: [
    "addressLine",
    "city",
    "country",
    "fullAddress",
    "postalCode",
    "terriority",
    "typeCode",
  ],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    addressLine: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    city: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    terriority: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    postalCode: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    country: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    fullAddress: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Home", "Office"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
export const email = {
  required: ["emailAddress", "typeCode"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    emailAddress: {
      maxLength: 255,
      minLength: 0,
      type: "string",
    },
    primaryFlag: {
      type: "boolean",
    },
    typeCode: {
      enum: ["Work", "Personal"],
      type: "integer",
      format: "int32",
    },
  },
  additionalProperties: false,
};
