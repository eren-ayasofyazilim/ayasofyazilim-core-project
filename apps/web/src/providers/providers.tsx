"use client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import AuthSession from "./auth";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from "@ayasofyazilim/saas/AccountService";

interface IProviders {
  children: JSX.Element;
  resources: {
    [
      key: string
    ]: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
  };
}
export default function Providers({ children, resources }: IProviders) {
  const params = useParams();
  const lang = params?.lang?.toString();
  if (!lang) return <></>;

  return (
    <div>
      <Toaster richColors />
      <AuthSession>
        <ConfigProvider>
          <TooltipProvider>
            <LocaleProvider resources={resources} lang={lang}>
              {children}
            </LocaleProvider>
          </TooltipProvider>
        </ConfigProvider>
      </AuthSession>
    </div>
  );
}
