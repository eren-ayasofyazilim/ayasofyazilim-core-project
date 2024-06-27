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

  const {
    project: projectData,
    projectSectionRelations: usedSectionsInProject,
  } = await getProjectByIdServer(projectId);

  // console.log(usedSectionsInProject);
  const mandatorySections = (await getDefaultProjectSectionsServer()) || [];
  // console.log(mandatorySections);
  // mandatorySections?.items?.toReversed()?.forEach((section: any) => {
  //   const index = usedSectionsInProject?.findIndex(
  //     /* @ts-ignore */
  //     (s) => s.projectSectionId === section.id
  //   ) ||-1;
  //   if (index > -1 && usedSectionsInProject?.[index]) {
  //     /* @ts-ignore */
  //     usedSectionsInProject[index].name = section.name;
  //   } else {
  //     usedSectionsInProject.push(section);
  //   }
  // });
  if (!projectData) {
    redirect("/app/" + type + "/projects");
  }
  return (
    <div className="relative w-full container mt-8">
      <Card className="p-6 w-full">
        <ProjectForm
          resources={resources}
          sectionData={usedSectionsInProject || []}
          projectId={projectId}
        />
      </Card>
    </div>
  );
}
