import { Button } from "@/components/ui/button";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import Link from "next/link";

export default function profileLayout({ children, type }) {
    return (
        <div className="container flex flex-col m-4 max-h-full">
                {children}
        </div>
    )
}