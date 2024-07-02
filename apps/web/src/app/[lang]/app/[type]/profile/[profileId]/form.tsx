"use client";

import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { formSchema } from "../data";
import { postBacker, putBacker } from "../actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import { revalidatePath } from "next/cache";

export function BackerForm({
  type,
  backer,
  profileId,
}: {
  type: string;
  backer: any;
  profileId: string;
}) {
  const [data, setData] = useState<any>();
  function submitFormData(formData) {
    console.log("submitting", formData);
    if (profileId === "new") {
      console.log("new")
      postBacker(formData);
    } else {
      putBacker(profileId, formData);
    }
    // revalidatePath("/[lang]/app/[type]/profile", "page");
  }
  return (
    <>
      <div className="grid gap-4 py-4">
        <ScrollArea className="max-h-[600px]">
          <AutoForm
            // id="backer-form-new"  
            formSchema={formSchema[type]}
            values={backer}
            onParsedValuesChange={(values) => {
              setData(values);
            }}
            onSubmit={(formData) => submitFormData(formData)}
          >
          </AutoForm>
          <AutoFormSubmit >
            <>
            Save Form
            </>
          </AutoFormSubmit>
        </ScrollArea>
      </div>
      <div className="flex-row mb-2">
        <Button className="max-w-20 float-right" onClick={() => submitFormData(data)}>
          Save Form
        </Button>
      </div>
    </>
  );
}
