"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ayasofyazilim-ui/atoms/avatar";
import { Button } from "@repo/ayasofyazilim-ui/atoms/button";
import { Checkbox } from "@repo/ayasofyazilim-ui/atoms/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ayasofyazilim-ui/atoms/select";
import { replacePlaceholders } from "@repo/ayasofyazilim-ui/lib/replace-placeholders";
import CardTable from "@repo/ayasofyazilim-ui/molecules/card-table";
import Link from "next/link";
import { InvestInput } from "../invest-input";
import React from "react";

export type InvestProps = {
  name: string;
  description: string;
  investmentDetails?: Array<{
    name: string;
    value: string | number | null | undefined;
  }>;
  onInvest?: () => void;
  user: any;
  languageData: any;
};
export type ProfileProps = Array<{
  name: string;
  value: string;
}>;

export default function Invest({
  name,
  description,
  investmentDetails,
  user,
  languageData,
  onInvest,
}: InvestProps): JSX.Element {
  return (
    <div className="w-full h-screen flex items-center" id="invest">
      <div className="border-4 grid grid-cols-3 justify-center gap-4 p-4 container">
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-white">
            <Avatar className="rounded-none w-full h-auto">
              <AvatarImage
                src="https://kapilendo-public.imgix.net/files/projects/bamboologic/8e0aa153-e311-47f9-9563-1aa44c05a3fe_01_Project-Header-1920x1080px.png?auto=compress&auto=format&maxdpr=3&w=750&fit=crop&dpr=1.5"
                className="aspect-[16/9]"
              />
              <AvatarFallback>
                <div className="w-full h-full aspect-[16/9] bg-gray-300 flex items-center justify-center">
                  <p className="text-3xl font-bold text-muted">{name}</p>
                </div>
              </AvatarFallback>
            </Avatar>
            <div className="p-4">
              <p className="text-left text-muted-foreground">
                {languageData["YouAreInvestingIn"]}
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="text-black text-xl font-bold">{name}</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <h3 className="px-4 bg-slate-700 text-white h-12 flex items-center bg-primary">
              {languageData.InvestingProfile}
            </h3>
            <div className="px-4">
              {!user ? (
                <CardTable
                  containerClassName="px-0"
                  key={"1"}
                  title={""}
                  value={
                    <Button asChild variant="link">
                      <Link href="/login">{languageData.LogIn}</Link>
                    </Button>
                  }
                  titleClassName="text-md text-left"
                />
              ) : (
                Object.keys(user)
                  .filter((i) =>
                    ["email", "name", "surname", "phoneNumber"].includes(i)
                  )
                  .map((key: string) => {
                    return (
                      <CardTable
                        containerClassName="border-b dashed border-gray-50 px-0"
                        key={key}
                        title={
                          languageData[
                            "DisplayName:" +
                              key.charAt(0).toUpperCase() +
                              key.substring(1)
                          ] ?? ""
                        }
                        value={(user as any)[key]}
                        titleClassName="text-sm font-medium text-left"
                      />
                    );
                  })
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-2 h-full">
          {investmentDetails && investmentDetails.length > 0 && (
            <div className="flex flex-col gap-4 bg-white p-4">
              {investmentDetails.map(({ name, value }) => (
                <div
                  key={name}
                  className="flex justify-between gap-4 w-full items-center"
                >
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData?.[name as keyof typeof languageData]}
                  </h3>
                  <span className="text-md font-semibold">{value}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-4 bg-white p-4 grow">
            <InvestInput
              min={0}
              max={10000000}
              value={0}
              step={1}
              label={languageData.InvestmentAmount}
              subLabel={`1₺ = 1 ${languageData.Share}`}
              inputLabel="₺"
            />
            <div className="flex gap-4 justify-between w-full items-center">
              <div className="flex flex-col gap-1 w-full flex-grow">
                <h3 className="text-sm font-semibold">
                  {languageData.InvestmentMethod}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {languageData.YouCanInvestWithCreditCardOrEft}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Select defaultValue="credit-card">
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder={languageData.InvestmentMethod} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="credit-card">
                        {languageData.CreditCard}
                      </SelectItem>
                      <SelectItem value="eft">
                        {languageData["EFTOrMoneyTransfer"]}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {replacePlaceholders(
                      languageData["IHaveReadAndAccept {0}"] ?? "",
                      [
                        {
                          holder: "{0}",
                          replacement: (
                            <Button
                              variant={"link"}
                              className="text-xs p-0 h-0"
                            >
                              {languageData.RiskDeclarationForm}
                            </Button>
                          ),
                        },
                      ]
                    ).map((i, index) => (
                      <React.Fragment key={index}>{i}</React.Fragment>
                    ))}
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms-3" />
                <label
                  htmlFor="terms-3"
                  className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {
                    languageData[
                      "IAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice"
                    ]
                  }
                </label>
              </div>
            </div>
            <Button
              className=""
              onClick={() => {
                onInvest && onInvest();
              }}
            >
              <Link className="sticky top-0" href="#invest">
                {languageData.Invest}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
