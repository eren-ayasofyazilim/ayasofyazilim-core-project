/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
import { getLocalizationResources } from "src/utils";

function getLanguageData(resources: any): Record<string, string> {
  const resource = resources?.ContractService?.texts;
  return {
    HomePage: resource?.HomePage || "Home Page",
    EditTemplate: resource?.EditTemplate || "Edit Template Information",
    RebateSet: resource?.RebateSet || "Rebate set up",
    ProcessingFees: resource?.ProcessingFees || "processing fees",
    CancelButton: resource?.CancelButton || "Cancel",
    SaveButton: resource?.SaveButton || "Save",
    RefundMethod: resource?.RefundMethod || "Refund Method",
    FixedFee: resource?.FixedFee || "Fixed fee",
    VariableFee: resource?.VariableFee || "Variable fee",
    Percent: resource?.Percent || "percent",
    Name: resource?.Name || "Name",
    Amount: resource?.Amount || "Amount",
    All: resource?.All || "All",
    Cash: resource?.Cash || "Cash",
    CreditOrDebitCard: resource?.CreditOrDebitCard || "Credit or debit card",
    Alipay: resource?.Alipay || "Alipay",
    WeChat: resource?.WeChat || "WeChat",
    CashViaPartner: resource?.CashViaPartner || "Cash via partner",
    RefundLater: resource?.RefundLater || "Refund later",
    Refund: "Refund",
    RefundTables: resource?.RefundTables || "Refund tables",
    "RefundTables.Details": resource?.["RefundTables.Details"] || "Details",
    "RefundTables.Create.Title":
      resource?.["RefundTables.Create.Title"] || "New refund table",
    "RefundTables.Create.Description":
      resource?.["RefundTables.Create.Title"] || "Create a new refund table",
    "RefundTables.Edit.Title":
      resource?.["RefundTables.Create.Title"] || "Edit refund table",
    "RefundTables.Edit.Description":
      resource?.["RefundTables.Create.Title"] || "Edit selected refund table",
    "RefundTables.Delete.Title":
      resource?.["RefundTables.Create.Title"] || "Delete refund table",
    "RefundTables.Delete.Description":
      resource?.["RefundTables.Create.Title"] ||
      "Are you sure you want to delete this refund table?",

    "RefundTables.Name": resource?.["RefundTables.Create.Title"] || "Name",
    "RefundTables.ValidFrom":
      resource?.["RefundTables.Create.Title"] || "Valid from",
    "RefundTables.ValidTo":
      resource?.["RefundTables.Create.Title"] || "Valid to",
    "RefundTables.IsDefault":
      resource?.["RefundTables.Create.Title"] || "Is default",
    "RefundTables.IsBundling":
      resource?.["RefundTables.Create.Title"] || "Is bundling",
    "RefundTables.LastModificationTime":
      resource?.["RefundTables.Create.Title"] || "Last modification time",
    "RefundTables.Actions":
      resource?.["RefundTables.Create.Title"] || "Actions",
    "RefundTables.Edit": resource?.["RefundTables.Create.Title"] || "Edit",
    "RefundTables.Delete": resource?.["RefundTables.Create.Title"] || "Delete",
    "RefundTables.Cancel": resource?.["RefundTables.Create.Title"] || "Cancel",
    "RefundTables.Save": resource?.["RefundTables.Create.Title"] || "Save",
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
