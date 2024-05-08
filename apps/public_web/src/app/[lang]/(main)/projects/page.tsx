"use server";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import { LayoutIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ayasofyazilim-ui/molecules/tabs";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ayasofyazilim-ui/molecules/pagination";
import DetailsCard from "@repo/ayasofyazilim-ui/organisms/details-card";
import { Filter } from "components/filter";
import {
  cardProps,
  categoryOptions,
  images,
  sectorOptions,
  statusOptions,
  tableProps,
  tableProps2Col,
} from "./demo-data";
import { getProjectServiceClient } from "src/lib";
import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import Link from "next/link";

export default async function Page() {
  const projectData =
    (await getProjectServiceClient().project.getApiProjectServiceProjects()) as Volo_Abp_Application_Dtos_PagedResultDto_13;
  if (!projectData) return null;

  return (
    <Tabs
      defaultValue="1"
      className="w-full bg-gray-50 flex flex-grow flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between bg-white py-2 gap-2">
        <div className="flex items-center justify-center gap-2">
          <Filter options={statusOptions} title="Durum" />
          <Filter options={sectorOptions} title="Sektör" />
          <Filter options={categoryOptions} title="Kategori" />
        </div>
        <TabsList className="grid grid-cols-2 bg-gray-50 px-2">
          <TabsTrigger value="1">
            <ViewHorizontalIcon />
          </TabsTrigger>
          <TabsTrigger value="2">
            <LayoutIcon />
          </TabsTrigger>
        </TabsList>
      </div>
      <ScrollArea className="p-2 pt-0">
        <TabsContent value="1">
          <div className="w-full flex flex-wrap gap-5 overflow-auto h-full">
            {projectData?.items?.map((project) => (
              <DetailsCard
                key={project.id}
                cardProps={{
                  IAboutCardProps: cardProps.IAboutCardProps,
                  image:
                    images?.[(project.id ?? "default") as keyof typeof images],
                  tags: cardProps.tags,
                  link: "projects/" + (project.id ?? ""),
                  title: project.projectName ?? "",
                  description: project.projectDefinition ?? "",
                  tableProps: tableProps(project),
                  tableProps2Col: tableProps2Col(project),
                  cardTagTitle: "Devam Ediyor",
                  cardTagVariant: "primary",
                  BeforeCardContentComponent: (
                    <Progress
                      value={20}
                      containerClassName="h-3"
                      variant="primary"
                    />
                  ),
                  ActionComponent: (
                    <Button customVariant="primary">
                      <Link href={"projects/" + (project.id ?? "")}>
                        Proje Detayı
                      </Link>
                    </Button>
                  ),
                }}
                variant="compact-vertical"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div className="flex flex-row w-full flex-wrap justify-center gap-5 col-span-10 overflow-auto h-full">
            {projectData?.items?.map((project) => (
              <DetailsCard
                key={project.id}
                cardProps={{
                  IAboutCardProps: cardProps.IAboutCardProps,
                  image:
                    images?.[(project.id ?? "default") as keyof typeof images],
                  tags: cardProps.tags,
                  link: "projects/" + (project.id ?? ""),
                  title: project.projectName ?? "",
                  description: project.projectDefinition ?? "",
                  tableProps: tableProps(project),
                  tableProps2Col: tableProps2Col(project),
                  cardTagTitle: "Devam Ediyor",
                  cardTagVariant: "primary",
                  BeforeCardContentComponent: (
                    <Progress
                      value={20}
                      containerClassName="h-3"
                      variant="primary"
                    />
                  ),
                  ActionComponent: (
                    <Button customVariant="primary">
                      <Link href={"projects/" + (project.id ?? "")}>
                        Proje Detayı
                      </Link>
                    </Button>
                  ),
                }}
                variant="compact"
              />
            ))}
          </div>
        </TabsContent>
      </ScrollArea>
      <div className="flex items-center justify-center bg-white py-2 gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Tabs>
  );
}
