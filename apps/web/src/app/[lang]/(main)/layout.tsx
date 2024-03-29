'use client';
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import Mainlayout from "@repo/ayasofyazilim-ui/templates/mainlayout";
import "./../../globals.css";

export default async function Layout({
    children,
}: {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
}) {
    return (
        <Mainlayout>
            {children}
        </Mainlayout>
    );
}
