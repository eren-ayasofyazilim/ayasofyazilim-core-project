"use client";
import { ScrollArea } from "@repo/ayasofyazilim-ui/atoms/scroll-area";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import DetailsCard, {
  IDetailsCardProps,
} from "@repo/ayasofyazilim-ui/organisms/details-card";
import SectionLayout from "@repo/ayasofyazilim-ui/templates/section-layout";
import { useState } from "react";

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
    {
      column: true,
      title: "Proje Tipi",
      value: "Paya Dayalı",
    },
    {
      column: true,
      title: "Pay Arz Oranı",
      value: "%8",
    },
    {
      title: "Başlangıç Tarihi",
      value: new Date("01.02.2024").toLocaleDateString(),
      column: true,
    },
    {
      title: "Bitiş Tarihi",
      value: new Date("01.03.2024").toLocaleDateString(),
      column: true,
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
  ActionComponent: <Button className="sticky top-0">Yatırım yap</Button>,
};
export const defaultDataForSectionLayout = [
  {
    id: "project-summary",
    name: "Project Summary",
    value: (
      <div className="h-screen">
        <DetailsCard variant="full-page" cardProps={defaultProps1} />
      </div>
    ),
  },
  {
    id: "about-the-project-0",
    name: "About The Project",
    value: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus.
        Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec
        facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget
        sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh
        erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis.
        Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt,
        quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec
        vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem
        condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales
        leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam
        fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor
        nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id
        lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis.
        Cras fringilla elementum ipsum sed tristique. Donec elementum libero a
        purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque
        sit amet feugiat. Vivamus ac ante ligula. Phasellus suscipit mollis elit
        et aliquet. Curabitur elit velit, gravida non odio eu, elementum
        facilisis purus. Vestibulum accumsan risus eget neque blandit sodales.
        Praesent velit urna, faucibus id lacus non, gravida finibus sapien.
        Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum,
        gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu
        tortor et, lacinia consequat elit.Praesent sit amet quam et dolor
        dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris
        lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut
        pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id
        laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante
        molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut
        tempor. Integer dictum faucibus elementum. Praesent tristique lorem a
        massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac
        porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae
        vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat
        velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat
        iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique
        malesuada lobortis. Nam eget consequat risus, sed viverra quam.
        Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus.
        Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer
        lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula
        tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat.
        Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere
        eros, vitae porta est dictum condimentum.
      </>
    ),
  },
  {
    id: "documents-1",
    name: "Documents",
    value: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus.
        Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec
        facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget
        sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh
        erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis.
        Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt,
        quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec
        vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem
        condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales
        leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam
        fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor
        nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id
        lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis.
        Cras fringilla elementum ipsum sed tristique. Donec elementum libero a
        purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque
        sit amet feugiat. Vivamus ac ante ligula. Phasellus suscipit mollis elit
        et aliquet. Curabitur elit velit, gravida non odio eu, elementum
        facilisis purus. Vestibulum accumsan risus eget neque blandit sodales.
        Praesent velit urna, faucibus id lacus non, gravida finibus sapien.
        Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum,
        gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu
        tortor et, lacinia consequat elit.Praesent sit amet quam et dolor
        dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris
        lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut
        pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id
        laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante
        molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut
        tempor. Integer dictum faucibus elementum. Praesent tristique lorem a
        massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac
        porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae
        vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat
        velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat
        iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique
        malesuada lobortis. Nam eget consequat risus, sed viverra quam.
        Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus.
        Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer
        lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula
        tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat.
        Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere
        eros, vitae porta est dictum condimentum.
      </>
    ),
  },
  {
    id: "team-2",
    name: "Team",
    value: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel
        ultrices sapien. Maecenas lobortis elementum sapien, sed volutpat lacus.
        Vivamus vitae erat mi. Suspendisse vestibulum turpis libero. Donec
        facilisis quam in magna tempus, quis bibendum diam blandit. Nulla eget
        sem gravida, hendrerit tortor sed, laoreet tortor. Donec vitae nibh
        erat. Proin faucibus vulputate nunc, id feugiat justo volutpat quis.
        Aliquam erat volutpat.Aliquam faucibus, turpis in rhoncus tincidunt,
        quam nisi rutrum metus, ac gravida erat nulla suscipit elit. Donec
        vehicula dolor ut metus semper, et cursus dui eleifend. Duis vitae sem
        condimentum, placerat turpis eget, mollis quam. Morbi convallis sodales
        leo, a porta leo sagittis in. Curabitur dignissim vehicula faucibus. Nam
        fringilla velit a lectus accumsan laoreet. Donec sit amet porttitor
        nibh.Donec pretium placerat ipsum, eget tempor tellus. In pulvinar id
        lacus sit amet molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse bibendum orci et erat volutpat facilisis.
        Cras fringilla elementum ipsum sed tristique. Donec elementum libero a
        purus laoreet, viverra rutrum dolor pellentesque. Duis varius et neque
        sit amet feugiat. Vivamus ac ante ligula. Phasellus suscipit mollis elit
        et aliquet. Curabitur elit velit, gravida non odio eu, elementum
        facilisis purus. Vestibulum accumsan risus eget neque blandit sodales.
        Praesent velit urna, faucibus id lacus non, gravida finibus sapien.
        Curabitur pretium orci vitae commodo convallis. Sed non lacus bibendum,
        gravida neque sit amet, scelerisque ante. Cras velit massa, venenatis eu
        tortor et, lacinia consequat elit.Praesent sit amet quam et dolor
        dapibus rhoncus. Ut vel purus nec velit gravida dapibus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec viverra velit odio, vel efficitur lorem pharetra vel. Mauris
        lacinia libero risus, posuere vehicula dui venenatis eget. Quisque ut
        pulvinar ligula, id dignissim ipsum. Vivamus arcu erat, consectetur id
        laoreet sit amet, pharetra eget ligula. Morbi fringilla orci et ante
        molestie, quis fermentum turpis posuere. Nam hendrerit eleifend dolor ut
        tempor. Integer dictum faucibus elementum. Praesent tristique lorem a
        massa dignissim, vitae rutrum nunc porta. Integer elementum lacus ac
        porttitor posuere. Donec auctor in massa et gravida. Phasellus vitae
        vehicula nibh. Ut elit mauris, volutpat hendrerit ex at, maximus feugiat
        velit.Phasellus ultrices, lorem et malesuada lobortis, lacus erat
        iaculis nunc, eu ultricies eros urna vitae lorem. Pellentesque tristique
        malesuada lobortis. Nam eget consequat risus, sed viverra quam.
        Curabitur rutrum nibh nec magna eleifend, ut pellentesque tellus luctus.
        Donec porta eget felis ac faucibus. Fusce vel laoreet mi. Integer
        lacinia vehicula lorem. Sed nec efficitur dui. Quisque vehicula
        tincidunt tempus. Praesent elementum enim euismod ex gravida feugiat.
        Proin ullamcorper eu neque eu vulputate. Praesent hendrerit posuere
        eros, vitae porta est dictum condimentum.
      </>
    ),
  },
];
export default function Page() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    "about-the-project-0"
  );
  return (
    <ScrollArea className="relative">
      <div className="flex flex-col gap-12">
        <SectionLayout
          sections={defaultDataForSectionLayout}
          activeSectionId={activeSectionId}
          setActiveSectionId={setActiveSectionId}
          openOnNewPage={false}
        />
      </div>
    </ScrollArea>
  );
}
