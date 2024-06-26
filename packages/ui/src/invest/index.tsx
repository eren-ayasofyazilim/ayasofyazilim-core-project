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

export type InvestProps = {
  name: string;
  description: string;
  investmentDetails?: Array<{
    name: string;
    value: string | number | null | undefined;
  }>;
  images: Array<string>;
  onInvest?: () => void;
  user: any;
  resources: any;
};
export type ProfileProps = Array<{
  name: string;
  value: string;
}>;

export default function Invest({
  name,
  description,
  investmentDetails,
  images,
  user,
  resources,
  onInvest,
}: InvestProps): JSX.Element {
  const languageData = {
    Login: resources?.AbpForDeploy?.texts?.["Login"] || "Login",
    Invest: resources?.AbpForDeploy?.texts?.["Invest"] || "Invest",
    YouAreInvestingIn:
      resources?.AbpForDeploy?.texts?.["YouAreInvestingIn"] ||
      "You are investing in",
    InvestingProfile:
      resources?.AbpForDeploy?.texts?.["InvestingProfile"] ||
      "Investing Profile",
    CashValue: resources?.AbpForDeploy?.texts?.["CashValue"] || "Cash Value",
    AdditionalFundRate:
      resources?.AbpForDeploy?.texts?.["AdditionalFundRate"] ||
      "Additional Fund Rate",
    FundNominalAmount:
      resources?.AbpForDeploy?.texts?.["FundNominalAmount"] ||
      "Fund Nominal Amount",
    FundableAmount:
      resources?.AbpForDeploy?.texts?.["FundableAmount"] || "Fundable Amount",
    QualifiedFundRate:
      resources?.AbpForDeploy?.texts?.["QualifiedFundRate"] ||
      "Qualified Fund Rate",
    FundCollectionType:
      resources?.AbpForDeploy?.texts?.["FundCollectionType"] ||
      "Fund Collection Type",
    ProjectRemaining:
      resources?.AbpForDeploy?.texts?.["ProjectRemaining"] ||
      "Project Remaining",
    InvestmentAmount:
      resources?.AbpForDeploy?.texts?.["InvestmentAmount"] ||
      "Investment Amount",
    InvestmentMethod:
      resources?.AbpForDeploy?.texts?.["InvestmentMethod"] ||
      "Investment Method",
    YouCanInvestWithCreditCardOrEft:
      resources?.AbpForDeploy?.texts?.["YouCanInvestWithCreditCardOrEft"] ||
      "You can invest with credit card or EFT",
    CreditCard: resources?.AbpForDeploy?.texts?.["CreditCard"] || "Credit Card",
    Eft: resources?.AbpForDeploy?.texts?.["Eft"] || "EFT",
    "IHaveReadAndAccept {0}":
      resources?.AbpForDeploy?.texts?.["IHaveReadAndAccept {0}"] ||
      "I have read and accept {0}",
    RiskDeclarationForm:
      resources?.AbpForDeploy?.texts?.["RiskDeclarationForm"] ||
      "Risk Declaration Form",
  };
  return (
    <div className="bg-gray-200 w-full h-screen flex items-center" id="invest">
      <div className="grid grid-cols-3 justify-center gap-4 p-4 container">
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
                      <Link href="/login">{languageData.Login}</Link>
                    </Button>
                  }
                  titleClassName="text-md text-left"
                />
              ) : (
                Object.keys(user).map((key: string) => {
                  if (
                    key !== "userName" &&
                    key !== "email" &&
                    key !== "name" &&
                    key !== "surname" &&
                    key !== "phoneNumber"
                  )
                    return;
                  return (
                    <CardTable
                      containerClassName="border-b dashed border-gray-50 px-0"
                      key={key}
                      title={
                        resources?.AbpAccount?.texts?.[
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
              subLabel="1₺ = 1 Pay"
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
                    <SelectValue placeholder="Ödeme yöntemi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="credit-card">
                        {languageData.CreditCard}
                      </SelectItem>
                      <SelectItem value="eft">{languageData.Eft}</SelectItem>
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
                    )}
                  </label>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="terms-2" />
                  <label
                    htmlFor="terms-2"
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {replacePlaceholders(
                      resources?.ProjectService?.texts?.[
                        "iHaveReadAndAccept {0}"
                      ] ?? "",
                      [
                        {
                          holder: "{0}",
                          replacement: (
                            <Button
                              variant={"link"}
                              className="text-xs p-0 h-0"
                            >
                              {
                                resources?.ProjectService?.texts?.[
                                  "projectInformationForm"
                                ]
                              }
                            </Button>
                          ),
                        },
                      ]
                    )}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms-3" />
                  <label
                    htmlFor="terms-3"
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {
                      resources?.ProjectService?.texts?.[
                        "iAcknowledgeThatTheInvestmentPlatformDoesNotGiveInvestmentAdvice"
                      ]
                    }
                  </label>
                </div> */}
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
    </div>
  );
}
