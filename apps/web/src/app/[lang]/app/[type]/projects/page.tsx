"use server";

import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import Link from "next/link";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getProjectsServer } from "./action";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const projectData = await getProjectsServer();

  const { languageData } = await getResourceData(params.lang);

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        description="Buradan projeleri görüntüleyebilirsiniz."
        title="Projeler"
      />
      {params.type === "entrepreneur" && (
        <div className=" flex flex-row flex-wrap justify-end items-center">
          <Link href={getBaseLink("app/entrepreneur/projects/new", true)}>
            <CustomButton variant="outline">
              {languageData.CreateProject}
            </CustomButton>
          </Link>
        </div>
      )}
      {projectData.items?.map((project) => (
        <ProjectCard
          ProjectStatusEnums={ProjectStatusEnums}
          actionText={languageData.ViewProject}
          horizontal
          key={project.id}
          languageData={languageData}
          project={project}
          projectURL={`${projectURL}/${project.id}`}
        />
      ))}
    </div>
  );
}
