import { ReactNode } from "react";
import "./../../globals.css";
import { Button } from "@/components/ui/button";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return (
    <>
    <Button>Test</Button>
    {children}
    </>
  );
}
