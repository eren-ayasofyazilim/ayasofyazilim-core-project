"use server";

import { getProjectServiceClient } from "src/lib";
import { getLocalizationResources } from "src/utils";
import ProjectForm from "./form";

async function saveProjectSectionRelation(
  id: string,
  value: string
): Promise<string> {
  return new Promise(async (resolve) => {
    try {
      const client = getProjectServiceClient();
      const data =
        await client.projectSectionRelation.getApiProjectSectionRelationServiceProjectSectionRelationById(
          {
            id: id,
          }
        );
      data.value = value;

      await client.projectSectionRelation.putApiProjectSectionRelationServiceProjectSectionRelationById(
        {
          id: id,
          requestBody: data,
        }
      );
      resolve("OK");
    } catch (error: any) {
      resolve(error?.body?.error?.message);
    }
  });
}

export default async function Page({ params }: any) {
  const { projectId } = params;
  const resources = await getLocalizationResources(params.lang);
  if (!resources?.["ProjectService"].texts) return null;
  async function getData() {
    "use server";
    const client =
      await getProjectServiceClient().project.getApiProjectServiceProjectsById({
        id: projectId,
      });

    return client;
  }
  const projectData = await getData();

  if (!projectData) {
    return null;
  }
  const projectResource = resources["ProjectService"]?.texts;
  const uiResource = resources["AbpUi"]?.texts;
  if (!projectResource || !uiResource) return;

  return (
    <div className="relative w-full container" id="details">
      <ProjectForm resources={resources} projectData={projectData} />
    </div>
  );
}
