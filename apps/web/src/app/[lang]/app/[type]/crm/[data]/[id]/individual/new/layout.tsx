"use client";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import Link from "next/link";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";

interface LayoutProps {
  children: JSX.Element;
  params: {
    lang: string;
    data: string;
    id: string;
  };
}

export default function Layout({ children, params }: LayoutProps) {
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData["Individuals.Description"]}
        href={getBaseLink(`/app/admin/crm/${params.data}/${params.id}`)}
        title={languageData["Individuals.Description"]}
      />
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  );
}
