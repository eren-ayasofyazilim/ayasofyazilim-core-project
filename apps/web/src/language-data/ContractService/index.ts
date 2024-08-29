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
    "RefundFees.Page.List.Title":
      resource?.["RefundFees.Page.List.Title"] ||
      data[lang]?.["RefundFees.Page.List.Title"] ||
      data.en["RefundFees.Page.List.Title"],
    "RefundFees.Page.List.Description":
      resource?.["RefundFees.Page.List.Description"] ||
      data[lang]?.["RefundFees.Page.List.Description"] ||
      data.en["RefundFees.Page.List.Description"],
    "RefundFees.Page.List.Create":
      resource?.["RefundFees.Page.List.Create"] ||
      data[lang]?.["RefundFees.Page.List.Create"] ||
      data.en["RefundFees.Page.List.Create"],
    "RefundFees.Page.List.Details":
      resource?.["RefundFees.Page.List.Details"] ||
      data[lang]?.["RefundFees.Page.List.Details"] ||
      data.en["RefundFees.Page.List.Details"],
    "RefundFees.Page.List.Deactivate":
      resource?.["RefundFees.Page.List.Deactivate"] ||
      data[lang]?.["RefundFees.Page.List.Deactivate"] ||
      data.en["RefundFees.Page.List.Deactivate"],
    "RefundFees.Page.List.Create.Save":
      resource?.["RefundFees.Page.List.Create.Save"] ||
      data[lang]?.["RefundFees.Page.List.Create.Save"] ||
      data.en["RefundFees.Page.List.Create.Save"],

    "RefundFees.Page.Edit.Edit":
      resource?.["RefundFees.Page.Edit.Edit"] ||
      data[lang]?.["RefundFees.Page.Edit.Edit"] ||
      data.en["RefundFees.Page.Edit.Edit"],
    "RefundFees.Page.Edit.Preview":
      resource?.["RefundFees.Page.Edit.Preview"] ||
      data[lang]?.["RefundFees.Page.Edit.Preview"] ||
      data.en["RefundFees.Page.Edit.Preview"],
    "RefundFees.Page.Edit.Title":
      resource?.["RefundFees.Page.Edit.Title"] ||
      data[lang]?.["RefundFees.Page.Edit.Title"] ||
      data.en["RefundFees.Page.Edit.Title"],
    "RefundFees.Page.Edit.Description":
      resource?.["RefundFees.Page.Edit.Description"] ||
      data[lang]?.["RefundFees.Page.Edit.Description"] ||
      data.en["RefundFees.Page.Edit.Description"],
    "RefundFees.Page.Edit.Delete":
      resource?.["RefundFees.Page.Edit.Delete"] ||
      data[lang]?.["RefundFees.Page.Edit.Delete"] ||
      data.en["RefundFees.Page.Edit.Delete"],
    "RefundFees.Page.Edit.Save":
      resource?.["RefundFees.Page.Edit.Save"] ||
      data[lang]?.["RefundFees.Page.Edit.Save"] ||
      data.en["RefundFees.Page.Edit.Save"],

    "RefundFees.Page.Edit.Fee.Edit":
      resource?.["RefundFees.Page.Edit.Fee.Edit"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Edit"] ||
      data.en["RefundFees.Page.Edit.Fee.Edit"],
    "RefundFees.Page.Edit.Fee.Edit.Title":
      resource?.["RefundFees.Page.Edit.Fee.Edit.Title"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Edit.Title"] ||
      data.en["RefundFees.Page.Edit.Fee.Edit.Title"],
    "RefundFees.Page.Edit.Fee.Edit.Description":
      resource?.["RefundFees.Page.Edit.Fee.Edit.Description"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Edit.Description"] ||
      data.en["RefundFees.Page.Edit.Fee.Edit.Description"],
    "RefundFees.Page.Edit.Fee.Edit.Save":
      resource?.["RefundFees.Page.Edit.Fee.Edit.Save"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Edit.Save"] ||
      data.en["RefundFees.Page.Edit.Fee.Edit.Save"],

    "RefundFees.Page.Edit.Fee.Create":
      resource?.["RefundFees.Page.Edit.Fee.Create"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Create"] ||
      data.en["RefundFees.Page.Edit.Fee.Create"],
    "RefundFees.Page.Edit.Fee.Create.Title":
      resource?.["RefundFees.Page.Edit.Fee.Create.Title"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Create.Title"] ||
      data.en["RefundFees.Page.Edit.Fee.Create.Title"],
    "RefundFees.Page.Edit.Fee.Create.Description":
      "Yeni ücret düzeni oluşturun",
    "RefundFees.Page.Edit.Fee.Create.Save":
      resource?.["RefundFees.Page.Edit.Fee.Create.Save"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Create.Save"] ||
      data.en["RefundFees.Page.Edit.Fee.Create.Save"],
    "RefundFees.Page.Edit.Fee.Delete":
      resource?.["RefundFees.Page.Edit.Fee.Delete"] ||
      data[lang]?.["RefundFees.Page.Edit.Fee.Delete"] ||
      data.en["RefundFees.Page.Edit.Fee.Delete"],
    "RebateTables.Templates.Create":
      resource?.["RebateTables.Templates.Create"] ||
      data[lang]?.["RebateTables.Templates.Create"] ||
      data.en["RebateTables.Templates.Create"],
    "RebateTables.Templates.Details":
      resource?.["RebateTables.Templates.Details"] ||
      data[lang]?.["RebateTables.Templates.Details"] ||
      data.en["RebateTables.Templates.Details"],
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
