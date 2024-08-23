import type { ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import tr from "./resources/tr.json";
import en from "./resources/en.json";

const data: Record<string, Record<string, string>> = {
  tr,
  en,
};

function getLanguageData(
  resources: ResourceResult,
  lang: string,
): Record<string, string> {
  const resource = resources.ContractService?.texts;
  return {
    HomePage: resource?.HomePage || data[lang].HomePage,
    EditTemplate: resource?.EditTemplate || data[lang].EditTemplate,
    RebateSet: resource?.RebateSet || data[lang].RebateSet,
    ProcessingFees: resource?.ProcessingFees || data[lang].ProcessingFees,
    CancelButton: resource?.CancelButton || data[lang].CancelButton,
    SaveButton: resource?.SaveButton || data[lang].SaveButton,
    RefundMethod: resource?.RefundMethod || data[lang].RefundMethod,
    FixedFee: resource?.FixedFee || data[lang].FixedFee,
    VariableFee: resource?.VariableFee || data[lang].VariableFee,
    Percent: resource?.Percent || data[lang].Percent,
    Name: resource?.Name || data[lang].Name,
    Amount: resource?.Amount || data[lang].Amount,
    All: resource?.All || data[lang].All,
    Cash: resource?.Cash || data[lang].Cash,
    CreditOrDebitCard:
      resource?.CreditOrDebitCard || data[lang].CreditOrDebitCard,
    Alipay: resource?.Alipay || data[lang].Alipay,
    WeChat: resource?.WeChat || data[lang].WeChat,
    CashViaPartner: resource?.CashViaPartner || data[lang].CashViaPartner,
    RefundLater: resource?.RefundLater || data[lang].RefundLater,
    Refund: resource?.Refund || data[lang].Refund,
    RefundTables: resource?.RefundTables || data[lang].RefundTables,
    "RefundTables.Details":
      resource?.["RefundTables.Details"] || data[lang]["RefundTables.Details"],
    "RefundTables.Create.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Create.Title"],
    "RefundTables.Create.Description":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Create.Description"],
    "RefundTables.Edit.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Edit.Title"],
    "RefundTables.Edit.Description":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Edit.Description"],
    "RefundTables.Delete.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Delete.Title"],
    "RefundTables.Delete.Description":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Delete.Description"],

    "RefundTables.Name":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Name"],
    "RefundTables.ValidFrom":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.ValidFrom"],
    "RefundTables.ValidTo":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.ValidTo"],
    "RefundTables.IsDefault":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.IsDefault"],
    "RefundTables.IsBundling":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.IsBundling"],
    "RefundTables.LastModificationTime":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.LastModificationTime"],
    "RefundTables.Actions":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Actions"],
    "RefundTables.Edit":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Edit"],
    "RefundTables.Delete":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Delete"],
    "RefundTables.Cancel":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Cancel"],
    "RefundTables.Save":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Save"],
  };
}
export async function getResourceData(lang: string): Promise<{
  languageData: Record<string, string>;
  resources: ResourceResult;
}> {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(
  resources: ResourceResult,
  lang: string,
): Record<string, string> {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
