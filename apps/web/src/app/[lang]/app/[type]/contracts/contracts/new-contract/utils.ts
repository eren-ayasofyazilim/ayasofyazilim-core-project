import type { UniRefund_ContractService_Contracts_ContractHeaders_ContractHeaderCreateDto as ContractHeaderCreateDto } from "@ayasofyazilim/saas/ContractService";

export type MerchantStepFormDataDto = Pick<
  ContractHeaderCreateDto,
  "merchantId" | "addressId"
>;
