"use server";

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getLocalizationResources } from "src/utils";
import {
  getDefaultProjectSectionsServer,
  getProjectByIdServer,
} from "../../action";
import ProjectForm from "./form";

export default async function Page({ params }: any) {
  const { projectId, type } = params;
  const resources = await getLocalizationResources(params.lang);

  const { project: projectData, projectSectionRelations: usedSections } =
    await getProjectByIdServer(projectId);

  const mandatorySections = (await getDefaultProjectSectionsServer()) || [];

  mandatorySections.items?.forEach((section: any) => {
    const index = usedSections?.findIndex((s) => s.sectionId == section.id);

    if (index === -1) {
      usedSections?.push({
        projectId: projectData?.id,
        sectionId: section.id,
        sectionName: section.name,
        sectionRelationValue: JSON.stringify({}),
      });
    }
  });

  if (!projectData) {
    redirect(`/app/${  type  }/projects`);
  }
  return (
    <div className="relative w-full container mt-8">
      <Card className="p-6 w-full">
        <ProjectForm
          projectId={projectId}
          resources={resources}
          sectionData={usedSections || []}
        />
      </Card>
    </div>
  );
}
