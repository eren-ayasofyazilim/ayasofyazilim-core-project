"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import { SectionNavbarBase } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Form({ backerProfiles }: any) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="m-auto">
      <SectionNavbarBase
        activeSectionId="default"
        navContainerClassName="shadow-none border"
        sections={[{ id: "default", name: "Yatırımcı Profillerim" }]}
        showContentInSamePage
        showScrollArea={false}
      />
      <div className="flex flex-col bg-white">
        {isLoading ? (
          <Spinner
            className="stroke-purple-900"
            containerClassName="border h-20"
            fullScreen={false}
            variant="transparent"
          />
        ) : (
          backerProfiles?.map((i: any) => (
            <div
              className="border flex flex-row px-5 py-3 items-center"
              key={i.backerId}
            >
              <div className="bg-gray-100 rounded-md border p-2">{i.icon}</div>
              <div className="ml-4">
                <div>{i.name}</div>
                <div className="text-sm text-muted-foreground">
                  {i.legalStatusCode}
                </div>
              </div>
              <div className="ml-auto">
                <Link href={`profile/${i.backerId}`}>
                  <Button
                    onClick={() => {
                      setIsLoading(true);
                    }}
                    variant="link"
                  >
                    <Edit className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
