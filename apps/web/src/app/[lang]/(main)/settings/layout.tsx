"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { JSXElementConstructor, ReactElement, useEffect } from "react";

const navbarItems = [
  {
    name: "Profil",
    path: "profile",
  },
  {
    name: "Hesap Ayarları",
    path: "test",
  },
  {
    name: "Ödeme Yöntemleri",
    path: "test2",
  },
  {
    name: "Bildirim Tercihleri",
    path: "test3",
  },
  {
    name: "İşlem Geçmişi",
    path: "test4",
  },
];
function isPathValid(path: string) {
  return path === "profile" || path === "test" || path === undefined;
}
type LayoutProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("settings/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("settings/profile");
    }
  }, []);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-3">
        <nav className="grid gap-4 text-sm text-muted-foreground pb-5 border-b md:border-0 text-center md:text-left">
          {navbarItems.map((item) => (
            <Link
              href={"/settings/" + (item.path ?? "")}
              className={item.path === path ? "font-semibold text-primary" : ""}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <>{children}</>
      </div>
    </main>
  );
}
