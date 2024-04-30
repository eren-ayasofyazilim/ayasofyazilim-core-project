"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { UserProvider } from "./user";
import AuthSession from "./auth";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const params = useParams();

  const lang = params?.lang?.toString() || "en";
  return (
    <div>
      <AuthSession>
        <ConfigProvider>
          <TooltipProvider>
            <UserProvider>
              <LocaleProvider lang={lang}>{children}</LocaleProvider>
            </UserProvider>
          </TooltipProvider>
        </ConfigProvider>
      </AuthSession>
    </div>
  );
}
