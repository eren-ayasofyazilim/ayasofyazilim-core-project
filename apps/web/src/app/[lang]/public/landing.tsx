"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import { BentoGrid, BentoGridItem } from "@repo/ui/upwithcrowd/bento-grid";
import { Brands } from "@repo/ui/upwithcrowd/brands";
import { FlipWords, Hero } from "@repo/ui/upwithcrowd/hero";
import ProjectCard from "@repo/ui/upwithcrowd/project/project-card";
import { Tabs } from "@repo/ui/upwithcrowd/tabs";
import { ProjectStatusEnums } from "src/enums/project";

const BrandList = [
  {
    title: "beets&roots",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630feda72991.webp",
  },
  {
    title: "cargaroo",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff20b3ac2.webp",
  },
  // {
  //   title: "heeros",
  //   href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff2e18167.webp",
  // },
  {
    title: "tr-gov",
    href: "	https://cdn.e-devlet.gov.tr/downloads/kurumsal-kimlik/logo/e-devlet-logo.png",
  },
  {
    title: "beets&roots",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630feda72991.webp",
  },
  {
    title: "cargaroo",
    href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff20b3ac2.webp",
  },
  // {
  //   title: "heeros",
  //   href: "https://valu.com.tr/uploads/stakeholders/stakeholder-logo-6630ff2e18167.webp",
  // },
  {
    title: "tr-gov",
    href: "	https://cdn.e-devlet.gov.tr/downloads/kurumsal-kimlik/logo/e-devlet-logo.png",
  },
];
const tabs = [
  {
    title: "Yatırımcı yol haritası",
    value: "Investor",
    content: (
      <div className="w-full overflow-hidden relative h-full  p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-100 flex flex-col justify-between items-center">
        <p>Yatırımcı</p>
        <div className="grid gap-12">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                alt=""
                className="w-16 h-full mt-[-30px]"
                src="https://valu.com.tr/assets/images/wm-ent-step-1.webp"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Kayıt ol</h1>
              <p className="text-sm font-normal">
                e-Devlet onaylı hesabınız ile kayıt işlemlerini tamamlayın.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                alt=""
                className="w-16 h-full mt-[-30px]"
                src="https://valu.com.tr/assets/images/wm-inv-step-2.webp"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Girişim bul</h1>
              <p className="text-sm font-normal">
                Yatırım yapmak istediğiniz girişimleri belirleyin.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                alt=""
                className="w-16 h-full mt-[-30px]"
                src="https://valu.com.tr/assets/images/wm-ent-step-3.webp"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Yatırım yap</h1>
              <p className="text-sm font-normal">
                Yatırımlarınızı Takasbank ve MKK güvencesiyle yapın.
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full max-w-sm">Yatırımcı ol</Button>
      </div>
    ),
  },
  {
    title: "Girişimci yol haritası",
    value: "Entrepreneur",
    content: (
      <div className="w-full overflow-hidden relative h-full  p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-100 flex flex-col justify-between items-center">
        <p>Girişimci</p>
        <div className="grid gap-12">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                alt=""
                className="w-16 h-full mt-[-30px]"
                src="https://valu.com.tr/assets/images/wm-ent-step-1.webp"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Kayıt ol</h1>
              <p className="text-sm font-normal">
                e-Devlet onaylı hesabınız ile kayıt işlemlerini tamamlayın.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                alt=""
                className="w-16 h-full mt-[-30px]"
                src="https://valu.com.tr/assets/images/wm-ent-step-2.webp"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Girişimci formu</h1>
              <p className="text-sm font-normal">
                Projenizi özetleyen bilgi formunu doldurun belgelerinizi
                yükleyin.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div className="w-20 h-16 rounded-md overflow-visible relative bg-white flex items-center justify-center">
              <img
                alt=""
                className="w-16 h-full mt-[-30px]"
                src="https://valu.com.tr/assets/images/wm-ent-step-3.webp"
              />
            </div>
            <div className="grid gap-0 text-black">
              <h1 className="text-2xl font-bold">Yatırım turu</h1>
              <p className="text-sm font-normal">
                {`Onaylama sürecinden sonra projeniz UPWITHBURSA'da listelenir.`}
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full max-w-sm">Girişimci ol</Button>
      </div>
    ),
  },
];
const items = [
  {
    title: "Az Parayla Yatırım Yapmak (2024)",
    description: (
      <span className="text-sm w-full">
        2024 yılında artık çalışan çalışmayan, alt, orta veya üst gelir
        gruplarına mensup her sınıftan insanlar ek gelir kaynakları yaratmanın
        yollarını aramaktadır.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/thumbcache/homepage_blog/uploads/blogs/blog-6662d10e87010.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Finans terimleri sözlüğü",
    description: (
      <span className="text-sm w-full">
        Finans dünyası, özellikle yeni başlayanlar için karmaşık gelebilecek
        terimler ve bazı yabancı kelimeler içermektedir.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6662cf2c5b936.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Küçük Yatırımcı Neye Yatırım Yapmalı?",
    description: (
      <span className="text-sm w-full">
        Küçük yatırımcı, sınırlı yatırım sermayesine sahip olan bireyleri
        tanımlamak amacıyla kullanılan bir terimdir.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6662cbc4f1975.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Temettü Nedir? Temettü Nasıl Hesaplanır?",
    description: (
      <span className="text-sm w-full">
        Yatırım dünyasına yeni adım atan herkesin sıklıkla karşılaştığı
        terimlerden biri olan temettü, yatırım kararlarınızı verirken dikkate
        almanız gereken oldukça önemli bir kavramdır.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-665d874515335.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Pasif Gelir Nedir? Nasıl Elde Edilir?",
    description: (
      <span className="text-sm w-full">
        Pasif gelir ne demek? Pasif gelir, zamanınızı daha özgür bir şekilde
        yönetmenizi ve finansal bağımsızlığınızı artırmanızı sağlayan, sürekli
        bir çaba gerektirmeyen gelir türüdür.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6630fd88724bf.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
  {
    title: "Kitle Fonlaması Nedir?",
    description: (
      <span className="text-sm w-full">
        Günümüzde, yenilikçi fikirlerin ve projelerin hayata geçirilmesi için
        gereken finansal desteğe ulaşmak her zaman kolay olmayabiliyor.
        Geleneksel finansman yöntemleri bazen yeterli esnekliği ve erişimi
        sunamazken, kitle fonlama, bu boşluğu dolduran modern ve dinamik bir
        alternatif olarak öne çıkıyor.
      </span>
    ),
    header: (
      <div className="w-full h-full flex rounded-md overflow-hidden">
        <img
          alt=""
          className="h-full w-auto"
          src="https://valu.com.tr/uploads/blogs/blog-6630fd6b43c03.webp"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className="flex gap-2">
        <Badge variant="secondary">Yatırım</Badge>
      </div>
    ),
  },
];

export default function Page({
  config,
  fundableProjects,
  languageData,
  projectURL,
}: {
  config: any;
  fundableProjects: any;
  languageData: any;
  projectURL: string;
}): JSX.Element {
  return (
    <div className="w-full bg-white p-0 ">
      <Hero config={config} variant="stripe" />
      <Brands brands={BrandList} />
      <div
        className="w-full h-[200px]"
        style={{
          backgroundImage: `url(${config.images.second})`,
        }}
      />
      <div className="container h-full my-20">
        <div className="flex flex-row gap-3 justify-center">
          {fundableProjects?.map((project: any) => (
            <ProjectCard
              ProjectStatusEnums={ProjectStatusEnums}
              actionText={languageData.InvestNow}
              key={project.id}
              languageData={languageData}
              project={project}
              projectURL={`${projectURL}/${project.id}`}
              showProgress
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-50 w-full overflow-hidden">
        <div className="container grid grid-cols-2 justify-center gap-6">
          <div className="flex flex-col gap-6 justify-center h-full">
            <h1 className="text-5xl font-bold">
              {/* <div className="text-black">
                UPWITH<span className="text-primary">{config.logo}</span>
              </div>{" "} */}
              <img alt="" src={config.logo} />
              aracılığıyla girişim şirketlerinde hisse sahibi olabilirsiniz.
            </h1>
            <p className="text-l">
              Şirketlere yatırım yapmak hiç bu kadar kolay olmamıştı. Hemen
              başlayın, şirketlere destek olun, etki yaratın.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Bilgi al</Button>
              <Button>Yatırım yap</Button>
            </div>
          </div>
          <div className="h-full">
            <img
              alt=""
              className="max-h-[500px]"
              src="https://kapilendo-public.imgix.net/files/undefined/40740ec4-1931-44c8-8b9b-e7bcc383f732_funded_projects_invesdor_EN.png?w=1028&auto=format,compress&fit=crop&crop=right&min-h=580"
            />
          </div>
        </div>
      </div>
      <h3 className="text-5xl font-bold text-center w-full max-w-4xl mx-auto my-20 flex  items-center gap-0">
        {/* UPWITH{config.logo} ile */}
        <img alt="" className="mr-4" src={config.logo} /> ile
        <FlipWords
          className="text-black min-w-[230px]"
          words={["yatırımcı", "girişimci"]}
        />{" "}
        olabilirsiniz.
      </h3>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start col-span-2 container">
        <Tabs
          activeTabClassName="bg-primary [&~*]:text-white rounded-none"
          containerClassName="mt-0 justify-center"
          contentClassName="mt-0"
          tabClassName="bg-slate-50 text-black rounded-none"
          tabs={tabs}
        />
      </div>
      <div className="bg-slate-50 mt-20 grid justify-center relative pb-60">
        <h3 className="text-5xl font-bold text-center mt-[-20px] uppercase absolute w-full z-10">
          {config.full} Blog
        </h3>
        <p className="w-full text-center mt-16 text-xl z-10">
          Gündeme ve fonlanan projelere dair bilgiler için Blog’u takip edin.
        </p>
        <BentoGrid className="container py-16 md:auto-rows-[20rem] px-0 z-10">
          {items.map((item, i) => (
            <BentoGridItem
              className={cn("[&>p:text-lg]", item.className)}
              description={item.description}
              header={item.header}
              icon={item.icon}
              key={i}
              title={item.title}
            />
          ))}
        </BentoGrid>
        <div className="flex absolute top-60 z-0 w-full opacity-10 grayscale hidden">
          <img alt="" className="w-full" src={config.images.footer} />
        </div>
      </div>
    </div>
  );
}
