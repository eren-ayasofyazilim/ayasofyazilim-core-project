"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import {
  $Volo_Abp_Account_UpdateProfileDto,
  Volo_Abp_Account_ProfileDto,
} from "@ayasofyazilim/saas/AccountService";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { updateUserProfileServer } from "action";
import { EditIcon } from "lucide-react";
import { ZodObjectOrWrapped } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/utils";
import { useEffect, useState } from "react";
import { createZodObject } from "src/utils";

const inputs: (keyof Volo_Abp_Account_ProfileDto)[] = [
  "userName",
  "email",
  "name",
  "surname",
  "phoneNumber",
];
const form = $Volo_Abp_Account_UpdateProfileDto;
const formSchema = createZodObject(form, inputs) as ZodObjectOrWrapped;

export default function ProfileForm({
  user,
}: {
  user: Volo_Abp_Account_ProfileDto | undefined;
}) {
  const [userDataForm, setUserDataForm] = useState<
    Volo_Abp_Account_ProfileDto | undefined
  >(user);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputs.filter((i) => userDataForm?.[i] !== user?.[i]).length === 0) {
      setIsSubmitDisabled(true);
      return;
    }
    setIsSubmitDisabled(false);
  }, [userDataForm]);

  function onSubmit() {
    if (isSubmitDisabled) {
      return;
    }
    setIsLoading(true);

    updateUserProfileServer(userDataForm as any).then((i) => {
      if (i.status === 200) {
        toast.success("Başarılı.");
        setIsSubmitDisabled(true);
        setIsLoading(false);
        return;
      }
      toast.error(i?.message);
      setIsSubmitDisabled(false);
      setIsLoading(false);
    });
  }

  return (
    <>
      <div className="basis-2/4 pt-4">
        <AutoForm
          formSchema={formSchema}
          onParsedValuesChange={(i) => setUserDataForm(i)}
          values={user}
          onSubmit={onSubmit}
        >
          <Button
            disabled={isSubmitDisabled}
            isLoading={isLoading}
            className=" w-[120px] text-white float-right"
          >
            Güncelle
          </Button>
        </AutoForm>
      </div>
      <div className="basis-1/4 min-w-[100px] pt-4">
        <div className="rounded-full relative max-w-[250px] m-auto">
          <img
            src="https://github.com/shadcn.png"
            className="rounded-full border-4 border-gray-200 w-full h-full"
          />
          <div className="absolute top-0 right-0 p-1.5 w-8 h-8 bg-white rounded-full border border-gray-400">
            <Label htmlFor="picture">
              <EditIcon className="w-full h-full cursor-pointer" />
            </Label>
          </div>
        </div>
        <Input id="picture" placeholder="John" type="file" className="hidden" />
      </div>
    </>
  );
}
