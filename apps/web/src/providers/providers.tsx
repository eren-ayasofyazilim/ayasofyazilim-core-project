"use client";
import { useParams } from "next/navigation";
import { LocaleProvider } from "./locale";
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
      <TooltipProvider>
        <LocaleProvider lang={lang}>{children}</LocaleProvider>
      </TooltipProvider>
    </div>
  );
}
