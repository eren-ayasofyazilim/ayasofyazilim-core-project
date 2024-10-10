import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface SettingServiceResource {
  new: string;
  Edit: string;
  Delete: string;
  "Delete.Assurance": string;
  Vat: string;
  "Vat.New": string;
  "Vat.Description": string;
  ProductGroup: string;
  "ProductGroup.New": string;
  "ProductGroup.Description": string;
  ProductGroupVAT: string;
  "ProductGroupVAT.New": string;
  "ProductGroupVAT.Description": string;
  TenantSettings: string;
  "TenantSettings.Description": string;
  Cancel: string;
  "Setting.Save": string;
  "Setting.Edit.Save": string;
  "Form.Create.percent": string;
  "Form.Create.minimumTotalAmount": string;
  "Form.Create.countryId": string;
  "Form.Create.active": string;
  "Form.Create.name": string;
  "Form.Create.articleCode": string;
  "Form.Create.unitCode": string;
  "Form.Create.companyType": string;
  "Form.Create.food": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): SettingServiceResource {
  const resource = resources.CrmService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    "Delete.Assurance":
      uiResource?.["Delete.Assurance"] ||
      data[lang]?.["Delete.Assurance"] ||
      data.en["Delete.Assurance"],
    Cancel: uiResource?.Cancel || data[lang]?.Cancel || data.en.Cancel,
    Vat: resource?.Vat || data[lang]?.Vat || data.en.Vat,
    "Vat.New":
      resource?.["Vat.New"] || data[lang]?.["Vat.New"] || data.en["Vat.New"],
    "Vat.Description":
      resource?.["Vat.Description"] ||
      data[lang]?.["Vat.Description"] ||
      data.en["Vat.Description"],
    ProductGroup:
      resource?.ProductGroup ||
      data[lang]?.ProductGroup ||
      data.en.ProductGroup,
    "ProductGroup.New":
      resource?.["ProductGroup.New"] ||
      data[lang]?.["ProductGroup.New"] ||
      data.en["ProductGroup.New"],
    "ProductGroup.Description":
      resource?.["ProductGroup.Description"] ||
      data[lang]?.["ProductGroup.Description"] ||
      data.en["ProductGroup.Description"],
    ProductGroupVAT:
      resource?.ProductGroupVAT ||
      data[lang]?.ProductGroupVAT ||
      data.en.ProductGroupVAT,
    "ProductGroupVAT.New":
      resource?.["ProductGroupVAT.New"] ||
      data[lang]?.["ProductGroupVAT.New"] ||
      data.en["ProductGroupVAT.New"],
    "ProductGroupVAT.Description":
      resource?.["ProductGroupVAT.Description"] ||
      data[lang]?.["ProductGroupVAT.Description"] ||
      data.en["ProductGroupVAT.Description"],
    TenantSettings:
      resource?.TenantSettings ||
      data[lang]?.TenantSettings ||
      data.en.TenantSettings,
    "TenantSettings.Description":
      resource?.["TenantSettings.Description"] ||
      data[lang]?.["TenantSettings.Description"] ||
      data.en["TenantSettings.Description"],
    "Setting.Save":
      resource?.["Setting.Save"] ||
      data[lang]?.["Setting.Save"] ||
      data.en["Setting.Save"],
    "Setting.Edit.Save":
      resource?.["Setting.Edit.Save"] ||
      data[lang]?.["Setting.Edit.Save"] ||
      data.en["Setting.Edit.Save"],
    "Form.Create.percent":
      resource?.["Form.Create.percent"] ||
      data[lang]?.["Form.Create.percent"] ||
      data.en["Form.Create.percent"],
    "Form.Create.minimumTotalAmount":
      resource?.["Form.Create.minimumTotalAmount"] ||
      data[lang]?.["Form.Create.minimumTotalAmount"] ||
      data.en["Form.Create.minimumTotalAmount "],
    "Form.Create.countryId":
      resource?.["Form.Create.countryId"] ||
      data[lang]?.["Form.Create.countryId"] ||
      data.en["Form.Create.countryId"],
    "Form.Create.active":
      resource?.["Form.Create.active"] ||
      data[lang]?.["Form.Create.active"] ||
      data.en["Form.Create.active"],
    "Form.Create.name":
      resource?.["Form.Create.name"] ||
      data[lang]?.["Form.Create.name"] ||
      data.en["Form.Create.name"],
    "Form.Create.articleCode":
      resource?.["Form.Create.articleCode"] ||
      data[lang]?.["Form.Create.articleCode"] ||
      data.en["Form.Create.articleCode"],
    "Form.Create.unitCode":
      resource?.["Form.Create.unitCode"] ||
      data[lang]?.["Form.Create.unitCode"] ||
      data.en["Form.Create.unitCode"],
    "Form.Create.companyType":
      resource?.["Form.Create.companyType"] ||
      data[lang]?.["Form.Create.companyType"] ||
      data.en["Form.Create.companyType"],
    "Form.Create.food":
      resource?.["Form.Create.food"] ||
      data[lang]?.["Form.Create.food"] ||
      data.en["Form.Create.food"],
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
