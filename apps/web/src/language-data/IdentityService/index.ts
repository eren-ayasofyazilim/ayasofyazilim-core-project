import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface ContractServiceResource {
  Role: string;
  Roles: string;
  "Role.New": string;
  "Role.Edit": string;
  "Role.Description": string;
  User: string;
  Users: string;
  "User.New": string;
  "User.Edit": string;
  "User.Description": string;
  ClaimType: string;
  ClaimTypes: string;
  "ClaimType.New": string;
  "ClaimType.Edit": string;
  "ClaimType.Description": string;
  SecurityLog: string;
  SecurityLogs: string;
  "SecurityLog.New": string;
  "SecurityLog.Edit": string;
  "SecurityLog.Description": string;
  Organization: string;
  Organizations: string;
  "Organization.New": string;
  "Organization.Edit": string;
  "Organization.Description": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): ContractServiceResource {
  const resource = resources.IdentityService?.texts;
  return {
    Role: resource?.Role || data[lang]?.Role || data.en.Role,
    Roles: resource?.Roles || data[lang]?.Roles || data.en.Roles,
    "Role.New":
      resource?.["Role.New"] || data[lang]?.["Role.New"] || data.en["Role.New"],
    "Role.Edit":
      resource?.["Role.Edit"] ||
      data[lang]?.["Role.Edit"] ||
      data.en["Role.Edit"],
    "Role.Description":
      resource?.["Role.Description"] ||
      data[lang]?.["Role.Description"] ||
      data.en["Role.Description"],
    User: resource?.User || data[lang]?.User || data.en.User,
    Users: resource?.Users || data[lang]?.Users || data.en.Users,
    "User.New":
      resource?.["User.New"] || data[lang]?.["User.New"] || data.en["User.New"],
    "User.Edit":
      resource?.["User.Edit"] ||
      data[lang]?.["User.Edit"] ||
      data.en["User.Edit"],
    "User.Description":
      resource?.["User.Description"] ||
      data[lang]?.["User.Description"] ||
      data.en["User.Description"],
    ClaimType:
      resource?.ClaimType || data[lang]?.ClaimType || data.en.ClaimType,
    ClaimTypes:
      resource?.ClaimTypes || data[lang]?.ClaimTypes || data.en.ClaimTypes,
    "ClaimType.New":
      resource?.["ClaimType.New"] ||
      data[lang]?.["ClaimType.New"] ||
      data.en["ClaimType.New"],
    "ClaimType.Edit":
      resource?.["ClaimType.Edit"] ||
      data[lang]?.["ClaimType.Edit"] ||
      data.en["ClaimType.Edit"],
    "ClaimType.Description":
      resource?.["ClaimType.Description"] ||
      data[lang]?.["ClaimType.Description"] ||
      data.en["ClaimType.Description"],
    SecurityLog:
      resource?.SecurityLog || data[lang]?.SecurityLog || data.en.SecurityLog,
    SecurityLogs:
      resource?.SecurityLogs ||
      data[lang]?.SecurityLogs ||
      data.en.SecurityLogs,
    "SecurityLog.New":
      resource?.["SecurityLog.New"] ||
      data[lang]?.["SecurityLog.New"] ||
      data.en["SecurityLog.New"],
    "SecurityLog.Edit":
      resource?.["SecurityLog.Edit"] ||
      data[lang]?.["SecurityLog.Edit"] ||
      data.en["SecurityLog.Edit"],
    "SecurityLog.Description":
      resource?.["SecurityLog.Description"] ||
      data[lang]?.["SecurityLog.Description"] ||
      data.en["SecurityLog.Description"],
    Organization:
      resource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    Organizations:
      resource?.Organizations ||
      data[lang]?.Organizations ||
      data.en.Organizations,
    "Organization.New":
      resource?.["Organization.New"] ||
      data[lang]?.["Organization.New"] ||
      data.en["Organization.New"],
    "Organization.Edit":
      resource?.["Organization.Edit"] ||
      data[lang]?.["Organization.Edit"] ||
      data.en["Organization.Edit"],
    "Organization.Description":
      resource?.["Organization.Description"] ||
      data[lang]?.["Organization.Description"] ||
      data.en["Organization.Description"],
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
