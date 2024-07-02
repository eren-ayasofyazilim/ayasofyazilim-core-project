"use server";

import {
  DeleteApiProjectServiceProjectsByIdData,
  GetApiProjectServiceProjectsData,
  GetApiProjectServiceProjectsResponse,
  PostApiProjectServiceProjectsData,
  PutApiProjectServiceProjectsByIdData,
  Volo_Abp_Application_Dtos_PagedResultDto_13,
} from "@ayasofyazilim/saas/ProjectService";
import { revalidatePath } from "next/cache";
import { getProjectServiceClient } from "src/lib";

export async function getProjectByIdServer(projectId: string) {
  "use server";
  try {
    return await getProjectServiceClient().project.getApiProjectServiceProjectsDetailById(
      {
        id: projectId,
      }
    );
  } catch (error) {
    console.error("Offline Data");
    return {};
  }
}
export async function getProjectsServer() {
  "use server";
  try {
    return (await getProjectServiceClient().project.getApiProjectServiceProjects()) as GetApiProjectServiceProjectsResponse;
  } catch (error) {
    console.error("Offline Data");
    return {} as GetApiProjectServiceProjectsResponse;
  }
}
export async function createNewProjectServer(
  body: PostApiProjectServiceProjectsData["requestBody"]
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.postApiProjectServiceProjects({
      requestBody: body,
    });
    revalidatePath("/[lang]/app/[type]/projects", "page");
    revalidatePath("/[lang]/public/projects", "page");
    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
export async function updateProjectServer(
  id: string,
  body: PutApiProjectServiceProjectsByIdData
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.putApiProjectServiceProjectsById({
      id: id,
      requestBody: body,
    });
    revalidatePath("/[lang]/app/[type]/projects", "page");
    revalidatePath("/[lang]/app/[type]/projects/[projectId]", "page");
    revalidatePath("/[lang]/public/projects", "page");
    revalidatePath("/[lang]/public/projects/[projectId]", "page");
    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
export async function updateProjectStatusServer(
  id: string,
  body: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.putApiProjectServiceProjectsStatus({
      projectId: id,
      status: body,
    });
    revalidatePath("/[lang]/app/[type]/projects", "page");
    revalidatePath("/[lang]/app/[type]/projects/[projectId]", "page");
    revalidatePath("/[lang]/public/projects", "page");
    revalidatePath("/[lang]/public/projects/[projectId]", "page");
    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
export async function deleteProjectServer(
  body: DeleteApiProjectServiceProjectsByIdData
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.deleteApiProjectServiceProjectsById({
      id: body.id,
    });
    revalidatePath("/[lang]/app/[type]/projects", "page");
    revalidatePath("/[lang]/public/projects", "page");
    return {
      status: 200,
      projectData: response,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: error.status,
      message: error?.body?.error?.details,
    };
  }
}
export async function getDefaultProjectSectionsServer() {
  "use server";
  try {
    const client =
      await getProjectServiceClient().projectSection.getApiProjectServiceProjectSection();
    return client;
  } catch (error) {
    console.error("Offline Data");
  }
  return {};
}
// export async function getProjectSectionsServer(projectId: string) {
//   "use server";
//   try {
//     const client =
//       await getProjectServiceClient().projectSectionRelation.getApiProjectSectionRelationServiceProjectSectionRelation();

//     return client.items?.filter(
//       (i) => i.projectId === projectId
//     ) as Volo_Abp_Application_Dtos_PagedResultDto_1["items"];
//   } catch (error) {}
//   return [] as Array<AbpForDeploy_ProjectService_ProjectSections_CreateUpdateProjectSectionDto>;
// }
export async function createProjectSectionRelationServer(
  projectId: string,
  projectSectionId: string,
  value: string
): Promise<string> {
  return new Promise(async (resolve) => {
    try {
      const client = getProjectServiceClient();
      await client.projectSectionRelation.postApiProjectServiceProjectSectionRelation(
        {
          requestBody: {
            projectId: projectId,
            value: value,
            projectSectionId: projectSectionId,
          },
        }
      );
      resolve("OK");
    } catch (error: any) {
      console.log(error);
      resolve(error?.body?.error?.message);
    }
  });
}
export async function updateProjectSectionRelationServer(
  id: string,
  value: string
): Promise<string> {
  return new Promise(async (resolve) => {
    try {
      const client = getProjectServiceClient();
      const data =
        await client.projectSectionRelation.getApiProjectServiceProjectSectionRelationById(
          {
            id: id,
          }
        );
      data.value = value;

      await client.projectSectionRelation.putApiProjectServiceProjectSectionRelationById(
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
