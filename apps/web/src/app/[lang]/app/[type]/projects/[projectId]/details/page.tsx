"use server";

import type { GetApiProjectServiceProjectSectionResponse } from "@ayasofyazilim/saas/ProjectService";
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

  const mandatorySections: GetApiProjectServiceProjectSectionResponse =
    await getDefaultProjectSectionsServer();

  mandatorySections.items?.forEach((section: any) => {
    const index = usedSections?.findIndex((s) => s.sectionId === section.id);

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
    redirect(`/app/${type}/projects`);
  }
  return (
    <div className="relative w-full">
      <ProjectForm
        projectId={projectId}
        resources={resources}
        sectionData={usedSections || []}
      />
    </div>
  );
}
