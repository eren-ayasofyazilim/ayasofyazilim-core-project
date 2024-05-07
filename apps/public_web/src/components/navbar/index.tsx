"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Navigation from "@repo/ayasofyazilim-ui/molecules/navigation-menu";
import { useConfig } from "src/providers/configuration";
import { useUser } from "src/providers/user";

export default function Navbar({
  menuAlign,
}: {
  menuAlign?: "start" | "center" | "end";
}): JSX.Element {
  const { user, getUser } = useUser();
  const { config, setConfig } = useConfig();
  const navigationLinks = [
    {
      href: "/docs",
      text: "Documentation",
    },
    {
      href: "/blog",
      text: "Blog",
    },
    {
      href: "/blog",
      text: "Blog",
    },
    {
      href: "/blog",
      text: "Blog",
    },
    {
      href: "/blog",
      text: "Blog",
    },
    {
      title: "List",
      submenu: [
        {
          title: "Tooltip",
          href: "/docs/primitives/tooltip",
          description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
        {
          title: "Tooltip",
          href: "/docs/primitives/tooltip",
          description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
        {
          title: "Tooltip",
          href: "/docs/primitives/tooltip",
          description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
      ],
    },
    {
      href: "/about",
      text: "About",
    },
  ];

  return (
    <div className="bg-white p-4">
      <div className="container flex gap-4 justify-between flex-wrap">
        <span className="tracking-widest text-2xl font-bold">UPWITHCROWD</span>

        <Menubar className="border-0 h-full shadow-none p-none">
          <MenubarMenu>
            <MenubarTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary">
              Invest
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="hover:text-primary focus:text-primary">
                Investment opportunities
              </MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary">
                  Invest in companies
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem className="hover:text-primary focus:text-primary">
                    Equity investments
                  </MenubarItem>
                  <MenubarItem className="hover:text-primary focus:text-primary">
                    Fixed income
                  </MenubarItem>
                  <MenubarItem className="hover:text-primary focus:text-primary">
                    Renewable Energy
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary">
              Raise funding
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="hover:text-primary focus:text-primary data-[state=open]:text-primary">
              Knowledge
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="hover:text-primary focus:text-primary">
                Academy
              </MenubarItem>
              <MenubarItem className="hover:text-primary focus:text-primary">
                Blog
              </MenubarItem>
              <MenubarItem className="hover:text-primary focus:text-primary">
                Newsletter
              </MenubarItem>
              <MenubarItem className="hover:text-primary focus:text-primary">
                Support Center
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="hover:text-primary focus:text-primary active:text-primary  data-[state=open]:text-primary">
              About us
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}
