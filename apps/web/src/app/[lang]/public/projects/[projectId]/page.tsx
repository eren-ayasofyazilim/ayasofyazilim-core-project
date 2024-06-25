"use server";

import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import { TiptapLayout } from "@repo/ayasofyazilim-ui/templates/tiptap-layout";
import { getProjectServiceClient } from "src/lib";

import { CardContent } from "@/components/ui/card";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import Invest from "@repo/ui/invest";
import { auth } from "auth";
import { getLocalizationResources } from "src/utils";
import { currencyFormatter, numberFormatter } from "../demo-data";
export default async function Page({
  params,
}: {
  params: { projectId: string; lang: string };
}) {
  const { projectId, lang } = params;
  const projectData =
    await getProjectServiceClient().project.getApiProjectServiceProjectsById({
      id: projectId,
    });
  const resources = await getLocalizationResources(lang);

  const session = await auth();
  const user = session?.user;
  if (!projectData) return null;

  const uiResource = resources?.["AbpUi"]?.texts;
  const projectResource = resources?.["ProjectService"]?.texts;
  const languageData = {
    Next: uiResource?.["PagerNext"] || "Next",
    Previous: uiResource?.["PagerPrevious"] || "Previous",
    DaysLeft: uiResource?.["DaysLeft"] || "Days left",
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
  const usedSectionsInProject = [
    {
      projectId: "4674b59b-e2ea-fb15-7d64-3a13227b96c1",
      sectionId: "3b5d2f8e-9969-5cfc-8edb-3a1323950514",
      sectionRelationId: "d1657522-826c-ca4f-90ac-3a1327e8764e",
      sectionName: "Proje Hakkında",
      sectionRelationValue:
        '{"type":"doc","content":[{"type":"heading","attrs":{"id":"804a58bc-27b3-4f03-8689-c11ee63d69c7","data-toc-id":"804a58bc-27b3-4f03-8689-c11ee63d69c7","textAlign":"left","level":1},"content":[{"type":"text","text":"Örnek bir proje"}]},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"},"content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales lacus velit, semper posuere mi sagittis pulvinar. Praesent vel augue ut magna malesuada dapibus at in lacus. In eu nisl eu mauris maximus pharetra. Ut vulputate mauris et mauris consequat, nec porta mauris ullamcorper. Praesent commodo sed ipsum sit amet blandit. Donec efficitur nibh diam, ac mollis magna cursus nec. Suspendisse auctor maximus nunc. Praesent libero quam, lacinia ornare semper eget, gravida ut erat. Integer aliquam odio dolor, et iaculis diam sagittis eu. Sed scelerisque, lorem eget laoreet pharetra, urna nunc tempor magna, sed condimentum nunc metus id nisl."}]},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"},"content":[{"type":"text","text":"Sed fringilla, neque et sollicitudin convallis, tortor risus pharetra nunc, pellentesque elementum odio augue nec lectus. Phasellus vitae mollis turpis, id aliquam massa. Aliquam erat volutpat. Suspendisse porta laoreet urna, vitae fringilla nisl faucibus vitae. Vivamus facilisis magna nec lacus auctor, sit amet feugiat nibh vehicula. Morbi ut finibus purus. Mauris eget bibendum mauris. Morbi dignissim consectetur tellus, sed bibendum arcu hendrerit egestas. Aliquam malesuada varius tellus in vehicula. Ut tortor enim, dignissim eget nibh quis, malesuada volutpat nunc. Nullam tristique aliquet quam sed gravida. Aliquam sit amet diam non risus faucibus commodo et ut justo. Donec a ligula a augue sollicitudin posuere. Suspendisse tristique at erat id eleifend. In et tellus consectetur, dictum eros porta, rutrum leo. Morbi pellentesque leo est, non faucibus lectus semper at."}]},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"}}]}',
      order: 0,
    },
    {
      projectId: "4674b59b-e2ea-fb15-7d64-3a13227b96c1",
      sectionId: "6576df3e-90b3-9927-a95e-3a1323950514",
      sectionRelationId: "74964f52-e2f9-f50c-1d9c-3a1327e8b09a",
      sectionName: "Ürün veya Hizmet",
      sectionRelationValue:
        '{"type":"doc","content":[{"type":"heading","attrs":{"id":"50bab8bd-f16d-4abc-9d54-349fdce912d3","data-toc-id":"50bab8bd-f16d-4abc-9d54-349fdce912d3","textAlign":"left","level":1},"content":[{"type":"text","text":"Ürün ve Hizmetler"}]},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"},"content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales lacus velit, semper posuere mi sagittis pulvinar. Praesent vel augue ut magna malesuada dapibus at in lacus. In eu nisl eu mauris maximus pharetra. Ut vulputate mauris et mauris consequat, nec porta mauris ullamcorper. Praesent commodo sed ipsum sit amet blandit. Donec efficitur nibh diam, ac mollis magna cursus nec. Suspendisse auctor maximus nunc. Praesent libero quam, lacinia ornare semper eget, gravida ut erat. Integer aliquam odio dolor, et iaculis diam sagittis eu. Sed scelerisque, lorem eget laoreet pharetra, urna nunc tempor magna, sed condimentum nunc metus id nisl."}]},{"type":"imageBlock","attrs":{"src":"https://templates.tiptap.dev/placeholder-image.jpg","width":"100%","align":"center"}},{"type":"paragraph","attrs":{"class":null,"textAlign":"left"},"content":[{"type":"text","text":"Sed fringilla, neque et sollicitudin convallis, tortor risus pharetra nunc, pellentesque elementum odio augue nec lectus. Phasellus vitae mollis turpis, id aliquam massa. Aliquam erat volutpat. Suspendisse porta laoreet urna, vitae fringilla nisl faucibus vitae. Vivamus facilisis magna nec lacus auctor, sit amet feugiat nibh vehicula. Morbi ut finibus purus. Mauris eget bibendum mauris. Morbi dignissim consectetur tellus, sed bibendum arcu hendrerit egestas. Aliquam malesuada varius tellus in vehicula. Ut tortor enim, dignissim eget nibh quis, malesuada volutpat nunc. Nullam tristique aliquet quam sed gravida. Aliquam sit amet diam non risus faucibus commodo et ut justo. Donec a ligula a augue sollicitudin posuere. Suspendisse tristique at erat id eleifend. In et tellus consectetur, dictum eros porta, rutrum leo. Morbi pellentesque leo est, non faucibus lectus semper at."}]}]}',
      order: 0,
    },
  ];
  const sectionsData = usedSectionsInProject?.map((section: any, index) => ({
    key: section.sectionName ?? "" + index,
    id: section.sectionName.replaceAll(" ", ""),
    name: section.sectionName,
    value: (
      <div>
        <TipTapEditor
          editorContent={JSON.parse(section.sectionRelationValue ?? "{}")}
          canEditable={false}
        />
      </div>
    ),
  }));

  sectionsData.push({
    key: "invest",
    id: "invest",
    name: "Invest",
    value: (
      <div>
        <Invest
          resources={resources}
          user={user}
          name={projectData.projectName ?? ""}
          description={projectData.projectDefinition ?? ""}
          images={[]}
          investmentDetails={[
            {
              name: "cashValue",
              value: currencyFormatter.format(projectData.cashValue ?? 0),
            },
            {
              name: "additionalFundRate",
              value: projectData.additionalFundRate ?? 0,
            },
            {
              name: "fundNominalAmount",
              value: numberFormatter.format(projectData.fundNominalAmount ?? 0),
            },
            {
              name: "fundableAmount",
              value: numberFormatter.format(projectData.fundableAmount ?? 0),
            },
            {
              name: "qualifiedFundRate",
              value: projectData.qualifiedFundRate ?? 0,
            },
            {
              name: "fundCollectionType",
              value: projectData.fundCollectionType ?? "",
            },
            {
              name: "projectRemaining",
              value:
                Math.round(
                  (new Date(projectData.projectStartDate ?? "").getTime() -
                    new Date(projectData.projectEndDate ?? "").getTime()) /
                    (1000 * 3600 * 24)
                ) + " Days",
            },
          ]}
        />
      </div>
    ),
  });
  function getDateDifferanceInDays() {
    const date1Obj = new Date();
    const targetObj = new Date(projectData.projectEndDate || 0);
    const diffTime = Math.abs(targetObj.getTime() - date1Obj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  function getCollectedFundPercentage() {
    return languageData.TargetReached.replace(
      "{target}",
      Math.round(
        ((projectData?.fundNominalAmount || 0) /
          (projectData?.fundableAmount || 1)) *
          100
      ).toString()
    );
  }
  return (
    <div className="w-full">
      <div className="absolute top-0 left-0 right-0 h-screen z-[-1] overflow-hidden">
        <img
          className="mt-[-150px]"
          src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=70&.v=UW1GeTRObi9UaVF4S3FUNERNMWVhZ2FRQXQ2R0JQTk5udUZxTkR3ZVlpS0o0bnJBQlJYRTdzdWVwMVBVb2c4L1B1OWIzMk5Pa05pM0VtRDBtTXRCK3dUMngwVnJycmY0WkN2ZnNvOUpFNFcraHk5OElIb1ltUHJZVjBUY3JCcW9xbVhUa3FGSmI3VWZ2cHdnckVOUmlBPT0=&traceId=1"
        />
      </div>
      <div className="h-screen flex flex-col justify-end">
        <div className="flex items-end justify-between container">
          <div className="flex flex-col gap-2 mb-5">
            <div className="text-4xl font-bold">{projectData.projectName}</div>
            <div className="text-2xl ">{projectData.projectDefinition}</div>
          </div>
          <div className="flex flex-col gap-2 items-center mb-5">
            <img
              className=" h-16 w-16 object-cover"
              src="https://kapilendo-public.imgix.net/files/projects/bamboologic/dc20bb52-80e4-4df8-9c2f-b9b18fad6d4c_bambulogiceuropebv_logo.jfif?auto=compress&amp;auto=format&amp;maxdpr=3&amp;w=276&amp;fit=crop&amp;dpr=1.5"
            />
            <div>OnePlanet</div>
          </div>
        </div>
        <div className="bg-white pb-16">
          <Progress
            value={50}
            containerClassName="h-4 overflow-visible m-0"
            className={`bg-[#05ce78] rounded-r-full flex items-center`}
          >
            <div className="ml-auto w-3 h-3 rounded-full bg-[#08995a] text-[#08995a] mr-1 flex items-center justify-center">
              <span className="mt-6">|</span>
            </div>
          </Progress>
          <div className="border pt-2 pb-2 bg-white">
            <div className="container flex justify-between ">
              <div className="basis-1/3">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b>
                    {
                      new Date(projectData.projectStartDate ?? 0)
                        .toLocaleString("tr", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .split(" ,")[0]
                    }
                  </b>
                </div>
                <div className="text-muted-foreground text-xs">
                  {languageData.CampaignStartDate}
                </div>
              </div>
              <div className="basis-1/3 text-center">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b className="text-[#08985a]">
                    {getDateDifferanceInDays() + " gün kaldı"}{" "}
                  </b>
                </div>
                <div className="text-muted-foreground text-xs">
                  {getCollectedFundPercentage()}
                </div>
              </div>
              <div className="basis-1/3 text-end">
                <div className="text-muted bg-muted bg-muted/50"></div>
                <div>
                  <b>
                    {
                      new Date(projectData.projectEndDate ?? 0)
                        .toLocaleString("tr", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .split(" ,")[0]
                    }
                  </b>
                </div>
                <div className="text-muted-foreground text-xs">
                  {languageData.CampaignEndDate}
                </div>
              </div>
            </div>
          </div>
          <div className="container flex justify-between pt-4 gap-3 bg-white">
            <div className="basis-1/3">
              <div className="flex flex-col sticky top-20 gap-3">
                <div>
                  <div className="text-lg font-bold">
                    {projectData.fundNominalAmount}₺
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {languageData.CollectedAmount}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-bold">0</div>
                  <div className="text-muted-foreground text-xs">
                    {languageData.Investor}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-bold">0</div>
                  <div className="text-muted-foreground text-xs">
                    {languageData.QualifiedInvestor}
                  </div>
                </div>
                <CustomButton
                  variant={"outline"}
                  className="bg-[#05ce78] hover:bg-[#00c973] border-[#05ce78] text-[#000]"
                >
                  {languageData.Invest}
                </CustomButton>
              </div>
            </div>
            <div className="basis-2/3 gap-2 flex flex-col">
              <div className="m-auto flex gap-2 justify-around w-full">
                <CardContent className="w-full">
                  <div className="flex flex-row flex-wrap mt-5">
                    <div className="basis-1/2 mb-3">
                      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {languageData["FundCollectionType"]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {projectData.fundCollectionType === "SHRE"
                              ? languageData["FundCollectionTypeSHRE"]
                              : languageData["FundCollectionTypeDBIT"]}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-1/2 mb-3">
                      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {languageData["FundableAmount"]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {numberFormatter.format(
                              projectData.fundableAmount || 0
                            )}
                            ₺
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="basis-1/2">
                      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {languageData.AdditionalFunding}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            %{projectData.additionalFundRate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="">
          <TiptapLayout
            sections={sectionsData ?? []}
            defaultActiveSectionId={"general"}
          />
        </div>

        <div className=""></div>
      </div>
    </div>
  );
}
