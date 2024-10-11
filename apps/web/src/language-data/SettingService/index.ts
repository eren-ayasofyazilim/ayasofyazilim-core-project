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
  "Form.percent": string;
  "Form.minimumTotalAmount": string;
  "Form.countryId": string;
  "Form.active": string;
  "Form.name": string;
  "Form.articleCode": string;
  "Form.unitCode": string;
  "Form.companyType": string;
  "Form.food": string;
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
    "Form.percent":
      resource?.["Form.percent"] ||
      data[lang]?.["Form.percent"] ||
      data.en["Form.percent"],
    "Form.minimumTotalAmount":
      resource?.["Form.minimumTotalAmount"] ||
      data[lang]?.["Form.minimumTotalAmount"] ||
      data.en["Form.minimumTotalAmount "],
    "Form.countryId":
      resource?.["Form.countryId"] ||
      data[lang]?.["Form.countryId"] ||
      data.en["Form.countryId"],
    "Form.active":
      resource?.["Form.active"] ||
      data[lang]?.["Form.active"] ||
      data.en["Form.active"],
    "Form.name":
      resource?.["Form.name"] ||
      data[lang]?.["Form.name"] ||
      data.en["Form.name"],
    "Form.articleCode":
      resource?.["Form.articleCode"] ||
      data[lang]?.["Form.articleCode"] ||
      data.en["Form.articleCode"],
    "Form.unitCode":
      resource?.["Form.unitCode"] ||
      data[lang]?.["Form.unitCode"] ||
      data.en["Form.unitCode"],
    "Form.companyType":
      resource?.["Form.companyType"] ||
      data[lang]?.["Form.companyType"] ||
      data.en["Form.companyType"],
    "Form.food":
      resource?.["Form.food"] ||
      data[lang]?.["Form.food"] ||
      data.en["Form.food"],
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
