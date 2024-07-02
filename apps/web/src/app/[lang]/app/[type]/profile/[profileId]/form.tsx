"use client";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useState } from "react";
import { postBacker, putBacker } from "../actions";
import { formSchema } from "../data";

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
    if (profileId === "new") {
      postBacker(formData);
    } else {
      putBacker(profileId, formData);
    }
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
            <AutoFormSubmit >
            <>
            Save Form
            </>
          </AutoFormSubmit>
          </AutoForm>
          
        </ScrollArea>
      </div>
      <div className="flex-row mb-2">
        {/* <Button className="max-w-20 float-right" onClick={() => submitFormData(data)}>
          Save Form
        </Button> */}
      </div>
    </>
  );
}
