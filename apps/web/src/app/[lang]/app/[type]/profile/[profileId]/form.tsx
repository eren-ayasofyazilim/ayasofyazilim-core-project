"use client";

import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { formSchema } from "../data";
import { postBacker, putBacker } from "../actions";

export function BackerForm({
  type,
  backer,
  profileId,
}: {
  type: string;
  backer: any;
  profileId: string;
}) {
  return (
    <AutoForm
      formSchema={formSchema[type]}
      values={backer}
      onSubmit={(formData) => {
        console.log("Submıtted", formData);
        if (profileId === "new") {
          postBacker(formData);
        } else {
          putBacker(profileId, formData);
        }
      }}
    >
      <AutoFormSubmit className="float-right">
        <button>Save Changes</button>
      </AutoFormSubmit>
    </AutoForm>
  );
}
