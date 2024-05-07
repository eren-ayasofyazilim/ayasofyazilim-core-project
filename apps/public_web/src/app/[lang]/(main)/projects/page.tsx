"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tabs";

import DetailsCard, {
  IDetailsCardProps,
} from "@repo/ayasofyazilim-ui/organisms/details-card";
import { Filter } from "components/filter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ayasofyazilim-ui/atoms/pagination";
const currencyFormatter = new Intl.NumberFormat("tr", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

const cardProps: IDetailsCardProps = {
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
  cardTagVariant: "success",
  BeforeCardContentComponent: (
    <Progress value={20} containerClassName="h-3" className={`bg-green-300`} />
  ),
};
const defaultProps1 = {
  cardProps: cardProps,
  variant: "compact",
};
export default async function Page() {
  const statusOptions = [
    {
      label: "Fonlamada",
      value: "fonlamada",
    },
    {
      label: "Yakında",
      value: "yakinda",
    },
    {
      label: "Fonlandı",
      value: "fonlandi",
    },
    {
      label: "Fonlanamadı",
      value: "fonlanamadi",
    },
    {
      label: "Sonlandırmada",
      value: "sonlandirmada",
    },
  ];
  const sectorOptions = [
    {
      label: "Biyoteknoloji, Biyomedikal",
      value: 1,
    },
    {
      label: "Coğrafi Bilgi Sistemleri",
      value: 2,
    },
    {
      label: "Denizcilik",
      value: 3,
    },
    {
      label: "Diğer",
      value: 4,
    },
  ];
  const categoryOptions = [
    {
      label: "Teknoloji",
      value: 1,
    },
    {
      label: "Üretim",
      value: 2,
    },
  ];
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
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
          </div>
        </TabsContent>
        <TabsContent value="2">
          <div className="flex flex-row w-full flex-wrap justify-center gap-5 col-span-10 overflow-auto h-full">
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
            <DetailsCard {...defaultProps1} />
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
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
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
