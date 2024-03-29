"use client";
import { LoginFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/login-form";
import { Login } from "@repo/ayasofyazilim-ui/pages/login";
import { useRouter } from "next/navigation";
import { useLocale } from "src/providers/locale";
import { z } from "zod";

const defaultFormSchema = z.object({
  userIdentifier: z.string().min(5),
  password: z.string().min(4).max(32),
  tenantId: z.string(),
});

export default function Page(): JSX.Element {
  const router = useRouter();
  const { cultureName, resources, changeLocale } = useLocale();

  const onSubmitFunction = (values: LoginFormDataType): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const responce = await fetch('./api/auth', {
        method: "POST",
        body: JSON.stringify(values),
      });
      let result = await responce.json();
      if (result.description !== "Success") {
        return reject(result);
      }
      resolve(result);
      router.push("/profile");
    });
  };

  return (
    <Login
      onSubmitFunction={onSubmitFunction}
      registerPath="register"
      formSchema={defaultFormSchema}
      allowTenantChange={false}
      resources={resources ? JSON.parse(JSON.stringify(resources)) : undefined}
      cultureName={cultureName || "tr"}
      onLangChange={changeLocale}
    >
      <div className="bg-zinc-800 flex flex-auto justify-center items-center">
        <div>
          <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
        </div>
      </div>
    </Login>
  );
}
