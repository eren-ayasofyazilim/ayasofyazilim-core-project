/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
import { getLocalizationResources } from "src/utils";
import tr from "./resources/tr.json";
import en from "./resources/en.json";

const data: Record<string, Record<string, string>> = {
  tr,
  en,
};

function getLanguageData(resources: any, lang: string): Record<string, string> {
  const navigationResource = resources?.AbpUiNavigation?.texts;
  return {
    HomePage: navigationResource?.HomePage || data[lang].HomePage,
    Dashboard: navigationResource?.Dashboard || data[lang].Dashboard,
    Management: navigationResource?.Management || data[lang].Management,
    Crm: navigationResource?.Crm || data[lang].Crm,
    Profile: navigationResource?.Profile || data[lang].Profile,
    Details: navigationResource?.Details || data[lang].Details,
    Companies: navigationResource?.Companies || data[lang].Companies,
    Template: navigationResource?.Template || data[lang].Template,
    CountrySettings:
      navigationResource?.CountrySettings || data[lang].CountrySettings,
    Contracts: navigationResource?.Contracts || data[lang].Contracts,
    RebateTables: navigationResource?.RebateTables || data[lang].RebateTables,
    RefundTables: navigationResource?.RefundTables || data[lang].RefundTables,
    Settings: navigationResource?.Settings || data[lang].Settings,
    LanguageManagement:
      navigationResource?.LanguageManagement || data[lang].LanguageManagement,
    IdentityManagement:
      navigationResource?.IdentityManagement || data[lang].IdentityManagement,
    SaasManagement:
      navigationResource?.SaasManagement || data[lang].SaasManagement,
    "Identity:role":
      navigationResource?.["Identity:role"] || data[lang]["Identity:role"],
    "Identity:user":
      navigationResource?.["Identity:user"] || data[lang]["Identity:user"],
    "Identity:claimType":
      navigationResource?.["Identity:claimType"] ||
      data[lang]["Identity:claimType"],

    Investor: navigationResource?.Investor || data[lang].Investor,
    Invest: navigationResource?.Invest || data[lang].Invest,
    SupportCenter:
      navigationResource?.SupportCenter || data[lang].SupportCenter,
    Entrepreneur: navigationResource?.Entrepreneur || data[lang].Entrepreneur,
    SubmitYourProject:
      navigationResource?.SubmitYourProject || data[lang].SubmitYourProject,
    HowDoIFindTheNecessaryFunds:
      navigationResource?.HowDoIFindTheNecessaryFunds ||
      data[lang].HowDoIFindTheNecessaryFunds,
    Institutional:
      navigationResource?.Institutional || data[lang].Institutional,
    AboutUs: navigationResource?.AboutUs || data[lang].AboutUs,
    Contact: navigationResource?.Contact || data[lang].Contact,
    OurTeam: navigationResource?.OurTeam || data[lang].OurTeam,
    BoardOfDirectors:
      navigationResource?.BoardOfDirectors || data[lang].BoardOfDirectors,
    InvestingCommittee:
      navigationResource?.InvestingCommittee || data[lang].InvestingCommittee,
    Campaigns: navigationResource?.Campaigns || data[lang].Campaigns,
    AdminCenter: navigationResource?.AdminCenter || data[lang].AdminCenter,
    EntrepreneurCenter:
      navigationResource?.EntrepreneurCenter || data[lang].EntrepreneurCenter,
    InvestorCenter:
      navigationResource?.InvestorCenter || data[lang].InvestorCenter,
    ChangeProfile:
      navigationResource?.ChangeProfile || data[lang].ChangeProfile,
    LogIn: navigationResource?.LogIn || data[lang].LogIn,
    Register: navigationResource?.Register || data[lang].Register,
    LogOut: navigationResource?.LogOut || data[lang].LogOut,
    MyAccount: navigationResource?.MyAccount || data[lang].MyAccount,
    Add: navigationResource?.Add || data[lang].Add,
  };
}
export async function getResourceData(lang: string): Promise<{
  languageData: Record<string, string>;
  resources: any;
}> {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(
  resources: any,
  lang: string,
): Record<string, string> {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
