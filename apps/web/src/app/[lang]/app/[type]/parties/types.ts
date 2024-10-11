import type {
  UniRefund_CRMService_Customss_CreateCustomsDto,
  UniRefund_CRMService_Merchants_CreateMerchantDto,
  UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  Volo_Abp_Application_Dtos_PagedResultDto_110,
  Volo_Abp_Application_Dtos_PagedResultDto_13,
  Volo_Abp_Application_Dtos_PagedResultDto_16,
  Volo_Abp_Application_Dtos_PagedResultDto_17,
  Volo_Abp_Application_Dtos_PagedResultDto_19,
  $UniRefund_CRMService_Customss_CreateCustomsDto as CreateCustomsSchema,
  $UniRefund_CRMService_Merchants_CreateMerchantDto as CreateMerchantSchema,
  $UniRefund_CRMService_RefundPoints_CreateRefundPointDto as CreateRefundPointSchema,
  $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto as CreateTaxFreeSchema,
  $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto as CreateTaxOfficeSchema,
} from "@ayasofyazilim/saas/CRMService";

export type CreateMerchantDTO =
  UniRefund_CRMService_Merchants_CreateMerchantDto;
export type CreateCustomsDTO = UniRefund_CRMService_Customss_CreateCustomsDto;
export type CreateRefundPointDTO =
  UniRefund_CRMService_RefundPoints_CreateRefundPointDto;
export type CreateTaxFreeDTO = UniRefund_CRMService_TaxFrees_CreateTaxFreeDto;
export type CreateTaxOfficeDTO =
  UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto;

export type GetMerchantDTO = Volo_Abp_Application_Dtos_PagedResultDto_16;
export type GetRefundPointDTO = Volo_Abp_Application_Dtos_PagedResultDto_17;
export type GetCustomsDTO = Volo_Abp_Application_Dtos_PagedResultDto_13;
export type GetTaxFreeDTO = Volo_Abp_Application_Dtos_PagedResultDto_19;
export type GetTaxOfficeDTO = Volo_Abp_Application_Dtos_PagedResultDto_110;

export type PartyNameType =
  | "merchants"
  | "refund-points"
  | "customs"
  | "tax-free"
  | "tax-offices";

export type PartiesResultType =
  | GetMerchantDTO
  | GetRefundPointDTO
  | GetCustomsDTO
  | GetTaxFreeDTO
  | GetTaxOfficeDTO;

export type PartiesCreateDTOType =
  | CreateMerchantDTO
  | CreateCustomsDTO
  | CreateRefundPointDTO
  | CreateTaxFreeDTO
  | CreateTaxOfficeDTO;

export type PartiesCreateType =
  | typeof CreateMerchantSchema
  | typeof CreateRefundPointSchema
  | typeof CreateCustomsSchema
  | typeof CreateTaxFreeSchema
  | typeof CreateTaxOfficeSchema;
