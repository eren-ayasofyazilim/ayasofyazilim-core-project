import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface AbpUiNavigationResource {
  Home: string;
  HomePage: string;
  Dashboard: string;
  Crm: string;
  Management: string;
  Profile: string;
  UserSettings: string;
  Companies: string;
  Template: string;
  Details: string;
  Contracts: string;
  RebateTables: string;
  LogIn: string;
  RefundTables: string;
  RefundFees: string;
  Add: string;
  TenantSettings: string;
  VATSettings: string;
  Settings: string;
  IdentityManagement: string;
  LanguageManagement: string;
  SaasManagement: string;
  "Identity:role": string;
  Contact: string;
  "Identity:user": string;
  "Identity:claimType": string;
  BoardOfDirectors: string;
  Investor: string;
  SupportCenter: string;
  Invest: string;
  Entrepreneur: string;
  SubmitYourProject: string;
  HowDoIFindTheNecessaryFunds: string;
  Institutional: string;
  AboutUs: string;
  OurTeam: string;
  Traveller: string;
  LogOut: string;
  InvestingCommittee: string;
  Campaigns: string;
  AdminCenter: string;
  EntrepreneurCenter: string;
  InvestorCenter: string;
  ChangeProfile: string;
  Register: string;
  MyAccount: string;
  TextTemplates: string;
  AdminManagement: string;

  //new

  Admin: string;
  Saas: string;
  Identity: string;
  Product: string;
  Parties: string;
  OpenIdDict: string;
  Applications: string;
  Scopes: string;
  Languages: string;
  LanguageTexts: string;
  Edition: string;
  Tenant: string;
  Role: string;
  User: string;
  ClaimType: string;
  SecurityLogs: string;
  AuditLogs: string;
  VAT: string;
  Refund: string;
  Organization: string;
  ProductGroup: string;
  ProductGroupVAT: string;
  Merchants: string;
  Customs: string;
  RefundPoints: string;
  TaxFree: string;
  TaxFreeTags: string;
  CompanySettings: string;
  TaxOffices: string;
  Templates: string;
  Operations: string;
  Rebate: string;
  CRM: string;
  Customers: string;
  Debtors: string;
  Skor: string;

  //desc
  "Merchants.Description": string;
  "RefundPoints.Description": string;
  "Customs.Description": string;
  "TaxFree.Description": string;
  "TaxOffices.Description": string;
  "SubCompany.Description": string;
  "Individuals.Description": string;
  "Debtors.Description": string;
  "Customer.Description": string;
  "Role.Description": string;
  "User.Description": string;
  "ClaimType.Description": string;
  "SecurityLogs.Description": string;
  "Organization.Description": string;
  "Applications.Description": string;
  "Scopes.Description": string;
  "Languages.Description": string;
  "LanguageTexts.Description": string;
  "Edition.Description": string;
  "Tenant.Description": string;
  "AuditLogs.Description": string;
  "TextTemplates.Description": string;
  "Traveller.Description": string;
  "Skor.Description": string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): AbpUiNavigationResource {
  const navigationResource = resources.AbpUiNavigation?.texts;
  return {
    Skor: navigationResource?.Skor || data[lang]?.Skor || data.en.Skor,
    "Skor.Description":
      navigationResource?.["Skor.Description"] ||
      data[lang]?.["Skor.Description"] ||
      data.en["Skor.Description"],
    Debtors:
      navigationResource?.Debtors || data[lang]?.Debtors || data.en.Debtors,
    Customers:
      navigationResource?.Customers ||
      data[lang]?.Customers ||
      data.en.Customers,
    Home: navigationResource?.Home || data[lang]?.Home || data.en.Home,
    HomePage:
      navigationResource?.HomePage || data[lang]?.HomePage || data.en.Homepage,
    Dashboard:
      navigationResource?.Dashboard ||
      data[lang]?.Dashboard ||
      data.en.Dashboard,
    Management:
      navigationResource?.Management ||
      data[lang]?.Management ||
      data.en.Management,
    Crm: navigationResource?.Crm || data[lang]?.Crm || data.en.Crm,
    Profile:
      navigationResource?.Profile || data[lang]?.Profile || data.en.Profile,
    UserSettings:
      navigationResource?.UserSettings ||
      data[lang]?.UserSettings ||
      data.en.UserSettings,
    Details:
      navigationResource?.Details || data[lang]?.Details || data.en.Details,
    Companies:
      navigationResource?.Companies ||
      data[lang]?.Companies ||
      data.en.Companies,
    Template:
      navigationResource?.Template || data[lang]?.Template || data.en.Template,
    TenantSettings:
      navigationResource?.TenantSettings ||
      data[lang]?.TenantSettings ||
      data.en.TenantSettings,
    Contracts:
      navigationResource?.Contracts ||
      data[lang]?.Contracts ||
      data.en.Contracts,
    RebateTables:
      navigationResource?.RebateTables ||
      data[lang]?.RebateTables ||
      data.en.RebateTables,
    RefundTables:
      navigationResource?.RefundTables ||
      data[lang]?.RefundTables ||
      data.en.RefundTables,
    RefundFees:
      navigationResource?.RefundFees ||
      data[lang]?.RefundFees ||
      data.en.RefundFees,
    VATSettings:
      navigationResource?.VATSettings ||
      data[lang]?.VATSettings ||
      data.en.VATSettings,
    Settings:
      navigationResource?.Settings || data[lang]?.Settings || data.en.Settings,
    LanguageManagement:
      navigationResource?.LanguageManagement ||
      data[lang]?.LanguageManagement ||
      data.en.LanguageManagement,
    IdentityManagement:
      navigationResource?.IdentityManagement ||
      data[lang]?.IdentityManagement ||
      data.en.IdentityManagement,
    SaasManagement:
      navigationResource?.SaasManagement ||
      data[lang]?.SaasManagement ||
      data.en.SaasManagement,
    "Identity:role":
      navigationResource?.["Identity:role"] ||
      data[lang]?.["Identity:role"] ||
      data.en["Identity:role"] ||
      "",
    "Identity:user":
      navigationResource?.["Identity:user"] ||
      data[lang]?.["Identity:user"] ||
      data.en["Identity:user"] ||
      "",
    "Identity:claimType":
      navigationResource?.["Identity:claimType"] ||
      data[lang]?.["Identity:claimType"] ||
      data.en["Identity:claimType"] ||
      "",

    Investor:
      navigationResource?.Investor || data[lang]?.Investor || data.en.Investor,
    Invest: navigationResource?.Invest || data[lang]?.Invest || data.en.Invest,
    SupportCenter:
      navigationResource?.SupportCenter ||
      data[lang]?.SupportCenter ||
      data.en.SupportCenter,
    Entrepreneur:
      navigationResource?.Entrepreneur ||
      data[lang]?.Entrepreneur ||
      data.en.Entrepreneur,
    SubmitYourProject:
      navigationResource?.SubmitYourProject ||
      data[lang]?.SubmitYourProject ||
      data.en.SubmitYourProject,
    HowDoIFindTheNecessaryFunds:
      navigationResource?.HowDoIFindTheNecessaryFunds ||
      data[lang]?.HowDoIFindTheNecessaryFunds ||
      data.en.HowDoIFindTheNecessaryFunds,
    Institutional:
      navigationResource?.Institutional ||
      data[lang]?.Institutional ||
      data.en.Institutional,
    AboutUs:
      navigationResource?.AboutUs || data[lang]?.AboutUs || data.en.AboutUs,
    Contact:
      navigationResource?.Contact || data[lang]?.Contact || data.en.Contact,
    OurTeam:
      navigationResource?.OurTeam || data[lang]?.OurTeam || data.en.OurTeam,
    BoardOfDirectors:
      navigationResource?.BoardOfDirectors ||
      data[lang]?.BoardOfDirectors ||
      data.en.BoardOfDirectors,
    InvestingCommittee:
      navigationResource?.InvestingCommittee ||
      data[lang]?.InvestingCommittee ||
      data.en.InvestingCommittee,
    Campaigns:
      navigationResource?.Campaigns ||
      data[lang]?.Campaigns ||
      data.en.Campaigns,
    AdminCenter:
      navigationResource?.AdminCenter ||
      data[lang]?.AdminCenter ||
      data.en.AdminCenter,
    EntrepreneurCenter:
      navigationResource?.EntrepreneurCenter ||
      data[lang]?.EntrepreneurCenter ||
      data.en.EntrepreneurCenter,
    InvestorCenter:
      navigationResource?.InvestorCenter ||
      data[lang]?.InvestorCenter ||
      data.en.InvestorCenter,
    ChangeProfile:
      navigationResource?.ChangeProfile ||
      data[lang]?.ChangeProfile ||
      data.en.ChangeProfile,
    LogIn: navigationResource?.LogIn || data[lang]?.LogIn || data.en.LogIn,
    Register:
      navigationResource?.Register || data[lang]?.Register || data.en.Register,
    LogOut: navigationResource?.LogOut || data[lang]?.LogOut || data.en.LogOut,
    MyAccount:
      navigationResource?.MyAccount ||
      data[lang]?.MyAccount ||
      data.en.MyAccount,
    Add: navigationResource?.Add || data[lang]?.Add || data.en.Add,
    Traveller:
      navigationResource?.Traveller ||
      data[lang]?.Traveller ||
      data.en.Traveller,
    TextTemplates:
      navigationResource?.TextTemplates ||
      data[lang]?.TextTemplates ||
      data.en.TextTemplates,
    AdminManagement:
      navigationResource?.AdminManagement ||
      data[lang]?.AdminManagement ||
      data.en.AdminManagement,

    Admin: navigationResource?.Admin || data[lang]?.Admin || data.en.Admin,
    Saas: navigationResource?.Saas || data[lang]?.Saas || data.en.Saas,
    Identity:
      navigationResource?.Identity || data[lang]?.Identity || data.en.Identity,
    Parties:
      navigationResource?.Parties || data[lang]?.Parties || data.en.Parties,
    OpenIdDict:
      navigationResource?.OpenIdDict ||
      data[lang]?.OpenIdDict ||
      data.en.OpenIdDict,
    Applications:
      navigationResource?.Applications ||
      data[lang]?.Applications ||
      data.en.Applications,
    Scopes: navigationResource?.Scopes || data[lang]?.Scopes || data.en.Scopes,
    Languages:
      navigationResource?.Languages ||
      data[lang]?.Languages ||
      data.en.Languages,
    LanguageTexts:
      navigationResource?.LanguageTexts ||
      data[lang]?.LanguageTexts ||
      data.en.LanguageTexts,
    Edition:
      navigationResource?.Edition || data[lang]?.Edition || data.en.Edition,
    Tenant: navigationResource?.Tenant || data[lang]?.Tenant || data.en.Tenant,
    Role: navigationResource?.Role || data[lang]?.Role || data.en.Role,
    User: navigationResource?.User || data[lang]?.User || data.en.User,
    ClaimType:
      navigationResource?.ClaimType ||
      data[lang]?.ClaimType ||
      data.en.ClaimType,
    SecurityLogs:
      navigationResource?.SecurityLogs ||
      data[lang]?.SecurityLogs ||
      data.en.SecurityLogs,
    Organization:
      navigationResource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    AuditLogs:
      navigationResource?.AuditLogs ||
      data[lang]?.AuditLogs ||
      data.en.AuditLogs,
    Product:
      navigationResource?.Product || data[lang]?.Product || data.en.Product,
    VAT: navigationResource?.VAT || data[lang]?.VAT || data.en.VAT,
    ProductGroup:
      navigationResource?.ProductGroup ||
      data[lang]?.ProductGroup ||
      data.en.ProductGroup,
    ProductGroupVAT:
      navigationResource?.ProductGroupVAT ||
      data[lang]?.ProductGroupVAT ||
      data.en.ProductGroupVAT,
    Merchants:
      navigationResource?.Merchants ||
      data[lang]?.Merchants ||
      data.en.Merchants,
    RefundPoints:
      navigationResource?.RefundPoints ||
      data[lang]?.RefundPoints ||
      data.en.RefundPoints,
    Customs:
      navigationResource?.Customs || data[lang]?.Customs || data.en.Customs,
    TaxFree:
      navigationResource?.TaxFree || data[lang]?.TaxFree || data.en.TaxFree,
    TaxOffices:
      navigationResource?.TaxOffices ||
      data[lang]?.TaxOffices ||
      data.en.TaxOffices,
    CompanySettings:
      navigationResource?.CompanySettings ||
      data[lang]?.CompanySettings ||
      data.en.CompanySettings,
    Templates:
      navigationResource?.Templates ||
      data[lang]?.Templates ||
      data.en.Templates,
    Refund: navigationResource?.Refund || data[lang]?.Refund || data.en.Refund,
    Operations:
      navigationResource?.Operations ||
      data[lang]?.Operations ||
      data.en.Operations,
    TaxFreeTags:
      navigationResource?.TaxFreeTags ||
      data[lang]?.TaxFreeTags ||
      data.en.TaxFreeTags,
    Rebate: navigationResource?.Rebate || data[lang]?.Rebate || data.en.Rebate,
    CRM: navigationResource?.CRM || data[lang]?.CRM || data.en.CRM,

    "Merchants.Description":
      navigationResource?.["Merchants.Description"] ||
      data[lang]?.["Merchants.Description"] ||
      data.en["Merchants.Description"],

    "RefundPoints.Description":
      navigationResource?.["RefundPoints.Description"] ||
      data[lang]?.["RefundPoints.Description"] ||
      data.en["RefundPoints.Description"],

    "Customs.Description":
      navigationResource?.["Customs.Description"] ||
      data[lang]?.["Customs.Description"] ||
      data.en["Customs.Description"],

    "TaxFree.Description":
      navigationResource?.["TaxFree.Description"] ||
      data[lang]?.["TaxFree.Description"] ||
      data.en["TaxFree.Description"],

    "TaxOffices.Description":
      navigationResource?.["TaxOffices.Description"] ||
      data[lang]?.["TaxOffices.Description"] ||
      data.en["TaxOffices.Description"],

    "SubCompany.Description":
      navigationResource?.["SubCompany.Description"] ||
      data[lang]?.["SubCompany.Description"] ||
      data.en["SubCompany.Description"],

    "Individuals.Description":
      navigationResource?.["Individuals.Description"] ||
      data[lang]?.["Individuals.Description"] ||
      data.en["Individuals.Description"],

    "Debtors.Description":
      navigationResource?.["Debtors.Description"] ||
      data[lang]?.["Debtors.Description"] ||
      data.en["Debtors.Description"],

    "Customer.Description":
      navigationResource?.["Customer.Description"] ||
      data[lang]?.["Customer.Description"] ||
      data.en["Customer.Description"],

    "Role.Description":
      navigationResource?.["Role.Description"] ||
      data[lang]?.["Role.Description"] ||
      data.en["Role.Description"],

    "User.Description":
      navigationResource?.["User.Description"] ||
      data[lang]?.["User.Description"] ||
      data.en["User.Description"],

    "ClaimType.Description":
      navigationResource?.["ClaimType.Description"] ||
      data[lang]?.["ClaimType.Description"] ||
      data.en["ClaimType.Description"],

    "SecurityLogs.Description":
      navigationResource?.["SecurityLogs.Description"] ||
      data[lang]?.["SecurityLogs.Description"] ||
      data.en["SecurityLogs.Description"],

    "Organization.Description":
      navigationResource?.["Organization.Description"] ||
      data[lang]?.["Organization.Description"] ||
      data.en["Organization.Description"],

    "Applications.Description":
      navigationResource?.["Applications.Description"] ||
      data[lang]?.["Applications.Description"] ||
      data.en["Applications.Description"],

    "Scopes.Description":
      navigationResource?.["Scopes.Description"] ||
      data[lang]?.["Scopes.Description"] ||
      data.en["Scopes.Description"],

    "Languages.Description":
      navigationResource?.["Languages.Description"] ||
      data[lang]?.["Languages.Description"] ||
      data.en["Languages.Description"],

    "LanguageTexts.Description":
      navigationResource?.["LanguageTexts.Description"] ||
      data[lang]?.["LanguageTexts.Description"] ||
      data.en["LanguageTexts.Description"],

    "Edition.Description":
      navigationResource?.["Edition.Description"] ||
      data[lang]?.["Edition.Description"] ||
      data.en["Edition.Description"],

    "Tenant.Description":
      navigationResource?.["Tenant.Description"] ||
      data[lang]?.["Tenant.Description"] ||
      data.en["Tenant.Description"],

    "AuditLogs.Description":
      navigationResource?.["AuditLogs.Description"] ||
      data[lang]?.["AuditLogs.Description"] ||
      data.en["AuditLogs.Description"],

    "TextTemplates.Description":
      navigationResource?.["TextTemplates.Description"] ||
      data[lang]?.["TextTemplates.Description"] ||
      data.en["TextTemplates.Description"],

    "Traveller.Description":
      navigationResource?.["Traveller.Description"] ||
      data[lang]?.["Traveller.Description"] ||
      data.en["Traveller.Description"],
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
