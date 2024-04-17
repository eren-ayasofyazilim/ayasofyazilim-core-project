"use client";
import { useParams } from "next/navigation";
import { LocaleProvider } from "./locale";
import { ConfigProvider } from "./configuration";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const params = useParams();

  const lang = params?.lang?.toString() || "en";
  return (
    <div>
      <ConfigProvider>
        <TooltipProvider>
          <LocaleProvider lang={lang}>{children}</LocaleProvider>
        </TooltipProvider>
      </ConfigProvider>
    </div>
  );
}
