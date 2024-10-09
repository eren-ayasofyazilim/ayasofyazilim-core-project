import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface TravellerServiceResource {
  Travellers: string;
  "Travellers.Description": string;
  "Travellers.Delete.Succes": string;
  "Travellers.Delete.Error": string;
  "Travellers.New": string;
  "Travellers.Edit": string;
  "Travellers.Save": string;
  "Travellers.New.Succes": string;
  "Travellers.New.Error": string;

  "Form.Create.name": string;
  "Form.Create.email": string;
  "Form.Create.telephone": string;
  "Form.Create.personalSummaries": string;
  "Form.Create.address": string;
  "Form.Create.personalIdentificationCommonDatas": string;
  "Form.Create.personalPreferencesTypes": string;
  "Form.Create.name.firstName": string;
  "Form.Create.name.lastName": string;
  "Form.Create.email.emailAddress": string;
  "Form.Create.email.typeCode": string;
  "Form.Create.telephone.localNumber": string;
  "Form.Create.telephone.typeCode": string;
  "Form.Create.personalSummaries.date": string;
  "Form.Create.personalSummaries.birthDate": string;
  "Form.Create.personalSummaries.ethnicity": string;
  "Form.Create.personalSummaries.maritalStatusCode": string;
  "Form.Create.personalSummaries.religiousAffiliationName": string;
  "Form.Create.personalSummaries.genderTypeCode": string;
  "Form.Create.address.country": string;
  "Form.Create.address.terriority": string;
  "Form.Create.address.city": string;
  "Form.Create.address.postalCode": string;
  "Form.Create.address.addressLine": string;
  "Form.Create.address.fullAddress": string;
  "Form.Create.address.typeCode": string;
  "Form.Create.personalIdentificationCommonDatas.firstName": string;
  "Form.Create.personalIdentificationCommonDatas.lastName": string;
  "Form.Create.personalIdentificationCommonDatas.travelDocumentNumber": string;
  "Form.Create.personalIdentificationCommonDatas.birthDate": string;
  "Form.Create.personalIdentificationCommonDatas.issueDate": string;
  "Form.Create.personalIdentificationCommonDatas.expirationDate": string;
  "Form.Create.personalIdentificationCommonDatas.typeCode": string;
  "Form.Create.personalIdentificationCommonDatas.residenceCountryCode2": string;
  "Form.Create.personalIdentificationCommonDatas.nationalityCountryCode2": string;
  "Form.Create.personalIdentificationCommonDatas.identificationType": string;
  "Form.Create.personalPreferencesTypes.languagePreferenceCode": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): TravellerServiceResource {
  const resource = resources.TravellerService?.texts;
  return {
    Travellers:
      resource?.Travellers || data[lang]?.Travellers || data.en.Travellers,
    "Travellers.Description":
      resource?.["Travellers.Description"] ||
      data[lang]?.["Travellers.Description"] ||
      data.en["Travellers.Description"],
    "Travellers.Delete.Succes":
      resource?.["Travellers.Delete.Succes"] ||
      data[lang]?.["Travellers.Delete.Succes"] ||
      data.en["Travellers.Delete.Succes"],
    "Travellers.Delete.Error":
      resource?.["Travellers.Delete.Error"] ||
      data[lang]?.["Travellers.Delete.Error"] ||
      data.en["Travellers.Delete.Error"],
    "Travellers.New":
      resource?.["Travellers.New"] ||
      data[lang]?.["Travellers.New"] ||
      data.en["Travellers.New"],
    "Travellers.Edit":
      resource?.["Travellers.Edit"] ||
      data[lang]?.["Travellers.Edit"] ||
      data.en["Travellers.Edit"],
    "Travellers.Save":
      resource?.["Travellers.Save"] ||
      data[lang]?.["Travellers.Save"] ||
      data.en["Travellers.Save"],
    "Travellers.New.Succes":
      resource?.["Travellers.New.Succes"] ||
      data[lang]?.["Travellers.New.Succes"] ||
      data.en["Travellers.New.Succes"],
    "Travellers.New.Error":
      resource?.["Travellers.New.Error"] ||
      data[lang]?.["Travellers.New.Error"] ||
      data.en["Travellers.New.Error"],

    "Form.Create.name":
      resource?.["Form.Create.name"] ||
      data[lang]?.["Form.Create.name"] ||
      data.en["Form.Create.name"],
    "Form.Create.email":
      resource?.["Form.Create.email"] ||
      data[lang]?.["Form.Create.email"] ||
      data.en["Form.Create.email"],
    "Form.Create.telephone":
      resource?.["Form.Create.telephone"] ||
      data[lang]?.["Form.Create.telephone"] ||
      data.en["Form.Create.telephone"],
    "Form.Create.personalSummaries":
      resource?.["Form.Create.personalSummaries"] ||
      data[lang]?.["Form.Create.personalSummaries"] ||
      data.en["Form.Create.personalSummaries"],
    "Form.Create.address":
      resource?.["Form.Create.address"] ||
      data[lang]?.["Form.Create.address"] ||
      data.en["Form.Create.address"],
    "Form.Create.personalIdentificationCommonDatas":
      resource?.["Form.Create.personalIdentificationCommonDatas"] ||
      data[lang]?.["Form.Create.personalIdentificationCommonDatas"] ||
      data.en["Form.Create.personalIdentificationCommonDatas"],
    "Form.Create.personalPreferencesTypes":
      resource?.["Form.Create.personalPreferencesTypes"] ||
      data[lang]?.["Form.Create.personalPreferencesTypes"] ||
      data.en["Form.Create.personalPreferencesTypes"],
    "Form.Create.name.firstName":
      resource?.["Form.Create.name.firstName"] ||
      data[lang]?.["Form.Create.name.firstName"] ||
      data.en["Form.Create.name.firstName"],
    "Form.Create.name.lastName":
      resource?.["Form.Create.name.lastName"] ||
      data[lang]?.["Form.Create.name.lastName"] ||
      data.en["Form.Create.name.lastName"],
    "Form.Create.email.emailAddress":
      resource?.["Form.Create.email.emailAddress"] ||
      data[lang]?.["Form.Create.email.emailAddress"] ||
      data.en["Form.Create.email.emailAddress"],
    "Form.Create.email.typeCode":
      resource?.["Form.Create.email.typeCode"] ||
      data[lang]?.["Form.Create.email.typeCode"] ||
      data.en["Form.Create.email.typeCode"],
    "Form.Create.telephone.localNumber":
      resource?.["Form.Create.telephone.localNumber"] ||
      data[lang]?.["Form.Create.telephone.localNumber"] ||
      data.en["Form.Create.telephone.localNumber"],
    "Form.Create.telephone.typeCode":
      resource?.["Form.Create.telephone.typeCode"] ||
      data[lang]?.["Form.Create.telephone.typeCode"] ||
      data.en["Form.Create.telephone.typeCode"],
    "Form.Create.personalSummaries.date":
      resource?.["Form.Create.personalSummaries.date"] ||
      data[lang]?.["Form.Create.personalSummaries.date"] ||
      data.en["Form.Create.personalSummaries.date"],
    "Form.Create.personalSummaries.birthDate":
      resource?.["Form.Create.personalSummaries.birthDate"] ||
      data[lang]?.["Form.Create.personalSummaries.birthDate"] ||
      data.en["Form.Create.personalSummaries.birthDate"],
    "Form.Create.personalSummaries.ethnicity":
      resource?.["Form.Create.personalSummaries.ethnicity"] ||
      data[lang]?.["Form.Create.personalSummaries.ethnicity"] ||
      data.en["Form.Create.personalSummaries.ethnicity"],
    "Form.Create.personalSummaries.religiousAffiliationName":
      resource?.["Form.Create.personalSummaries.religiousAffiliationName"] ||
      data[lang]?.["Form.Create.personalSummaries.religiousAffiliationName"] ||
      data.en["Form.Create.personalSummaries.religiousAffiliationName"],
    "Form.Create.personalSummaries.genderTypeCode":
      resource?.["Form.Create.personalSummaries.genderTypeCode"] ||
      data[lang]?.["Form.Create.personalSummaries.genderTypeCode"] ||
      data.en["Form.Create.personalSummaries.genderTypeCode"],
    "Form.Create.personalSummaries.maritalStatusCode":
      resource?.["Form.Create.personalSummaries.maritalStatusCode"] ||
      data[lang]?.["Form.Create.personalSummaries.maritalStatusCode"] ||
      data.en["Form.Create.personalSummaries.maritalStatusCode"],
    "Form.Create.address.country":
      resource?.["Form.Create.address.country"] ||
      data[lang]?.["Form.Create.address.country"] ||
      data.en["Form.Create.address.country"],
    "Form.Create.address.terriority":
      resource?.["Form.Create.address.terriority"] ||
      data[lang]?.["Form.Create.address.terriority"] ||
      data.en["Form.Create.address.terriority"],
    "Form.Create.address.city":
      resource?.["Form.Create.address.city"] ||
      data[lang]?.["Form.Create.address.city"] ||
      data.en["Form.Create.address.city"],
    "Form.Create.address.postalCode":
      resource?.["Form.Create.address.postalCode"] ||
      data[lang]?.["Form.Create.address.postalCode"] ||
      data.en["Form.Create.address.postalCode"],
    "Form.Create.address.addressLine":
      resource?.["Form.Create.address.addressLine"] ||
      data[lang]?.["Form.Create.address.addressLine"] ||
      data.en["Form.Create.address.addressLine"],
    "Form.Create.address.fullAddress":
      resource?.["Form.Create.address.fullAddress"] ||
      data[lang]?.["Form.Create.address.fullAddress"] ||
      data.en["Form.Create.address.fullAddress"],
    "Form.Create.address.typeCode":
      resource?.["Form.Create.address.typeCode"] ||
      data[lang]?.["Form.Create.address.typeCode"] ||
      data.en["Form.Create.address.typeCode"],
    "Form.Create.personalIdentificationCommonDatas.firstName":
      resource?.["Form.Create.personalIdentificationCommonDatas.firstName"] ||
      data[lang]?.["Form.Create.personalIdentificationCommonDatas.firstName"] ||
      data.en["Form.Create.personalIdentificationCommonDatas.firstName"],
    "Form.Create.personalIdentificationCommonDatas.lastName":
      resource?.["Form.Create.personalIdentificationCommonDatas.lastName"] ||
      data[lang]?.["Form.Create.personalIdentificationCommonDatas.lastName"] ||
      data.en["Form.Create.personalIdentificationCommonDatas.lastName"],
    "Form.Create.personalIdentificationCommonDatas.travelDocumentNumber":
      resource?.[
        "Form.Create.personalIdentificationCommonDatas.travelDocumentNumber"
      ] ||
      data[lang]?.[
        "Form.Create.personalIdentificationCommonDatas.travelDocumentNumber"
      ] ||
      data.en[
        "Form.Create.personalIdentificationCommonDatas.travelDocumentNumber"
      ],
    "Form.Create.personalIdentificationCommonDatas.birthDate":
      resource?.["Form.Create.personalIdentificationCommonDatas.birthDate"] ||
      data[lang]?.["Form.Create.personalIdentificationCommonDatas.birthDate"] ||
      data.en["Form.Create.personalIdentificationCommonDatas.birthDate"],
    "Form.Create.personalIdentificationCommonDatas.issueDate":
      resource?.["Form.Create.personalIdentificationCommonDatas.issueDate"] ||
      data[lang]?.["Form.Create.personalIdentificationCommonDatas.issueDate"] ||
      data.en["Form.Create.personalIdentificationCommonDatas.issueDate"],
    "Form.Create.personalIdentificationCommonDatas.expirationDate":
      resource?.[
        "Form.Create.personalIdentificationCommonDatas.expirationDate"
      ] ||
      data[lang]?.[
        "Form.Create.personalIdentificationCommonDatas.expirationDate"
      ] ||
      data.en["Form.Create.personalIdentificationCommonDatas.expirationDate"],
    "Form.Create.personalIdentificationCommonDatas.typeCode":
      resource?.["Form.Create.personalIdentificationCommonDatas.typeCode"] ||
      data[lang]?.["Form.Create.personalIdentificationCommonDatas.typeCode"] ||
      data.en["Form.Create.personalIdentificationCommonDatas.typeCode"],
    "Form.Create.personalIdentificationCommonDatas.residenceCountryCode2":
      resource?.[
        "Form.Create.personalIdentificationCommonDatas.residenceCountryCode2"
      ] ||
      data[lang]?.[
        "Form.Create.personalIdentificationCommonDatas.residenceCountryCode2"
      ] ||
      data.en[
        "Form.Create.personalIdentificationCommonDatas.residenceCountryCode2"
      ],
    "Form.Create.personalIdentificationCommonDatas.nationalityCountryCode2":
      resource?.[
        "Form.Create.personalIdentificationCommonDatas.nationalityCountryCode2"
      ] ||
      data[lang]?.[
        "Form.Create.personalIdentificationCommonDatas.nationalityCountryCode2"
      ] ||
      data.en[
        "Form.Create.personalIdentificationCommonDatas.nationalityCountryCode2"
      ],
    "Form.Create.personalIdentificationCommonDatas.identificationType":
      resource?.[
        "Form.Create.personalIdentificationCommonDatas.identificationType"
      ] ||
      data[lang]?.[
        "Form.Create.personalIdentificationCommonDatas.identificationType"
      ] ||
      data.en[
        "Form.Create.personalIdentificationCommonDatas.identificationType"
      ],
    "Form.Create.personalPreferencesTypes.languagePreferenceCode":
      resource?.[
        "Form.Create.personalPreferencesTypes.languagePreferenceCode"
      ] ||
      data[lang]?.[
        "Form.Create.personalPreferencesTypes.languagePreferenceCode"
      ] ||
      data.en["Form.Create.personalPreferencesTypes.languagePreferenceCode"],
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
