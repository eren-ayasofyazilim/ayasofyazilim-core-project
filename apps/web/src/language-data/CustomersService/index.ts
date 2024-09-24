import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface TravellerServiceResource {
  new: string;
  Edit: string;
  Delete: string;
  Save: string;
  Customers: string;
  Customer: string;
  "Customer.Description": string;
  "Customer.New": string;
  "Customer.Edit": string;
  "Customers.New": string;
  Organization: string;
  Email: string;
  Telephone: string;
  Address: string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): TravellerServiceResource {
  const resource = resources.CustomersService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    Customers:
      resource?.Customers || data[lang]?.Customers || data.en.Customers,
    Customer: resource?.Customer || data[lang]?.Customer || data.en.Customer,
    Organization:
      resource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    Email: resource?.Email || data[lang]?.Email || data.en.Email,
    Telephone:
      resource?.Telephone || data[lang]?.Telephone || data.en.Telephone,
    Address: resource?.Address || data[lang]?.Address || data.en.Address,
    Save: resource?.Save || data[lang]?.Save || data.en.Save,
    "Customer.New":
      resource?.["Customer.New"] ||
      data[lang]?.["Customer.New"] ||
      data.en["Customer.New"],
    "Customer.Edit":
      resource?.["Customer.Edit"] ||
      data[lang]?.["Customer.Edit"] ||
      data.en["Customer.Edit"],
    "Customer.Description":
      resource?.["Customer.Description"] ||
      data[lang]?.["Customer.Description"] ||
      data.en["Customer.Description"],
    "Customers.New":
      resource?.["Customers.New"] ||
      data[lang]?.["Customers.New"] ||
      data.en["Customers.New"],
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
