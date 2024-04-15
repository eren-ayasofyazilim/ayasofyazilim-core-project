"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { JSXElementConstructor, ReactElement, useEffect } from "react";

const navbarItems = [
  {
    name: "General",
    path: undefined,
  },
  {
    name: "Test",
    path: "test",
  },
];
function isPathValid(path: string) {
  return path === "" || path === "test" || path === undefined;
}
type LayoutProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const path = pathname.split("profile/")?.[1];
  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("/profile");
    }
  }, []);
  return (
    <div className="bg-muted/40 h-screen pt-5">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          {navbarItems.map((item) => (
            <Link
              href={"/profile/" + (item.path ?? "")}
              className={item.path === path ? "font-semibold text-primary" : ""}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
