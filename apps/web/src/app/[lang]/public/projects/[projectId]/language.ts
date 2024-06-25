import { getLocalizationResources } from "src/utils";

export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const uiResource = resources?.["AbpUi"]?.texts;
  const projectResource = resources?.["ProjectService"]?.texts;

  const languageData = {
    Next: uiResource?.["PagerNext"] || "Next",
    Previous: uiResource?.["PagerPrevious"] || "Previous",
    DaysLeft: uiResource?.["DaysLeft"] || "Days left",
    StartingSoon: uiResource?.["StartingSoon"] || "Starting Soon",
    CampaignStartDate:
      projectResource?.["CampaignStartDate"] || "Campaign start date",
    CampaignEndDate:
      projectResource?.["CampaignEndDate"] || "Campaign end date",
    CollectedAmount: projectResource?.["CollectedAmount"] || "Collected amount",
    Investor: projectResource?.["Investor"] || "Investor",
    QualifiedInvestor:
      projectResource?.["QualifiedInvestor"] || "Qualified Investor",
    Invest: projectResource?.["Invest"] || "Invest",
    TargetReached:
      projectResource?.["TargetReached"] || "{target}% of target reached",
    "Tab:CreateProject":
      projectResource?.["Tab:CreateProject"] || "Create Project",
    "Tab:ProjectDetails":
      projectResource?.["Tab:ProjectDetails"] || "Project Details",
    "Tab:AdditionalFunding":
      projectResource?.["Tab:AdditionalFunding"] || "Additional Funding",
    "Tab:Summary": uiResource?.["Summary"] || "Summary",
    "Tab:ViewProject": projectResource?.["Tab:ViewProject"] || "View Project",
    "Messages:ProjectCreated":
      projectResource?.["Messages:ProjectCreated"] ||
      "The project has been created successfully.",
    "Messages:ProjectCreationError":
      projectResource?.["Messages:ProjectCreationError"] ||
      "An error occurred while creating the project.",
    ProjectName: projectResource?.["ProjectName"] || "Project name",
    ProjectNameInfo:
      projectResource?.["ProjectNameInfo"] ||
      "A headline that describes your project in a way that attracts investors' attention.",
    ProjectDescription:
      projectResource?.["ProjectDescription"] || "Project description",
    ProjectDescriptionInfo:
      projectResource?.["ProjectDescriptionInfo"] ||
      "Briefly describe your project in a way that attracts investors' attention.",
    FundCollectionType:
      projectResource?.["FundCollectionType"] || "Project type",
    FundCollectionTypeInfo:
      projectResource?.["FundCollectionTypeInfo"] || "Type of your project.",
    FundCollectionTypeSHRE:
      projectResource?.["FundCollectionTypeSHRE"] || "Share based",
    FundCollectionTypeDBIT:
      projectResource?.["FundCollectionTypeDBIT"] || "Dept based",
    FundableAmount: projectResource?.["FundableAmount"] || "Fundable amount",
    FundableAmountInfo:
      projectResource?.["FundableAmountInfo"] ||
      "The amount of investment you want to make in your project.",
    AdditionalFunding:
      projectResource?.["AdditionalFunding"] || "Additional funding",
    AdditionalFundingInfo:
      projectResource?.["AdditionalFundingInfo"] ||
      "When your project reaches the fundable amount, should extra funds continue to be collected up to the amount you specify?",
    AdditionalFundingYes: projectResource?.["AdditionalFundingYes"] || "Yes",
    AdditionalFundingNo: projectResource?.["AdditionalFundingNo"] || "No",
    AdditionalFundingRate:
      projectResource?.["AdditionalFundingRate"] ||
      "Rate of additional funding",
    AdditionalFundingRateInfo:
      projectResource?.["AdditionalFundingRateInfo"] ||
      "The rate of additional funding that will be collected in case your project is overfunded.",
  };
  return {
    languageData,
    resources,
  };
}
