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
  return {
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

    "RebateTables.CompanySettings.Title":
      resource?.["RebateTables.CompanySettings.Title"] ||
      data[lang]?.["RebateTables.CompanySettings.Title"] ||
      data.en["RebateTables.CompanySettings.Title"],
    "RebateTables.CompanySettings.Description":
      resource?.["RebateTables.CompanySettings.Description"] ||
      data[lang]?.["RebateTables.CompanySettings.Description"] ||
      data.en["RebateTables.CompanySettings.Description"],

    "RebateTables.Templates.Title":
      resource?.["RebateTables.Templates.Title"] ||
      data[lang]?.["RebateTables.Templates.Title"] ||
      data.en["RebateTables.Templates.Title"],
    "RebateTables.Templates.Description":
      resource?.["RebateTables.Templates.Description"] ||
      data[lang]?.["RebateTables.Templates.Description"] ||
      data.en["RebateTables.Templates.Description"],
    "RebateTables.Templates.Delete":
      resource?.["RebateTables.Templates.Delete"] ||
      data[lang]?.["RebateTables.Templates.Delete"] ||
      data.en["RebateTables.Templates.Delete"],
    "RebateTables.Templates.Details":
      resource?.["RebateTables.Templates.Details"] ||
      data[lang]?.["RebateTables.Templates.Details"] ||
      data.en["RebateTables.Templates.Details"],

    "RebateTables.Templates.Create":
      resource?.["RebateTables.Templates.Create"] ||
      data[lang]?.["RebateTables.Templates.Create"] ||
      data.en["RebateTables.Templates.Create"],
    "RebateTables.Templates.Create.Title":
      resource?.["RebateTables.Templates.Create.Title"] ||
      data[lang]?.["RebateTables.Templates.Create.Title"] ||
      data.en["RebateTables.Templates.Create.Title"],
    "RebateTables.Templates.Create.Description":
      resource?.["RebateTables.Templates.Create.Description"] ||
      data[lang]?.["RebateTables.Templates.Create.Description"] ||
      data.en["RebateTables.Templates.Create.Description"],
    "RebateTables.Templates.Create.TemplateInformation":
      resource?.["RebateTables.Templates.Create.TemplateInformation"] ||
      data[lang]?.["RebateTables.Templates.Create.TemplateInformation"] ||
      data.en["RebateTables.Templates.Create.TemplateInformation"],
    "RebateTables.Templates.Create.ProcessingFees":
      resource?.["RebateTables.Templates.Create.ProcessingFees"] ||
      data[lang]?.["RebateTables.Templates.Create.ProcessingFees"] ||
      data.en["RebateTables.Templates.Create.ProcessingFees"],
    "RebateTables.Templates.Create.RebateSetup":
      resource?.["RebateTables.Templates.Create.RebateSetup"] ||
      data[lang]?.["RebateTables.Templates.Create.RebateSetup"] ||
      data.en["RebateTables.Templates.Create.RebateSetup"],
    "RebateTables.Templates.Create.Save":
      resource?.["RebateTables.Templates.Create.Save"] ||
      data[lang]?.["RebateTables.Templates.Create.Save"] ||
      data.en["RebateTables.Templates.Create.Save"],
    "RebateTables.Templates.Create.Cancel":
      resource?.["RebateTables.Templates.Create.Cancel"] ||
      data[lang]?.["RebateTables.Templates.Create.Cancel"] ||
      data.en["RebateTables.Templates.Create.Cancel"],

    "RebateTables.Templates.Edit":
      resource?.["RebateTables.Templates.Edit"] ||
      data[lang]?.["RebateTables.Templates.Edit"] ||
      data.en["RebateTables.Templates.Edit"],
    "RebateTables.Templates.Edit.Title":
      resource?.["RebateTables.Templates.Edit.Title"] ||
      data[lang]?.["RebateTables.Templates.Edit.Title"] ||
      data.en["RebateTables.Templates.Edit.Title"],
    "RebateTables.Templates.Edit.Description":
      resource?.["RebateTables.Templates.Edit.Description"] ||
      data[lang]?.["RebateTables.Templates.Edit.Description"] ||
      data.en["RebateTables.Templates.Edit.Description"],
    "RebateTables.Templates.Edit.TemplateInformation":
      resource?.["RebateTables.Templates.Edit.TemplateInformation"] ||
      data[lang]?.["RebateTables.Templates.Edit.TemplateInformation"] ||
      data.en["RebateTables.Templates.Edit.TemplateInformation"],
    "RebateTables.Templates.Edit.ProcessingFees":
      resource?.["RebateTables.Templates.Edit.ProcessingFees"] ||
      data[lang]?.["RebateTables.Templates.Edit.ProcessingFees"] ||
      data.en["RebateTables.Templates.Edit.ProcessingFees"],
    "RebateTables.Templates.Edit.RebateSetup":
      resource?.["RebateTables.Templates.Edit.RebateSetup"] ||
      data[lang]?.["RebateTables.Templates.Edit.RebateSetup"] ||
      data.en["RebateTables.Templates.Edit.RebateSetup"],
    "RebateTables.Templates.Edit.Save":
      resource?.["RebateTables.Templates.Edit.Save"] ||
      data[lang]?.["RebateTables.Templates.Edit.Save"] ||
      data.en["RebateTables.Templates.Edit.Save"],
    "RebateTables.Templates.Edit.Cancel":
      resource?.["RebateTables.Templates.Edit.Cancel"] ||
      data[lang]?.["RebateTables.Templates.Edit.Cancel"] ||
      data.en["RebateTables.Templates.Edit.Cancel"],
    "RebateTables.Templates.RefundMethod.Option.All":
      resource?.["RebateTables.Templates.RefundMethod.Option.All"] ||
      data[lang]?.["RebateTables.Templates.RefundMethod.Option.All"] ||
      data.en["RebateTables.Templates.RefundMethod.Option.All"],
    "RebateTables.Templates.RefundMethod.Option.Cash":
      resource?.["RebateTables.Templates.RefundMethod.Option.Cash"] ||
      data[lang]?.["RebateTables.Templates.RefundMethod.Option.Cash"] ||
      data.en["RebateTables.Templates.RefundMethod.Option.Cash"],
    "RebateTables.Templates.RefundMethod.Option.CreditOrDebitCard":
      resource?.[
        "RebateTables.Templates.RefundMethod.Option.CreditOrDebitCard"
      ] ||
      data[lang]?.[
        "RebateTables.Templates.RefundMethod.Option.CreditOrDebitCard"
      ] ||
      data.en["RebateTables.Templates.RefundMethod.Option.CreditOrDebitCard"],
    "RebateTables.Templates.RefundMethod.Option.Alipay":
      resource?.["RebateTables.Templates.RefundMethod.Option.Alipay"] ||
      data[lang]?.["RebateTables.Templates.RefundMethod.Option.Alipay"] ||
      data.en["RebateTables.Templates.RefundMethod.Option.Alipay"],
    "RebateTables.Templates.RefundMethod.Option.WeChat":
      resource?.["RebateTables.Templates.RefundMethod.Option.WeChat"] ||
      data[lang]?.["RebateTables.Templates.RefundMethod.Option.WeChat"] ||
      data.en["RebateTables.Templates.RefundMethod.Option.WeChat"],
    "RebateTables.Templates.RefundMethod.Option.CashViaPartner":
      resource?.["RebateTables.Templates.RefundMethod.Option.CashViaPartner"] ||
      data[lang]?.[
        "RebateTables.Templates.RefundMethod.Option.CashViaPartner"
      ] ||
      data.en["RebateTables.Templates.RefundMethod.Option.CashViaPartner"],
    "RebateTables.Templates.RefundMethod.Option.RefundLater":
      resource?.["RebateTables.Templates.RefundMethod.Option.RefundLater"] ||
      data[lang]?.["RebateTables.Templates.RefundMethod.Option.RefundLater"] ||
      data.en["RebateTables.Templates.RefundMethod.Option.RefundLater"],

    "RebateTables.Templates.Column.RefundMethod":
      resource?.["RebateTables.Templates.Column.RefundMethod"] ||
      data[lang]?.["RebateTables.Templates.Column.RefundMethod"] ||
      data.en["RebateTables.Templates.Column.RefundMethod"],
    "RebateTables.Templates.Column.FixedFee":
      resource?.["RebateTables.Templates.Column.FixedFee"] ||
      data[lang]?.["RebateTables.Templates.Column.FixedFee"] ||
      data.en["RebateTables.Templates.Column.FixedFee"],
    "RebateTables.Templates.Column.VariableFee":
      resource?.["RebateTables.Templates.Column.VariableFee"] ||
      data[lang]?.["RebateTables.Templates.Column.VariableFee"] ||
      data.en["RebateTables.Templates.Column.VariableFee"],
    "RebateTables.Templates.Column.Percent":
      resource?.["RebateTables.Templates.Column.Percent"] ||
      data[lang]?.["RebateTables.Templates.Column.Percent"] ||
      data.en["RebateTables.Templates.Column.Percent"],
    "RebateTables.Templates.Column.Name":
      resource?.["RebateTables.Templates.Column.Name"] ||
      data[lang]?.["RebateTables.Templates.Column.Name"] ||
      data.en["RebateTables.Templates.Column.Name"],
    "RebateTables.Templates.Column.Amount":
      resource?.["RebateTables.Templates.Column.Amount"] ||
      data[lang]?.["RebateTables.Templates.Column.Amount"] ||
      data.en["RebateTables.Templates.Column.Amount"],
    "RebateTables.Templates.Column.Actions":
      resource?.["RebateTables.Templates.Column.Actions"] ||
      data[lang]?.["RebateTables.Templates.Column.Actions"] ||
      data.en["RebateTables.Templates.Column.Actions"],

    "RebateTables.Templates.Preview":
      resource?.["RebateTables.Templates.Preview"] ||
      data[lang]?.["RebateTables.Templates.Preview"] ||
      data.en["RebateTables.Templates.Preview"],
    "RebateTables.Templates.Preview.Calculate":
      resource?.["RebateTables.Templates.Preview.Calculate"] ||
      data[lang]?.["RebateTables.Templates.Preview.Calculate"] ||
      data.en["RebateTables.Templates.Preview.Calculate"],
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
