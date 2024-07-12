"use client";

import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirmation-modal";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postBacker, postIndividual, putBacker } from "../actions";
import { formSchema } from "../data";
import { onDeleteClick } from "../page";

function initBackerData(backer: any) {
  const data = {
    telephone: backer.telephone,
    address: backer.address,
    generalInformation: {
      name: [backer.name],
      emailAddress: backer.emailAddress,
    },
  };
  return data;
}
export function BackerForm({
  formType,
  backer,
  profileId,
}: {
  formType: string;
  backer: any;
  profileId: string;
}) {
  const backerData = initBackerData(backer);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();
  const [confirmDialogContent, setConfirmDialogContent] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    title: "",
    description: "",
    onConfirm: () => undefined,
  });
  const functionTypes: Record<string, any> = {
    individual: {
      post: postIndividual,
      put: putBacker,
    },
    organization: {
      post: postBacker,
      put: putBacker,
    },
  };
  function submitFormData(formData: any) {
    if (profileId === "new") {
      functionTypes[formType].post(formData);
    } else {
      functionTypes[formType].put(profileId, formData);
    }
  }
  function handleDeleteBacker(_backer: any) {
    setConfirmDialogContent({
      title: "Profili Sil",
      description: `"${_backer.name}" isimli profili silmek istediğinize emin misiniz?`,
      onConfirm: () => {
        onDeleteClick(_backer.backerId).then(() => {
          router.back();
        });
        setIsConfirmDialogOpen(false);
      },
    });
    setIsConfirmDialogOpen(true);
  }
  return (
    <>
      <div className="flex justify-end flex-row mb-2">
        {profileId !== "new" && (
          <Button
            onClick={() => {
              handleDeleteBacker(backer);
            }}
            variant="outline"
          >
            Profili Sil
          </Button>
        )}
      </div>

      <ScrollArea className="w-full">
        <ScrollBar forceMount />
        <div className="max-h-[500px]">
          <AutoForm
            // id="backer-form-new"
            className="pb-10"
            formSchema={formSchema[formType]}
            onSubmit={(formData) => {
              submitFormData(formData);
            }}
            values={backerData}
          >
            <AutoFormSubmit>
              <>Kaydet</>
            </AutoFormSubmit>
          </AutoForm>
        </div>
      </ScrollArea>

      <ConfirmDialog
        description={confirmDialogContent.description}
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
        }}
        onConfirm={confirmDialogContent.onConfirm}
        title={confirmDialogContent.title}
      />
    </>
  );
}
