"use client";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
    SectionLayout,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBaseLink } from "src/utils";

interface LayoutProps {
    children: JSX.Element;
}

const pageHeader: Record<string, any> = {
    merchants: {
        title: "Satıcılar",
        description:
            "Satıcıları buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
        link: "company/merchants",
    },
    refund_points: {
        title: "Iade Puanları",
        description:
            "İade puanlarını buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
        link: "company/merchants",
    },
    customs: {
        title: "Temsilciler",
        description:
            "Temsilcileri buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
        link: "company/merchants",
    },
    tax_free: {
        title: "Vergi Dönuşümleri",
        description:
            "Vergi dönuşümlerini buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
        link: "company/merchants",
    },
    tax_offices: {
        title: "Vergi Ofisleri",
        description:
            "Vergi ofislerini buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    },
};

export default function Layout({ children }: LayoutProps): JSX.Element {
    const pathname = usePathname();
    const path = pathname.split("en/app/admin/")[1];

    return (
        <div>
            <PageHeader
                description={
                    pageHeader[path]?.description ||
                    "Page description"
                }
                title={
                    pageHeader[path]?.title || "Page title"
                }
            />
            <SectionLayout
                defaultActiveSectionId={path}
                linkElement={Link} 
                sections={
                    [
                        {
                            id: "details",
                            name: "Details",
                            link: getBaseLink("app/admin/details", true),
                        },
                        {
                            id: "add",
                            name: "add",
                            link: getBaseLink("app/admin/details/add", true),
                        },
                        {
                            id: "id",
                            name: "id",
                            link: getBaseLink("app/admin/details/id", true),
                        }
                    ]
                }
                vertical
            >
                <div className="w-full p-5 overflow-auto h-full flex-1">
                    {children}
                </div>
            </SectionLayout>
        </div>
    );
}
