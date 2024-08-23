import { getLocalizationResources } from "src/utils";
import tr from "./resources/tr.json";
import en from "./resources/en.json";

const data: Record<string, Record<string, string>> = {
  tr,
  en,
};
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const projectResource = resources.ProjectService?.texts;
  const accountResource = resources.AbpAccount?.texts;
  const uiResource = resources.AbpUi?.texts;
  const languageData = {
    Next: uiResource?.PagerNext || data[lang].Next,
    Previous: uiResource?.PagerPrevious || data[lang].Previous,
    Summary: uiResource?.Summary || data[lang].Summary,
    Projects: projectResource?.Projects || data[lang].Projects,
    LogIn: resources.AbpUiNavigation?.texts?.LogIn || data[lang].LogIn,
    DaysLeft: projectResource?.DaysLeft || data[lang].DaysLeft,
    InvestNow: projectResource?.InvestNow || data[lang].InvestNow,
    InvestmentOpportunities:
      projectResource?.InvestmentOpportunities ||
      data[lang].InvestmentOpportunities,
    ProjectsToOpenForInvestmentSoon:
      projectResource?.ProjectsToOpenForInvestmentSoon ||
      "Projects to open for investment soon",
    StartingSoon: projectResource?.StartingSoon || data[lang].StartingSoon,
    CampaignStartDate:
      projectResource?.CampaignStartDate || data[lang].CampaignStartDate,
    CampaignEndDate:
      projectResource?.CampaignEndDate || data[lang].CampaignEndDate,
    CampaignEnded: projectResource?.CampaignEnded || data[lang].CampaignEnded,
    CollectedAmount:
      projectResource?.CollectedAmount || data[lang].CollectedAmount,
    TargetAmount: projectResource?.TargetAmount || data[lang].TargetAmount,
    Investor: projectResource?.Investor || data[lang].Investor,
    QualifiedInvestor:
      projectResource?.QualifiedInvestor || data[lang].QualifiedInvestor,
    Invest: projectResource?.Invest || data[lang].Invest,
    TargetReached: projectResource?.TargetReached || data[lang].TargetReached,
    CreateProject: projectResource?.CreateProject || data[lang].CreateProject,
    ProjectDetails:
      projectResource?.ProjectDetails || data[lang].ProjectDetails,
    AdditionalFunding:
      projectResource?.AdditionalFunding || data[lang].AdditionalFunding,
    ViewProject: projectResource?.ViewProject || data[lang].ViewProject,
    "Messages:ProjectCreated":
      projectResource?.["Messages:ProjectCreated"] ||
      data[lang]["Messages:ProjectCreated"],
    "Messages:ProjectCreationError":
      projectResource?.["Messages:ProjectCreationError"] ||
      data[lang]["Messages:ProjectCreationError"],
    ProjectName: projectResource?.ProjectName || data[lang].ProjectName,
    ProjectNameInfo:
      projectResource?.ProjectNameInfo || data[lang].ProjectNameInfo,
    ProjectDescription:
      projectResource?.ProjectDescription || data[lang].ProjectDescription,
    ProjectDescriptionInfo:
      projectResource?.ProjectDescriptionInfo ||
      data[lang].ProjectDescriptionInfo,
    FundCollectionType:
      projectResource?.FundCollectionType || data[lang].FundCollectionType,
    FundCollectionTypeInfo:
      projectResource?.FundCollectionTypeInfo ||
      data[lang].FundCollectionTypeInfo,
    FundCollectionTypeSHRE:
      projectResource?.FundCollectionTypeSHRE ||
      data[lang].FundCollectionTypeSHRE,
    FundCollectionTypeDBIT:
      projectResource?.FundCollectionTypeDBIT ||
      data[lang].FundCollectionTypeDBIT,
    FundableAmount:
      projectResource?.FundableAmount || data[lang].FundableAmount,
    FundableAmountInfo:
      projectResource?.FundableAmountInfo || data[lang].FundableAmountInfo,
    ProjectStartDateInfo:
      projectResource?.ProjectStartDateInfo || data[lang].ProjectStartDateInfo,
    AdditionalFundingInfo:
      projectResource?.AdditionalFundingInfo ||
      data[lang].AdditionalFundingInfo,
    AdditionalFundingYes:
      projectResource?.AdditionalFundingYes || data[lang].AdditionalFundingYes,
    AdditionalFundingNo:
      projectResource?.AdditionalFundingNo || data[lang].AdditionalFundingNo,
    AdditionalFundingRate:
      projectResource?.AdditionalFundingRate ||
      data[lang].AdditionalFundingRate,
    AdditionalFundingRateInfo:
      projectResource?.AdditionalFundingRateInfo ||
      data[lang].AdditionalFundingRateInfo,
    "IHaveReadAndAccept {0}":
      projectResource?.["IHaveReadAndAccept {0}"] ||
      data[lang]["IHaveReadAndAccept {0}"],
    EFTOrMoneyTransfer:
      projectResource?.EFTOrMoneyTransfer || data[lang].EFTOrMoneyTransfer,
    RiskDeclarationForm:
      projectResource?.RiskDeclarationForm || data[lang].RiskDeclarationForm,
    ProjectInformationForm:
      projectResource?.ProjectInformationForm ||
      data[lang].ProjectInformationForm,
    IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice:
      projectResource?.IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice ||
      data[lang]
        .IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice,
    CreditCard: projectResource?.CreditCard || data[lang].CreditCard,
    YouCanInvestWithCreditCardOrEft:
      projectResource?.YouCanInvestWithCreditCardOrEft ||
      data[lang].YouCanInvestWithCreditCardOrEft,
    InvestmentAmount:
      projectResource?.InvestmentAmount || data[lang].InvestmentAmount,
    InvestmentMethod:
      projectResource?.InvestmentMethod || data[lang].InvestmentMethod,
    RemainingTime: projectResource?.RemainingTime || data[lang].RemainingTime,
    QualifiedFundRate:
      projectResource?.QualifiedFundRate || data[lang].QualifiedFundRate,
    InvestingProfile:
      projectResource?.InvestingProfile || data[lang].InvestingProfile,
    Share: projectResource?.Share || data[lang].Share,
    "DisplayName:Email":
      accountResource?.["DisplayName:Email"] || data[lang]["DisplayName:Email"],
    "DisplayName:PhoneNumber":
      accountResource?.["DisplayName:Phone"] || data[lang]["DisplayName:Phone"],
    "DisplayName:Name":
      accountResource?.["DisplayName:Name"] || data[lang]["DisplayName:Name"],
    "DisplayName:Surname":
      accountResource?.["DisplayName:Surname"] ||
      data[lang]["DisplayName:Surname"],

    SEND_FOR_APPROVAL:
      projectResource?.SEND_FOR_APPROVAL || data[lang].SEND_FOR_APPROVAL,
    IN_DRAFT_STAGE:
      projectResource?.IN_DRAFT_STAGE || data[lang].IN_DRAFT_STAGE,
    SENT_FOR_APPROVAL:
      projectResource?.SENT_FOR_APPROVAL || data[lang].SENT_FOR_APPROVAL,
    NOT_APPROVED: projectResource?.NOT_APPROVED || data[lang].NOT_APPROVED,
    APPROVED: projectResource?.APPROVED || data[lang].APPROVED,
    FUNDABLE: projectResource?.FUNDABLE || data[lang].FUNDABLE,
    FUNDING_SUCCESSFUL:
      projectResource?.FUNDING_SUCCESSFUL || data[lang].FUNDING_SUCCESSFUL,
    FUNDING_UNSUCCESSFUL:
      projectResource?.FUNDING_UNSUCCESSFUL || data[lang].FUNDING_UNSUCCESSFUL,
    FUNDING_COMPLETED:
      projectResource?.FUNDING_COMPLETED || data[lang].FUNDING_COMPLETED,
  };
  return {
    languageData,
    resources,
  };
}
