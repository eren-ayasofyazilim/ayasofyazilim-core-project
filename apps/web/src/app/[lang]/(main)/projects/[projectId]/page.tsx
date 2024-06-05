"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getLocalizationResources } from "src/utils";
import { getProjectByIdServer } from "../action";
import ProjectForm from "./form";

export default async function Page({ params }: any) {
  const { projectId } = params;
  const resources = await getLocalizationResources(params.lang);
  if (!resources?.["ProjectService"].texts) return null;

  const projectData = await getProjectByIdServer(projectId);

  if (!projectData) {
    redirect("/projects");
  }
  const projectResource = resources["ProjectService"]?.texts;
  const uiResource = resources["AbpUi"]?.texts;
  if (!projectResource || !uiResource) return;

  return (
    <div className="relative w-full container mt-8">
      <Card className="p-6">
        <ProjectForm
          resources={resources}
          projectData={projectData}
          projectId={projectId}
        />
      </Card>
    </div>
  );
}
