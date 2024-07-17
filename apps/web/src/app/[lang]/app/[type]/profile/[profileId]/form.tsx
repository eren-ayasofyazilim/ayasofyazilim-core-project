"use client";

import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirmation-modal";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postBacker, postIndividual, putBacker } from "../actions";
import { formSchema } from "../data";
import { onDeleteClick } from "../page";

function initBackerData(backer: any) {
  const data = {
    address: backer.address,
    generalInformation: {
      name: backer.name,
      emailAddress: backer.emailAddress,
      phoneNumber: backer?.localNumber
        ? `+${backer?.areaCode}${backer?.localNumber}`
        : "+90",
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
  const isPhoneValid = (phone: string) => {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  function submitFormData(formData: any) {
    const isValid = isPhoneValid(formData.generalInformation.phoneNumber);
    if (!isValid) {
      return;
    }
    //PUT servisi henüz hazır değil
    const submitData = {
      name: formData.generalInformation.name,
      emailAdress: formData.generalInformation.emailAddress,
      telephones: [
        {
          areaCode: formData.generalInformation.phoneNumber
            .split("+")[1]
            .substring(0, 3),
          localNumber: formData.generalInformation.phoneNumber
            .split("+")[1]
            .substring(3),
        },
      ],
      address: formData.address,
    };

    if (profileId === "new") {
      functionTypes[formType].post(submitData);
    } else {
      functionTypes[formType].put(profileId, submitData);
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
            className="pb-10"
            fieldConfig={{
              generalInformation: {
                phoneNumber: {
                  fieldType: "phone",
                  inputProps: {
                    showLabel: true,
                  },
                },
              },
            }}
            formSchema={formSchema[formType]}
            onSubmit={(formData) => {
              submitFormData(formData);
            }}
            showInRow
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
