"use server";

import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import { ICardTableProps } from "@repo/ayasofyazilim-ui/molecules/card-table";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import CardList from "@repo/ayasofyazilim-ui/organisms/card-list";
import DetailsCard, {
  IDetailsCardProps,
} from "@repo/ayasofyazilim-ui/organisms/details-card";
import Link from "next/link";
import { getProjectServiceClient } from "src/lib";

const currencyFormatter = new Intl.NumberFormat("tr", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});
const defaultProps1: IDetailsCardProps = {
  IAboutCardProps: {
    link: "#",
    avatar:
      "https://i.kickstarter.com/assets/043/950/483/f7c5bac8005024eea6c3ce6eaf65bb15_original.jpg?anim=false&fit=crop&height=80&origin=ugc&q=92&width=80&sig=IUCq8Z9OX16OY%2BmX17njzYURwPLYdY1ZcjVOuL%2FJfwc%3D",
    title: "Clevetura Devices LLC",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  link: "projects/1",
  title: "CLVX 1 - Keyboard Gives More",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  tags: ["Teknoloji", "Yazılım"],
  image:
    "https://i.kickstarter.com/assets/044/243/111/620ee2c08af65e9646d6cfd9dbe55868_original.png?anim=false&fit=crop&gravity=faces&height=315&origin=ugc&q=92&width=560&sig=EXsDXlcpA3rTqgOLDiduLcetM6QIEzSCQh19YMy8nl4%3D",
  locale: "tr",
  tableProps: [
    { title: "Proje Tipi", value: "Paya Dayalı" },
    { title: "Pay Arz Oranı", value: "%8" },
    {
      title: "Başlangıç Tarihi",
      value: new Date("01.02.2024").toLocaleDateString(),
    },
    {
      title: "Bitiş Tarihi",
      value: new Date("01.03.2024").toLocaleDateString(),
    },
  ],
  tableProps2Col: [
    [
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, " "),
        value: "Gerçekleşen Yatırım",
      },
      {
        title: currencyFormatter.format(10000000).replace(/\s/g, " "),
        value: "Hedeflenen Yatırım",
      },
    ],
  ],
  cardTagTitle: "Başarılı",
  cardTagVariant: "primary",
  BeforeCardContentComponent: (
    <Progress value={20} containerClassName="h-3" className={`bg-green-300`} />
  ),
};
function tableProps(data: any) {
  return [
    {
      title: "Proje Tipi",
      value:
        data.fundCollectionType === "SHRE" ? "Paya Dayalı" : "Borca Dayalı",
    },
    { title: "Pay Arz Oranı", value: "%8" },
    {
      title: "Başlangıç Tarihi",
      value: new Date(data.projectStartDate).toLocaleDateString(),
    },
    {
      title: "Bitiş Tarihi",
      value: new Date(data.projectEndDate).toLocaleDateString(),
    },
  ];
}
function tableProps2Col(data: any) {
  return [
    [
      {
        title: currencyFormatter
          .format(data.fundNominalAmount)
          .replace(/\s/g, " "),
        value: "Gerçekleşen Yatırım",
      },
      {
        title: currencyFormatter
          .format(data.fundableAmount)
          .replace(/\s/g, " "),
        value: "Hedeflenen Yatırım",
      },
    ],
  ] as [ICardTableProps, ICardTableProps][];
}

const images = {
  "806816b3-122c-2f67-95d1-3a125f4bee0f":
    "https://kapilendo-public.imgix.net/files/projects/bamboologic/8e0aa153-e311-47f9-9563-1aa44c05a3fe_01_Project-Header-1920x1080px.png?auto=compress&auto=format&maxdpr=3&w=750&fit=crop&dpr=1.5",
  "9c169fdc-f218-ad06-e277-3a125f8b51f7":
    "https://kapilendo-public.imgix.net/files/projects/riverrecycle-oy/aa36f9b8-c668-4ab3-959a-79cbf2933be4_RR-Project-Header-1920x1080px-2.png?auto=compress&auto=format&maxdpr=3&w=750&fit=crop&dpr=1.5",
  default: "https://templates.tiptap.dev/placeholder-image.jpg",
};

export default async function Page() {
  const projectData =
    (await getProjectServiceClient().project.getApiProjectServiceProjects()) as Volo_Abp_Application_Dtos_PagedResultDto_13;
  if (!projectData) return null;

  const data = [
    {
      title: "Aktif Projeler",
      content: projectData?.totalCount?.toString() ?? "0",
      description: "Aktif olarak yatırım toplayan projeler",
      footer: "",
    },
    {
      title: "Tamamlanmış Projeler",
      content: "0",
      description: "Başarılı olan projeler",
      footer: "",
    },
    {
      title: "Başarısız Projeler",
      content: "0",
      description: "Başarılı olmayan projeler",
      footer: "",
    },
    {
      title: "Taslak Projeler",
      content: "0",
      description: "Hazırlanmakta olan projeler",
      footer: "",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-start mb-8">
        <div className="flex-row p-4 w-10/12">
          <CardList cards={data} />
        </div>
      </div>
      <div className="container flex flex-row flex-wrap justify-center gap-5">
        {projectData?.items?.map((project) => (
          <DetailsCard
            key={project.id}
            variant="compact-vertical"
            cardProps={{
              IAboutCardProps: defaultProps1.IAboutCardProps,
              image: images?.[(project.id ?? "default") as keyof typeof images],
              tags: defaultProps1.tags,
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
          />
        ))}
      </div>
    </div>
  );
}
