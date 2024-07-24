"use client";
import React from "react";
import type { Step } from "@repo/ayasofyazilim-ui/organisms/form-stepper";
import FormStepper from "@repo/ayasofyazilim-ui/organisms/form-stepper";
import { z } from "zod";
import { Card } from "@/components/ui/card";

export default function Page() {
  const steps: Step[] = [
    {
      title: "Traveller information",
      autoformArgs: {
        formSchema: z.object({
          documentNumber: z.string(),
          name: z.string(),
          lastName: z.string(),
          residency: z.string(),
          nationality: z.string(),
        }),
      },
    },
    {
      title: "Tax information",
      autoformArgs: {
        formSchema: z.object({
          storeName: z.string(),
          facturaNo: z.string(),
          taxes: z.array(
            z.object({
              taxName: z.string(),
              taxAmount: z.number(),
            }),
          ),
        }),
        fieldConfig: {
          all: {
            withoutBorder: false,
            inputProps: {
              showLabel: true,
              className: "w-full",
            },
          },
          taxes: {
            withoutBorder: false,
            inputProps: {
              showLabel: true,
              className: "bg-red-500",
            },
          },
        },
      },
    },
  ];

  return (
    <div className="w-full mx-auto max-w-3xl">
      <div className="flex flex-col items-center justify-start mb-8 w-full">
        <div className="flex-row p-4 w-10/12 ">
          <Card className="cantainer p-6 h-full">
            <FormStepper steps={steps} />
          </Card>
        </div>
      </div>
    </div>
  );
}
