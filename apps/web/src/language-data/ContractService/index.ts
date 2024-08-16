/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
import { getLocalizationResources } from "src/utils";

function getLanguageData(resources: any): Record<string, string> {
  const navigationResource = resources?.ContractService?.texts;
  return {
    HomePage: navigationResource?.HomePage || "Home Page",
    EditTemplate:
      navigationResource?.EditTemplate || "Edit Template Information",
    RebateSet: navigationResource?.RebateSet || "Rebate set up",
    ProcessingFees: navigationResource?.ProcessingFees || "processing fees",
    CancelButton: navigationResource?.CancelButton || "Cancel",
    SaveButton: navigationResource?.SaveButton || "Save",
    RefundMethod: navigationResource?.RefundMethod || "Refund Method",
    FixedFee: navigationResource?.FixedFee || "Fixed fee",
    VariableFee: navigationResource?.VariableFee || "Variable fee",
    Percent: navigationResource?.Percent || "percent",
    Name: navigationResource?.Name || "Name",
    Amount: navigationResource?.Amount || "Amount",
    All: navigationResource?.All || "All",
    Cash: navigationResource?.Cash || "Cash",
    CreditOrDebitCard:
      navigationResource?.CreditOrDebitCard || "Credit or debit card",
    Alipay: navigationResource?.Alipay || "Alipay",
    WeChat: navigationResource?.WeChat || "WeChat",
    CashViaPartner: navigationResource?.CashViaPartner || "Cash via partner",
    RefundLater: navigationResource?.RefundLater || "Refund later",
  };
}
export async function getResourceData(lang: string): Promise<{
  languageData: Record<string, string>;
  resources: any;
}> {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: any): Record<string, string> {
  const languageData = getLanguageData(resources);
  return languageData;
}
