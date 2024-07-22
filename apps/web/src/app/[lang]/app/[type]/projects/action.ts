"use server";

import type {
  DeleteApiProjectServiceProjectsByIdData,
  GetApiProjectServiceProjectsResponse,
  PostApiProjectServiceProjectsData,
  PutApiProjectServiceProjectsByIdData,
} from "@ayasofyazilim/saas/ProjectService";
import { revalidatePath } from "next/cache";
import { getProjectServiceClient } from "src/lib";

export async function getProjectByIdServer(projectId: string) {
  try {
    const client = await getProjectServiceClient();
    return await client.project.getApiProjectServiceProjectsDetailById({
      id: projectId,
    });
  } catch (error) {
    return {};
  }
}
export async function getProjectsServer() {
  try {
    const client = await getProjectServiceClient();
    return await client.project.getApiProjectServiceProjects();
  } catch (error) {
    return {} as GetApiProjectServiceProjectsResponse;
  }
}

export async function createNewProjectServer(
  body: PostApiProjectServiceProjectsData["requestBody"],
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.postApiProjectServiceProjects({
      requestBody: body,
    });
    revalidatePath("/");
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
  body: PutApiProjectServiceProjectsByIdData,
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.putApiProjectServiceProjectsById({
      id,
      requestBody: body,
    });
    revalidatePath("/");
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
  body: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined,
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.putApiProjectServiceProjectsStatus({
      projectId: id,
      status: body,
    });
    revalidatePath("/");
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
  body: DeleteApiProjectServiceProjectsByIdData,
) {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response = await client.project.deleteApiProjectServiceProjectsById({
      id: body.id,
    });
    revalidatePath("/");
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
export async function getDefaultProjectSectionsServer() {
  "use server";
  try {
    const client = await getProjectServiceClient();
    const response =
      await client.projectSection.getApiProjectServiceProjectSection();
    return response;
  } catch (error) {
    return {
      items: [],
      error,
    };
  }
}
export async function createProjectSectionRelationServer(
  projectId: string,
  projectSectionId: string,
  value: string,
): Promise<string> {
  return new Promise((resolve) => {
    (async () => {
      try {
        const client = await getProjectServiceClient();
        await client.projectSectionRelation.postApiProjectServiceProjectSectionRelation(
          {
            requestBody: {
              projectId,
              value,
              projectSectionId,
            },
          },
        );
        resolve("OK");
        revalidatePath("/");
      } catch (error: any) {
        resolve(error?.body?.error?.message);
      }
    })();
  });
}
export async function updateProjectSectionRelationServer(
  id: string,
  value: string,
): Promise<string> {
  return new Promise((resolve) => {
    (async () => {
      try {
        const client = await getProjectServiceClient();
        const data =
          await client.projectSectionRelation.getApiProjectServiceProjectSectionRelationById(
            {
              id,
            },
          );
        data.value = value;

        await client.projectSectionRelation.putApiProjectServiceProjectSectionRelationById(
          {
            id,
            requestBody: data,
          },
        );
        resolve("OK");
        revalidatePath("/");
      } catch (error: any) {
        resolve(error?.body?.error?.message);
      }
    })();
  });
}
