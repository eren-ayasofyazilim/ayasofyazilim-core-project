"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";

import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getProjectByIdServer } from "../action";
import ProjectForm from "./form";
import StatusForm from "./statusForm";

export default async function Page({ params }: any) {
  const { projectId, type } = params;
  const { languageData, resources } = await getResourceData(params.lang);
  const projectData = (await getProjectByIdServer(projectId)).project;

  if (!projectData) {
    redirect("/app/" + params.type + "/projects");
  }

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type
  );

  return (
    <div className="flex flex-row gap-3 relative w-full container mt-8">
      <Card className="p-6 basis-3/5">
        <ProjectForm
          languageData={languageData}
          projectData={projectData}
          projectId={projectId}
          profileType={type}
        />
      </Card>
      <div className="basis-2/5">
        <ProjectCard
          project={projectData}
          languageData={languageData}
          projectURL={`${projectURL}/${projectData.id}`}
          ProjectStatusEnums={ProjectStatusEnums}
        />
        {type === "entreperneur" &&
          projectData.status === ProjectStatusEnums.IN_DRAFT_STAGE && (
            <StatusForm
              projectId={projectId}
              actionText={languageData.SEND_FOR_APPROVAL}
            />
          )}
      </div>
    </div>
  );
}
