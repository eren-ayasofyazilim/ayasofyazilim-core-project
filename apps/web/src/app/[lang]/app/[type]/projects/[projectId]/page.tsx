"use server";

import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { redirect } from "next/navigation";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getProjectByIdServer } from "../action";
import ProjectForm from "./form";
import StatusForm from "./status-form";

export default async function Page({ params }: any) {
  const { projectId, type } = params;
  const { languageData } = await getResourceData(params.lang);
  const projectData = (await getProjectByIdServer(projectId)).project;

  if (!projectData) {
    redirect(`/app/${params.type}/projects`);
  }

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );

  return (
    <div className="flex flex-row gap-3 relative w-full">
      <div className="basis-full">
        <ProjectForm
          languageData={languageData}
          profileType={type}
          projectData={projectData}
          projectId={projectId}
        />
      </div>
      <div className="basis-2/5 min-w-72">
        <ProjectCard
          ProjectStatusEnums={ProjectStatusEnums}
          languageData={languageData}
          project={projectData}
          projectURL={`${projectURL}/${projectData.id}`}
        />
        {type === "entreperneur" &&
          projectData.status === ProjectStatusEnums.IN_DRAFT_STAGE && (
            <StatusForm
              actionText={languageData.SEND_FOR_APPROVAL}
              projectId={projectId}
            />
          )}
      </div>
    </div>
  );
}
