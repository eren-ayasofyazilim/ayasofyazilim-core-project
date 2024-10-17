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
  "Travellers.ShowExpired": string;
  "Travellers.FullName": string;
  "Travellers.FirstName": string;
  "Travellers.LastName": string;
  "Travellers.TravelDocumentNumber": string;
  "Travellers.UserName": string;
  "Travellers.PhoneNumber": string;
  "Travellers.Country.Select": string;
  "Travellers.City.Select": string;

  "Form.name": string;
  "Form.email": string;
  "Form.telephone": string;
  "Form.personalSummaries": string;
  "Form.address": string;
  "Form.personalIdentificationCommonDatas": string;
  "Form.personalPreferencesTypes": string;
  "Form.name.firstName": string;
  "Form.name.lastName": string;
  "Form.email.emailAddress": string;
  "Form.email.typeCode": string;
  "Form.email.typeCode.work": string;
  "Form.email.typeCode.personal": string;
  "Form.telephone.localNumber": string;
  "Form.telephone.typeCode": string;
  "Form.telephone.typeCode.home": string;
  "Form.telephone.typeCode.mobile": string;
  "Form.telephone.typeCode.work": string;
  "Form.telephone.typeCode.fax": string;
  "Form.personalSummaries.date": string;
  "Form.personalSummaries.birthDate": string;
  "Form.personalSummaries.ethnicity": string;
  "Form.personalSummaries.maritalStatusCode": string;
  "Form.personalSummaries.religiousAffiliationName": string;
  "Form.personalSummaries.genderTypeCode": string;
  "Form.personalSummaries.genderTypeCode.male": string;
  "Form.personalSummaries.genderTypeCode.female": string;
  "Form.address.country": string;
  "Form.address.terriority": string;
  "Form.address.city": string;
  "Form.address.postalCode": string;
  "Form.address.addressLine": string;
  "Form.address.fullAddress": string;
  "Form.address.typeCode": string;
  "Form.address.typeCode.home": string;
  "Form.address.typeCode.office": string;
  "Form.personalIdentificationCommonDatas.firstName": string;
  "Form.personalIdentificationCommonDatas.lastName": string;
  "Form.personalIdentificationCommonDatas.travelDocumentNumber": string;
  "Form.personalIdentificationCommonDatas.birthDate": string;
  "Form.personalIdentificationCommonDatas.issueDate": string;
  "Form.personalIdentificationCommonDatas.expirationDate": string;
  "Form.personalIdentificationCommonDatas.typeCode": string;
  "Form.personalIdentificationCommonDatas.residenceCountryCode2": string;
  "Form.personalIdentificationCommonDatas.nationalityCountryCode2": string;
  "Form.personalIdentificationCommonDatas.identificationType": string;
  "Form.personalIdentificationCommonDatas.identificationType.passport": string;
  "Form.personalPreferencesTypes.languagePreferenceCode": string;
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
    "Travellers.ShowExpired":
      resource?.["Travellers.ShowExpired"] ||
      data[lang]?.["Travellers.ShowExpired"] ||
      data.en["Travellers.ShowExpired"],
    "Travellers.FullName":
      resource?.["Travellers.FullName"] ||
      data[lang]?.["Travellers.FullName"] ||
      data.en["Travellers.FullName"],
    "Travellers.FirstName":
      resource?.["Travellers.FirstName"] ||
      data[lang]?.["Travellers.FirstName"] ||
      data.en["Travellers.FirstName"],
    "Travellers.LastName":
      resource?.["Travellers.LastName"] ||
      data[lang]?.["Travellers.LastName"] ||
      data.en["Travellers.LastName"],
    "Travellers.TravelDocumentNumber":
      resource?.["Travellers.TravelDocumentNumber"] ||
      data[lang]?.["Travellers.TravelDocumentNumber"] ||
      data.en["Travellers.TravelDocumentNumber"],
    "Travellers.UserName":
      resource?.["Travellers.UserName"] ||
      data[lang]?.["Travellers.UserName"] ||
      data.en["Travellers.UserName"],
    "Travellers.PhoneNumber":
      resource?.["Travellers.PhoneNumber"] ||
      data[lang]?.["Travellers.PhoneNumber"] ||
      data.en["Travellers.PhoneNumber"],
    "Travellers.Country.Select":
      resource?.["Travellers.Country.Select"] ||
      data[lang]?.["Travellers.Country.Select"] ||
      data.en["Travellers.Country.Select"],
    "Travellers.City.Select":
      resource?.["Travellers.City.Select"] ||
      data[lang]?.["Travellers.City.Select"] ||
      data.en["Travellers.City.Select"],

    "Form.name":
      resource?.["Form.name"] ||
      data[lang]?.["Form.name"] ||
      data.en["Form.name"],
    "Form.email":
      resource?.["Form.email"] ||
      data[lang]?.["Form.email"] ||
      data.en["Form.email"],
    "Form.telephone":
      resource?.["Form.telephone"] ||
      data[lang]?.["Form.telephone"] ||
      data.en["Form.telephone"],
    "Form.personalSummaries":
      resource?.["Form.personalSummaries"] ||
      data[lang]?.["Form.personalSummaries"] ||
      data.en["Form.personalSummaries"],
    "Form.address":
      resource?.["Form.address"] ||
      data[lang]?.["Form.address"] ||
      data.en["Form.address"],
    "Form.personalIdentificationCommonDatas":
      resource?.["Form.personalIdentificationCommonDatas"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas"] ||
      data.en["Form.personalIdentificationCommonDatas"],
    "Form.personalPreferencesTypes":
      resource?.["Form.personalPreferencesTypes"] ||
      data[lang]?.["Form.personalPreferencesTypes"] ||
      data.en["Form.personalPreferencesTypes"],
    "Form.name.firstName":
      resource?.["Form.name.firstName"] ||
      data[lang]?.["Form.name.firstName"] ||
      data.en["Form.name.firstName"],
    "Form.name.lastName":
      resource?.["Form.name.lastName"] ||
      data[lang]?.["Form.name.lastName"] ||
      data.en["Form.name.lastName"],
    "Form.email.emailAddress":
      resource?.["Form.email.emailAddress"] ||
      data[lang]?.["Form.email.emailAddress"] ||
      data.en["Form.email.emailAddress"],
    "Form.email.typeCode":
      resource?.["Form.email.typeCode"] ||
      data[lang]?.["Form.email.typeCode"] ||
      data.en["Form.email.typeCode"],
    "Form.email.typeCode.work":
      resource?.["Form.email.typeCode.work"] ||
      data[lang]?.["Form.email.typeCode.work"] ||
      data.en["Form.email.typeCode.work"],
    "Form.email.typeCode.personal":
      resource?.["Form.email.typeCode.personal"] ||
      data[lang]?.["Form.email.typeCode.personal"] ||
      data.en["Form.email.typeCode.personal"],
    "Form.telephone.localNumber":
      resource?.["Form.telephone.localNumber"] ||
      data[lang]?.["Form.telephone.localNumber"] ||
      data.en["Form.telephone.localNumber"],
    "Form.telephone.typeCode":
      resource?.["Form.telephone.typeCode"] ||
      data[lang]?.["Form.telephone.typeCode"] ||
      data.en["Form.telephone.typeCode"],
    "Form.telephone.typeCode.work":
      resource?.["Form.telephone.typeCode.work"] ||
      data[lang]?.["Form.telephone.typeCode.work"] ||
      data.en["Form.telephone.typeCode.work"],
    "Form.telephone.typeCode.mobile":
      resource?.["Form.telephone.typeCode.mobile"] ||
      data[lang]?.["Form.telephone.typeCode.mobile"] ||
      data.en["Form.telephone.typeCode.mobile"],
    "Form.telephone.typeCode.home":
      resource?.["Form.telephone.typeCode.home"] ||
      data[lang]?.["Form.telephone.typeCode.home"] ||
      data.en["Form.telephone.typeCode.home"],
    "Form.telephone.typeCode.fax":
      resource?.["Form.telephone.typeCode.fax"] ||
      data[lang]?.["Form.telephone.typeCode.fax"] ||
      data.en["Form.telephone.typeCode.fax"],
    "Form.personalSummaries.date":
      resource?.["Form.personalSummaries.date"] ||
      data[lang]?.["Form.personalSummaries.date"] ||
      data.en["Form.personalSummaries.date"],
    "Form.personalSummaries.birthDate":
      resource?.["Form.personalSummaries.birthDate"] ||
      data[lang]?.["Form.personalSummaries.birthDate"] ||
      data.en["Form.personalSummaries.birthDate"],
    "Form.personalSummaries.ethnicity":
      resource?.["Form.personalSummaries.ethnicity"] ||
      data[lang]?.["Form.personalSummaries.ethnicity"] ||
      data.en["Form.personalSummaries.ethnicity"],
    "Form.personalSummaries.religiousAffiliationName":
      resource?.["Form.personalSummaries.religiousAffiliationName"] ||
      data[lang]?.["Form.personalSummaries.religiousAffiliationName"] ||
      data.en["Form.personalSummaries.religiousAffiliationName"],
    "Form.personalSummaries.genderTypeCode":
      resource?.["Form.personalSummaries.genderTypeCode"] ||
      data[lang]?.["Form.personalSummaries.genderTypeCode"] ||
      data.en["Form.personalSummaries.genderTypeCode"],
    "Form.personalSummaries.genderTypeCode.male":
      resource?.["Form.personalSummaries.genderTypeCode.male"] ||
      data[lang]?.["Form.personalSummaries.genderTypeCode.male"] ||
      data.en["Form.personalSummaries.genderTypeCode.male"],
    "Form.personalSummaries.genderTypeCode.female":
      resource?.["Form.personalSummaries.genderTypeCode.female"] ||
      data[lang]?.["Form.personalSummaries.genderTypeCode.female"] ||
      data.en["Form.personalSummaries.genderTypeCode.female"],
    "Form.personalSummaries.maritalStatusCode":
      resource?.["Form.personalSummaries.maritalStatusCode"] ||
      data[lang]?.["Form.personalSummaries.maritalStatusCode"] ||
      data.en["Form.personalSummaries.maritalStatusCode"],
    "Form.address.country":
      resource?.["Form.address.country"] ||
      data[lang]?.["Form.address.country"] ||
      data.en["Form.address.country"],
    "Form.address.terriority":
      resource?.["Form.address.terriority"] ||
      data[lang]?.["Form.address.terriority"] ||
      data.en["Form.address.terriority"],
    "Form.address.city":
      resource?.["Form.address.city"] ||
      data[lang]?.["Form.address.city"] ||
      data.en["Form.address.city"],
    "Form.address.postalCode":
      resource?.["Form.address.postalCode"] ||
      data[lang]?.["Form.address.postalCode"] ||
      data.en["Form.address.postalCode"],
    "Form.address.addressLine":
      resource?.["Form.address.addressLine"] ||
      data[lang]?.["Form.address.addressLine"] ||
      data.en["Form.address.addressLine"],
    "Form.address.fullAddress":
      resource?.["Form.address.fullAddress"] ||
      data[lang]?.["Form.address.fullAddress"] ||
      data.en["Form.address.fullAddress"],
    "Form.address.typeCode":
      resource?.["Form.address.typeCode"] ||
      data[lang]?.["Form.address.typeCode"] ||
      data.en["Form.address.typeCode"],
    "Form.address.typeCode.home":
      resource?.["Form.address.typeCode.home"] ||
      data[lang]?.["Form.address.typeCode.home"] ||
      data.en["Form.address.typeCode.home"],
    "Form.address.typeCode.office":
      resource?.["Form.address.typeCode.office"] ||
      data[lang]?.["Form.address.typeCode.office"] ||
      data.en["Form.address.typeCode.office"],

    "Form.personalIdentificationCommonDatas.firstName":
      resource?.["Form.personalIdentificationCommonDatas.firstName"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.firstName"] ||
      data.en["Form.personalIdentificationCommonDatas.firstName"],
    "Form.personalIdentificationCommonDatas.lastName":
      resource?.["Form.personalIdentificationCommonDatas.lastName"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.lastName"] ||
      data.en["Form.personalIdentificationCommonDatas.lastName"],
    "Form.personalIdentificationCommonDatas.travelDocumentNumber":
      resource?.[
        "Form.personalIdentificationCommonDatas.travelDocumentNumber"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.travelDocumentNumber"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.travelDocumentNumber"],
    "Form.personalIdentificationCommonDatas.birthDate":
      resource?.["Form.personalIdentificationCommonDatas.birthDate"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.birthDate"] ||
      data.en["Form.personalIdentificationCommonDatas.birthDate"],
    "Form.personalIdentificationCommonDatas.issueDate":
      resource?.["Form.personalIdentificationCommonDatas.issueDate"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.issueDate"] ||
      data.en["Form.personalIdentificationCommonDatas.issueDate"],
    "Form.personalIdentificationCommonDatas.expirationDate":
      resource?.["Form.personalIdentificationCommonDatas.expirationDate"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.expirationDate"] ||
      data.en["Form.personalIdentificationCommonDatas.expirationDate"],
    "Form.personalIdentificationCommonDatas.typeCode":
      resource?.["Form.personalIdentificationCommonDatas.typeCode"] ||
      data[lang]?.["Form.personalIdentificationCommonDatas.typeCode"] ||
      data.en["Form.personalIdentificationCommonDatas.typeCode"],
    "Form.personalIdentificationCommonDatas.residenceCountryCode2":
      resource?.[
        "Form.personalIdentificationCommonDatas.residenceCountryCode2"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.residenceCountryCode2"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.residenceCountryCode2"],
    "Form.personalIdentificationCommonDatas.nationalityCountryCode2":
      resource?.[
        "Form.personalIdentificationCommonDatas.nationalityCountryCode2"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.nationalityCountryCode2"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.nationalityCountryCode2"],
    "Form.personalIdentificationCommonDatas.identificationType":
      resource?.["Form.personalIdentificationCommonDatas.identificationType"] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.identificationType"
      ] ||
      data.en["Form.personalIdentificationCommonDatas.identificationType"],
    "Form.personalIdentificationCommonDatas.identificationType.passport":
      resource?.[
        "Form.personalIdentificationCommonDatas.identificationType.passport"
      ] ||
      data[lang]?.[
        "Form.personalIdentificationCommonDatas.identificationType.passport"
      ] ||
      data.en[
        "Form.personalIdentificationCommonDatas.identificationType.passport"
      ],

    "Form.personalPreferencesTypes.languagePreferenceCode":
      resource?.["Form.personalPreferencesTypes.languagePreferenceCode"] ||
      data[lang]?.["Form.personalPreferencesTypes.languagePreferenceCode"] ||
      data.en["Form.personalPreferencesTypes.languagePreferenceCode"],
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
