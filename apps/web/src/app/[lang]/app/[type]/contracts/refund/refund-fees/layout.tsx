"use client";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getResourceData } from "src/language-data/ContractService";

export default function Layout({
  children,
  params,
}: {
  children: JSX.Element;
  params: { lang: string };
}) {
  const [loading, setLoading] = useState(true);
  const [languageData, setLanguageData] = useState<Record<
    string,
    string
  > | null>(null);
  useEffect(() => {
    void getResourceData(params.lang)
      .then((data) => {
        setLanguageData(data.languageData);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  const pathname = usePathname();
  if (loading || !languageData) {
    return <div>Loading...</div>;
  }
  const activePath = pathname.split("/").at(-1) || "";

  return (
    <section>
      <HeaderByPath activePath={activePath} languageData={languageData} />
      <div className="h-full overflow-auto">{children}</div>
    </section>
  );
}
function HeaderByPath({
  activePath,
  languageData,
}: {
  activePath: string;
  languageData: Record<string, string>;
}) {
  switch (activePath) {
    case "refund-fees":
      return (
        <PageHeader
          description={languageData["RefundFees.Page.List.Title"]}
          title={languageData["RefundFees.Page.List.Description"]}
        />
      );
    case "new":
      return (
        <PageHeader
          description={languageData["RefundFees.Page.Create.Title"]}
          title={languageData["RefundFees.Page.Create.Description"]}
        />
      );
    default:
      return null;
  }
}
