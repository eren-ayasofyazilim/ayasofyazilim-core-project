"use server";

import { getResourceData } from "src/language-data/Projects/projects";
import { getProjectServiceClient } from "src/lib";
import { getBaseLink } from "src/utils";
import { ProjectStatusEnums } from "src/enums/project";
import Landing from "../landing";
import { getConfig } from "../config";

async function getProjects() {
  if (process.env.APPLICATION_NAME === "UPWITHCROWD") {
    const client = await getProjectServiceClient();
    const projectData = await client.project.getApiProjectServiceProjects();
    const fundableProjects =
      projectData.items?.filter(
        (i) => ProjectStatusEnums[i.status || 0] !== "IN_DRAFT_STAGE"
      ) || [];
    return fundableProjects;
  }
  return [];
}
export default async function Page({
  params,
}: {
  params: { city: string; lang: string };
}) {
  const appName = params.city;
  const config = getConfig(appName);

  const fundableProjects = await getProjects();

  const { languageData } = await getResourceData(params.lang);
  const projectURL = getBaseLink(
    `${appName}/projects`,
    true,
    params.lang,
    true
  );

  return (
    <Landing
      config={config}
      fundableProjects={fundableProjects}
      languageData={languageData}
      projectURL={projectURL}
    />
  );
}
