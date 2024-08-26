"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ayasofyazilim-ui/atoms/avatar";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ayasofyazilim-ui/atoms/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import LanguageSelector from "../../language-selector";
import { cn, ResourceResult } from "../../utils";

export type MenuLinkItem = {
  key?: string;
  title: string;
  href: string;
  icon?: JSX.Element;
};

export type ProfileMenuProps = {
  className?: string;
  user: any;
  resources?: ResourceResult;
  imageURL?: string;
  menuLinks?: MenuLinkItem[];
  signOutFunction?: any;
  languageData?: any;
  cultureName?: string;
  baseLink: string;
  minNavbar?: boolean;
};
export function ProfileMenu({
  menuLinks,
  user,
  signOutFunction,
  className,
  imageURL,
  resources,
  languageData,
  cultureName,
  baseLink,
}: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex h-auto w-full items-center gap-3  rounded-md  px-3 py-1 transition-shadow duration-500 hover:drop-shadow-sm focus-visible:ring-0",
            className,
          )}
        >
          <Avatar>
            <AvatarImage src={imageURL ?? ""} />
            <AvatarFallback>
              {user.userName?.substring(0, 2) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-sm font-semibold leading-none">{user.name}</h3>
            <h6 className="text-muted-foreground text-xs leading-none">
              {user.email}
            </h6>
          </div>
          <ChevronDown className="w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{languageData.MyAccount}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>{languageData.ChangeProfile}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{user.name}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>{languageData.Add}...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          {menuLinks?.map((link) => (
            <Link key={link.title} href={link.href}>
              <DropdownMenuItem className="cursor-pointer">
                {link.icon}
                <span>{link.title}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        {menuLinks && menuLinks.length > 0 && <DropdownMenuSeparator />}
        {signOutFunction && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              signOutFunction();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{languageData.LogOut}</span>
          </DropdownMenuItem>
        )}
        {cultureName && (
          <>
            <DropdownMenuSeparator />
            <div className="mx-auto w-6 cursor-pointer px-0 py-1">
              <LanguageSelector
                baseLink={baseLink}
                cultureName={cultureName}
                menuAlign="end"
                resources={resources}
              />
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
