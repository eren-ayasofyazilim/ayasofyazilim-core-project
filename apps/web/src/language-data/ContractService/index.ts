import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

function getLanguageData(resources: ResourceResult, lang: string) {
  const resource = resources.ContractService?.texts;
  const navigationResource = resources.Navigation?.texts;
  return {
    HomePage:
      navigationResource?.HomePage || data[lang]?.HomePage || data.en.HomePage,
    EditTemplate:
      resource?.EditTemplate ||
      data[lang]?.EditTemplate ||
      data.en.EditTemplate,
    RebateSet:
      resource?.RebateSet || data[lang]?.RebateSet || data.en.RebateSet,
    ProcessingFees:
      resource?.ProcessingFees ||
      data[lang]?.ProcessingFees ||
      data.en.ProcessingFees,
    CancelButton:
      resource?.CancelButton ||
      data[lang]?.CancelButton ||
      data.en.CancelButton,
    SaveButton:
      resource?.SaveButton || data[lang]?.SaveButton || data.en.SaveButton,
    RefundMethod:
      resource?.RefundMethod ||
      data[lang]?.RefundMethod ||
      data.en.RefundMethod,
    FixedFee: resource?.FixedFee || data[lang]?.FixedFee || data.en.FixedFee,
    VariableFee:
      resource?.VariableFee || data[lang]?.VariableFee || data.en.VariableFee,
    Percent: resource?.Percent || data[lang]?.Percent || data.en.Percent,
    Name: resource?.Name || data[lang]?.Name || data.en.Name,
    Amount: resource?.Amount || data[lang]?.Amount || data.en.Amount,
    All: resource?.All || data[lang]?.All || data.en.All,
    Cash: resource?.Cash || data[lang]?.Cash || data.en.Cash,
    CreditOrDebitCard:
      resource?.CreditOrDebitCard ||
      data[lang]?.CreditOrDebitCard ||
      data.en.CreditOrDebitCard,
    Alipay: resource?.Alipay || data[lang]?.Alipay || data.en.Alipay,
    WeChat: resource?.WeChat || data[lang]?.WeChat || data.en.WeChat,
    CashViaPartner:
      resource?.CashViaPartner ||
      data[lang]?.CashViaPartner ||
      data.en.CashViaPartner,
    RefundLater:
      resource?.RefundLater || data[lang]?.RefundLater || data.en.RefundLater,
    Refund: resource?.Refund || data[lang]?.Refund || data.en.Refund,
    RefundTables:
      resource?.RefundTables ||
      data[lang]?.RefundTables ||
      data.en.RefundTables,

    "RefundTables.Create.Title":
      resource?.["RefundTables.Create.Title"] ||
      data[lang]?.["RefundTables.Create.Title"] ||
      data.en["New refund table"],
    "RefundTables.Create.Description":
      resource?.["RefundTables.Create.Description"] ||
      data[lang]?.["RefundTables.Create.Description"] ||
      data.en["Create a new refund table"],
    "RefundTables.Create.Submit":
      resource?.["RefundTables.Create.Submit"] ||
      data[lang]?.["RefundTables.Create.Submit"] ||
      data.en.Submit,

    "RefundTables.Edit.Title":
      resource?.["RefundTables.Edit.Title"] ||
      data[lang]?.["RefundTables.Edit.Title"] ||
      data.en["Edit refund table"],
    "RefundTables.Edit.Description":
      resource?.["RefundTables.Edit.Description"] ||
      data[lang]?.["RefundTables.Edit.Description"] ||
      data.en["Edit selected refund table"],
    "RefundTables.Edit.Submit":
      resource?.["RefundTables.Edit.Submit"] ||
      data[lang]?.["RefundTables.Edit.Submit"] ||
      data.en.Submit,

    "RefundTables.Delete.Title":
      resource?.["RefundTables.Delete.Title"] ||
      data[lang]?.["RefundTables.Delete.Title"] ||
      data.en["Delete refund table"],
    "RefundTables.Delete.Description":
      "Are you sure you want to delete this refund table?",

    "RefundTables.Details":
      resource?.["RefundTables.Details"] ||
      data[lang]?.["RefundTables.Details"] ||
      data.en.Details,
    "RefundTables.Details.FilterBy {0}":
      resource?.["RefundTables.Details.FilterBy {0}"] ||
      data[lang]?.["RefundTables.Details.FilterBy {0}"] ||
      data.en["Filter by {}"],
    "RefundTables.Details.Save":
      resource?.["RefundTables.Details.Save"] ||
      data[lang]?.["RefundTables.Details.Save"] ||
      data.en.Save,
    "RefundTables.Details.Delete":
      resource?.["RefundTables.Details.Delete"] ||
      data[lang]?.["RefundTables.Details.Delete"] ||
      data.en.Delete,
    "RefundTables.Details.Create.Title":
      resource?.["RefundTables.Details.Create.Title"] ||
      data[lang]?.["RefundTables.Details.Create.Title"] ||
      data.en["Create Rule"],
    "RefundTables.Details.Create.Description":
      resource?.["RefundTables.Details.Create.Description"] ||
      data[lang]?.["RefundTables.Details.Create.Description"] ||
      data.en["Create a new rule"],
    "RefundTables.Details.Create.Submit":
      resource?.["RefundTables.Details.Create.Submit"] ||
      data[lang]?.["RefundTables.Details.Create.Submit"] ||
      data.en.Submit,
    "RefundTables.Details.Edit.Title":
      resource?.["RefundTables.Details.Edit.Title"] ||
      data[lang]?.["RefundTables.Details.Edit.Title"] ||
      data.en["Edit rule"],
    "RefundTables.Details.Edit.Description":
      resource?.["RefundTables.Details.Edit.Description"] ||
      data[lang]?.["RefundTables.Details.Edit.Description"] ||
      data.en["Edit selected rule"],
    "RefundTables.Details.Delete.Confirm":
      "Are you sure you want to delete this rule?",
    "RefundTables.Details.Delete.Confirm.Title":
      resource?.["RefundTables.Details.Delete.Confirm.Title"] ||
      data[lang]?.["RefundTables.Details.Delete.Confirm.Title"] ||
      data.en["Delete rule"],

    "RefundTables.Name":
      resource?.["RefundTables.Name"] ||
      data[lang]?.["RefundTables.Name"] ||
      data.en.Name,
    "RefundTables.ValidFrom":
      resource?.["RefundTables.ValidFrom"] ||
      data[lang]?.["RefundTables.ValidFrom"] ||
      data.en["Valid from"],
    "RefundTables.ValidTo":
      resource?.["RefundTables.ValidTo"] ||
      data[lang]?.["RefundTables.ValidTo"] ||
      data.en["Valid to"],
    "RefundTables.IsDefault":
      resource?.["RefundTables.IsDefault"] ||
      data[lang]?.["RefundTables.IsDefault"] ||
      data.en["Is default"],
    "RefundTables.IsBundling":
      resource?.["RefundTables.IsBundling"] ||
      data[lang]?.["RefundTables.IsBundling"] ||
      data.en["Is bundling"],
    "RefundTables.LastModificationTime":
      resource?.["RefundTables.LastModificationTime"] ||
      data[lang]?.["RefundTables.LastModificationTime"] ||
      data.en["Last modification time"],
    "RefundTables.Actions":
      resource?.["RefundTables.Actions"] ||
      data[lang]?.["RefundTables.Actions"] ||
      data.en.Actions,
    "RefundTables.Edit":
      resource?.["RefundTables.Edit"] ||
      data[lang]?.["RefundTables.Edit"] ||
      data.en.Edit,
    "RefundTables.Delete":
      resource?.["RefundTables.Delete"] ||
      data[lang]?.["RefundTables.Delete"] ||
      data.en.Delete,
    "RefundTables.Cancel":
      resource?.["RefundTables.Cancel"] ||
      data[lang]?.["RefundTables.Cancel"] ||
      data.en.Cancel,
    "RefundTables.Save":
      resource?.["RefundTables.Save"] ||
      data[lang]?.["RefundTables.Save"] ||
      data.en.Save,
  };
}
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: ResourceResult, lang: string) {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
