"use client";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import DetailsCard, {
  IDetailsCardProps,
} from "@repo/ayasofyazilim-ui/organisms/details-card";

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
  cardTagVariant: "success",
  BeforeCardContentComponent: (
    <Progress value={20} containerClassName="h-3" className={`bg-green-300`} />
  ),
};

export default async function Page() {
  // const client = getProjectServiceClient();
  // const projectData = await client.project.getApiProjectServiceProject();
  // if (!projectData) {
  //   return <div>No data</div>;
  // }

  // return (
  //   <div className="bg-zinc-800 flex flex-auto flex-col justify-center items-start h-screen text-white text-xl">
  //     <h1 className="text-2xl">Projects:</h1>
  //     <br />
  //     <div>{projectData?.items && JSON.stringify(projectData.items[0])}</div>
  //   </div>
  // );
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-5 mt-10">
        <DetailsCard {...defaultProps1} />
        <DetailsCard {...defaultProps1} />
        <DetailsCard {...defaultProps1} />
      </div>
    </>
  );
}
