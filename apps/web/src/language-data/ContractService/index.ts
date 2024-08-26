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
  const navigationResource = resources.Navigation?.texts;
  return {
    HomePage:
      navigationResource?.HomePage || data[lang].HomePage || data.en.HomePage,
    EditTemplate:
      resource?.EditTemplate || data[lang].EditTemplate || data.en.EditTemplate,
    RebateSet: resource?.RebateSet || data[lang].RebateSet || data.en.RebateSet,
    ProcessingFees:
      resource?.ProcessingFees ||
      data[lang].ProcessingFees ||
      data.en.ProcessingFees,
    CancelButton:
      resource?.CancelButton || data[lang].CancelButton || data.en.CancelButton,
    SaveButton:
      resource?.SaveButton || data[lang].SaveButton || data.en.SaveButton,
    RefundMethod:
      resource?.RefundMethod || data[lang].RefundMethod || data.en.RefundMethod,
    FixedFee: resource?.FixedFee || data[lang].FixedFee || data.en.FixedFee,
    VariableFee:
      resource?.VariableFee || data[lang].VariableFee || data.en.VariableFee,
    Percent: resource?.Percent || data[lang].Percent || data.en.Percent,
    Name: resource?.Name || data[lang].Name || data.en.Name,
    Amount: resource?.Amount || data[lang].Amount || data.en.Amount,
    All: resource?.All || data[lang].All || data.en.All,
    Cash: resource?.Cash || data[lang].Cash || data.en.Cash,
    CreditOrDebitCard:
      resource?.CreditOrDebitCard ||
      data[lang].CreditOrDebitCard ||
      data.en.CreditOrDebitCard,
    Alipay: resource?.Alipay || data[lang].Alipay || data.en.Alipay,
    WeChat: resource?.WeChat || data[lang].WeChat || data.en.WeChat,
    CashViaPartner:
      resource?.CashViaPartner ||
      data[lang].CashViaPartner ||
      data.en.CashViaPartner,
    RefundLater:
      resource?.RefundLater || data[lang].RefundLater || data.en.RefundLater,
    Refund: resource?.Refund || data[lang].Refund || data.en.Refund,
    RefundTables:
      resource?.RefundTables || data[lang].RefundTables || data.en.RefundTables,
    "RefundTables.Details":
      resource?.["RefundTables.Details"] ||
      data[lang]["RefundTables.Details"] ||
      data.en["RefundTables.Details"],
    "RefundTables.Create.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Create.Title"] ||
      data.en["RefundTables.Create.Title"],
    "RefundTables.Create.Description":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Create.Description"] ||
      data.en["RefundTables.Create.Description"],
    "RefundTables.Edit.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Edit.Title"] ||
      data.en["RefundTables.Edit.Title"],
    "RefundTables.Edit.Description":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Edit.Description"] ||
      data.en["RefundTables.Edit.Description"],
    "RefundTables.Delete.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Delete.Title"] ||
      data.en["RefundTables.Delete.Title"],
    "RefundTables.Delete.Description":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Delete.Description"] ||
      data.en["RefundTables.Delete.Description"],

    "RefundTables.Name":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Name"] ||
      data.en["RefundTables.Name"],
    "RefundTables.ValidFrom":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.ValidFrom"] ||
      data.en["RefundTables.ValidFrom"],
    "RefundTables.ValidTo":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.ValidTo"] ||
      data.en["RefundTables.ValidTo"],
    "RefundTables.IsDefault":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.IsDefault"] ||
      data.en["RefundTables.IsDefault"],
    "RefundTables.IsBundling":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.IsBundling"] ||
      data.en["RefundTables.IsBundling"],
    "RefundTables.LastModificationTime":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.LastModificationTime"] ||
      data.en["RefundTables.LastModificationTime"],
    "RefundTables.Actions":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Actions"] ||
      data.en["RefundTables.Actions"],
    "RefundTables.Edit":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Edit"] ||
      data.en["RefundTables.Edit"],
    "RefundTables.Delete":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Delete"] ||
      data.en["RefundTables.Delete"],
    "RefundTables.Cancel":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Cancel"] ||
      data.en["RefundTables.Cancel"],
    "RefundTables.Save":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]["RefundTables.Save"] ||
      data.en["RefundTables.Save"],
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
