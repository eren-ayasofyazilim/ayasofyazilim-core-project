"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";

import { getProjectByIdServer } from "../action";
import ProjectForm from "./form";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { ProjectStatusEnums } from "src/enums/project";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
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
          resources={resources}
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
            <StatusForm projectId={projectId} />
          )}
      </div>
    </div>
  );
}
