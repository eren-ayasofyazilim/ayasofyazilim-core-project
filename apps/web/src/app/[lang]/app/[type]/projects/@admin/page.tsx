"use server";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { PackageSearch } from "lucide-react";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import { getAdminProjectsServer } from "../action";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string };
}) {
  const {
    pendingProjects,
    fundedProjects: fundableProjects,
    fundedProjects,
  } = await getAdminProjectsServer();
  const { languageData } = await getResourceData(params.lang);

  const projectURL = getBaseLink(
    "projects",
    true,
    params.lang,
    true,
    params.type,
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <PageHeader
        description="Buradan projeleri görüntüleyebilirsiniz."
        title="Projeler"
      />
      <SectionLayout
        defaultActiveSectionId="fundable"
        sections={[
          { id: "fundable", name: "Yayında olan projeler" },
          { id: "sent-for-approval", name: "Onay bekleyen projeler" },
          { id: "completed", name: "Sona ermiş projeler" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="fundable">
          {fundableProjects.map((project) => (
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
          {!fundableProjects.length && (
            <div className="flex h-full">
              <div className="flex flex-col items-center m-auto">
                <PackageSearch color="#222" size={120} />
                <h3 className="mt-2">Henüz yayında olan bir projeniz yok.</h3>
              </div>
            </div>
          )}
        </SectionLayoutContent>

        <SectionLayoutContent sectionId="sent-for-approval">
          {pendingProjects.map((project) => (
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
          {!pendingProjects.length && (
            <div className="flex h-full">
              <div className="flex flex-col items-center m-auto">
                <PackageSearch color="#222" size={120} />
                <h3 className="mt-2">Henüz onay bekleyen bir projeniz yok.</h3>
              </div>
            </div>
          )}
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="completed">
          {fundedProjects.map((project) => (
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
          {!fundedProjects.length && (
            <div className="flex h-full">
              <div className="flex flex-col items-center m-auto">
                <PackageSearch color="#222" size={120} />
                <h3 className="mt-2">Henüz sona ermiş bir projeniz yok.</h3>
              </div>
            </div>
          )}
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
