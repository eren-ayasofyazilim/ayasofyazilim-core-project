"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getLocalizationResources } from "src/utils";
import { getProjectByIdServer } from "../action";
import ProjectForm from "./form";

export default async function Page({ params }: any) {
  const { projectId, type } = params;
  const resources = await getLocalizationResources(params.lang);
  const projectData = (await getProjectByIdServer(projectId)).project;

  if (!projectData) {
    redirect("/app/" + params.type + "/projects");
  }

  return (
    <div className="relative w-full container mt-8">
      <Card className="p-6">
        <ProjectForm
          resources={resources}
          projectData={projectData}
          projectId={projectId}
          profileType={type}
        />
      </Card>
    </div>
  );
}
