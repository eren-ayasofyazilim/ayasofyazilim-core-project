"use server";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";

import Button from "@repo/ayasofyazilim-ui/molecules/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import { Link } from "next-view-transitions";
import { getProjectsServer } from "../../app/[type]/projects/action";
import { getResourceData } from "./[projectId]/language";
import { numberFormatter } from "./demo-data";
import { ProjectStatusEnums } from "src/enums/project";

export default async function Page({ params }: { params: { lang: string } }) {
  const projectData = await getProjectsServer();

  
  const { languageData, resources } = await getResourceData(params.lang);
  if (!resources) return;

  return (
    <div className="container h-full mt-20">
      {projectData && (
        <ScrollArea className="p-2 pt-0 h-full grow">
          <div>
            <h2 className="text-3xl font-bold mb-8 mt-10 text-center">
              {languageData.InvestmentOpportunities}
            </h2>
            <div className="flex flex-row gap-3 justify-center">
              {projectData.items 
                ?.filter((i) => ProjectStatusEnums[i.status || 0] === "FUNDABLE")
                ?.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border rounded-md basis-1/3"
                  >
                    <div>
                      <img
                        src="https://placehold.co/1920x600"
                        className="h-[200px] object-cover rounded-t-md"
                      />
                    </div>
                    <div className="py-4 px-6 flex flex-col gap-2 border-b">
                      <h3 className="font-semibold leading-none tracking-tight hover:underline">
                        <a href={`projects/${project.id}`}>
                          {project.projectName}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.projectDefinition}
                      </p>
                    </div>
                    <Progress
                      value={Math.max(
                        5,
                        ((project.fundNominalAmount || 0) /
                          (project.fundableAmount || 1)) *
                          100
                      )}
                      containerClassName="h-4 overflow-hidden m-0"
                      className={`bg-[#05ce78] rounded-r-full flex items-center`}
                    >
                      <div className="ml-auto w-3 h-3 rounded-full bg-[#08995a] text-[#08995a] mr-1 flex items-center justify-center"></div>
                    </Progress>
                    <div className="py-4 px-6 flex flex-col gap-2">
                      <div className="items-center py-1 flex justify-between  text-center flex-row">
                        <div className="text-xs flex gap-0 font-semibold">
                          {languageData.FundCollectionType}
                        </div>
                        <div className="text-xs flex gap-0">
                          {project.fundCollectionType === "SHRE"
                            ? languageData["FundCollectionTypeSHRE"]
                            : languageData["FundCollectionTypeDBIT"]}
                        </div>
                      </div>
                      <div className="items-center py-1 flex justify-between  text-center flex-row">
                        <div className="text-xs flex gap-0 font-semibold">
                          {languageData.AdditionalFunding}
                        </div>
                        <div className="text-xs flex gap-0">
                          %{project.additionalFundRate || 0}
                        </div>
                      </div>
                      <div className="items-center py-1 flex justify-between  text-center flex-row">
                        <div className="text-xs flex gap-0 font-semibold">
                          {languageData.CampaignEndDate}
                        </div>
                        <div className="text-xs flex gap-0">
                          {project.projectStartDate !== "0001-01-01T00:00:00"
                            ? new Date(project.projectEndDate ?? 0)
                                .toLocaleString("tr", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                                .split(" ,")[0]
                            : languageData.StartingSoon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-row justify-between items-center bg-gray-100">
                        <div className="p-6 flex justify-between py-2 text-center flex-col items-start">
                          <div className="flex gap-0 font-semibold text-md m-auto">
                            ₺
                            {numberFormatter.format(
                              project.fundNominalAmount ?? 0
                            )}
                          </div>
                          <div className="text-xs flex gap-0">
                            {languageData.CollectedAmount}
                          </div>
                        </div>
                        <div className="p-6 flex justify-between py-2 text-center flex-col items-end">
                          <div className="flex gap-0 font-semibold text-md m-auto">
                            ₺
                            {numberFormatter.format(
                              project.fundableAmount ?? 0
                            )}
                          </div>
                          <div className="text-xs flex gap-0">
                            {languageData.TargetAmount}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <Button
                        customVariant="primary"
                        asChild
                        className="rounded-full w-full"
                      >
                        <Link href={"projects/" + project.id}>
                          {languageData.InvestNow}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8 mt-10 text-center">
              {languageData.ProjectsToOpenForInvestmentSoon}
            </h2>
            <div className="flex flex-row gap-3 justify-center">
              {projectData.items // @ts-ignore
                ?.filter((i) => ProjectStatusEnums[i.status || 0] === "APPROVED")
                ?.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border rounded-md basis-1/3"
                  >
                    <div>
                      <img
                        src="https://placehold.co/1920x600"
                        className="h-[200px] object-cover rounded-t-md"
                      />
                    </div>
                    <div className="py-4 px-6 flex flex-col gap-2 border-b">
                      <h3 className="font-semibold leading-none tracking-tight hover:underline">
                        <a href={`projects/${project.id}`}>
                          {project.projectName}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.projectDefinition}
                      </p>
                    </div>
                    <Progress
                      value={Math.max(
                        5,
                        ((project.fundNominalAmount || 0) /
                          (project.fundableAmount || 1)) *
                          100
                      )}
                      containerClassName="h-4 overflow-hidden m-0"
                      className={`bg-[#05ce78] rounded-r-full flex items-center`}
                    >
                      <div className="ml-auto w-3 h-3 rounded-full bg-[#08995a] text-[#08995a] mr-1 flex items-center justify-center"></div>
                    </Progress>
                    <div className="py-4 px-6 flex flex-col gap-2">
                      <div className="items-center py-1 flex justify-between  text-center flex-row">
                        <div className="text-xs flex gap-0 font-semibold">
                          {languageData.FundCollectionType}
                        </div>
                        <div className="text-xs flex gap-0">
                          {project.fundCollectionType === "SHRE"
                            ? languageData["FundCollectionTypeSHRE"]
                            : languageData["FundCollectionTypeDBIT"]}
                        </div>
                      </div>
                      <div className="items-center py-1 flex justify-between  text-center flex-row">
                        <div className="text-xs flex gap-0 font-semibold">
                          {languageData.AdditionalFunding}
                        </div>
                        <div className="text-xs flex gap-0">
                          %{project.additionalFundRate || 0}
                        </div>
                      </div>
                      <div className="items-center py-1 flex justify-between  text-center flex-row">
                        <div className="text-xs flex gap-0 font-semibold">
                          {languageData.CampaignStartDate}
                        </div>
                        <div className="text-xs flex gap-0">
                          {project.projectStartDate !== "0001-01-01T00:00:00"
                            ? new Date(project.projectStartDate ?? 0)
                                .toLocaleString("tr", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                                .split(" ,")[0]
                            : languageData.StartingSoon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-row justify-between items-center bg-gray-100">
                        <div className="p-6 flex justify-between py-2 text-center flex-col items-start">
                          <div className="flex gap-0 font-semibold text-md m-auto">
                            ₺
                            {numberFormatter.format(
                              project.fundNominalAmount ?? 0
                            )}
                          </div>
                          <div className="text-xs flex gap-0">
                            {languageData.CollectedAmount}
                          </div>
                        </div>
                        <div className="p-6 flex justify-between py-2 text-center flex-col items-end">
                          <div className="flex gap-0 font-semibold text-md m-auto">
                            ₺
                            {numberFormatter.format(
                              project.fundableAmount ?? 0
                            )}
                          </div>
                          <div className="text-xs flex gap-0">
                            {languageData.TargetAmount}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <Button
                        customVariant="primary"
                        asChild
                        className="rounded-full w-full"
                      >
                        <Link href={"projects/" + project.id}>
                          {languageData.InvestNow}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
