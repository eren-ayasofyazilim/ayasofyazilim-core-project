"use client";
import { Card, CardContent } from "@/components/ui/card";
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

  const pageBack = getBaseLink(
    `/crm/${params.data}/${params.id}`,
    true,
    params.lang,
    true,
    "admin",
  );
  return (
    <>
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
      <div className="hidden" id="page-title">
        {languageData["SubCompany.New"]}
      </div>
      <div className="hidden" id="page-description">
        {languageData["SubCompany.New"]}
      </div>
      <div className="hidden" id="page-back-link">
        {pageBack}
      </div>
    </>
  );
}
