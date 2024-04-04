"use client";
import { ForgotPasswordFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/forgot-password-form";
import { LoginFormDataType } from "@repo/ayasofyazilim-ui/molecules/forms/login-form";
import { Auth, authTypes, isAuthType } from "@repo/ayasofyazilim-ui/pages/auth";
import { useRouter } from "next/navigation";
import { useLocale } from "src/providers/locale";
import { z } from "zod";
import { useParams } from "next/navigation";
import Error from "next/error";

export default function Page(): JSX.Element {
  const { cultureName, resources, changeLocale } = useLocale();
  const router = useRouter();
  const params = useParams();
  let authTypeParam = params.auth as authTypes;
  if (!isAuthType(authTypeParam)) {
    return (
      <Error statusCode={404} title={resources?.AbpUi.texts?.PageNotFound} />
    );
  }

  //Login start
  const onForgotPasswordSubmit = (
    values: ForgotPasswordFormDataType
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("./api/auth/send-password-reset-code", {
          method: "POST",
          body: JSON.stringify(values),
        });
        if (response.status > 199 && response.status < 300) {
          return resolve("");
        } else {
          let result = await response.json();
          return reject(result.error.message);
        }
      } catch (e) {
        return reject(e);
      }
    });
  };
  const onLoginSubmit = (values: LoginFormDataType): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("./api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      let result = await response.json();
      if (result.description !== "Success") {
        return reject(result);
      }
      resolve(result);
      router.push("/profile");
    });
  };
  const loginFormSchema = z.object({
    userIdentifier: z.string().min(5),
    password: z.string().min(4).max(32),
    tenantId: z.string(),
  });
  const loginProps = {
    allowTenantChange: false,
    formSchema: loginFormSchema,
    onForgotPasswordSubmit: onForgotPasswordSubmit,
    onSubmitFunction: onLoginSubmit,
    registerPath: "register",
  };
  //Login end
  //Register waiting for implementation

  return (
    <Auth
      authType={authTypeParam}
      // @ts-ignore
      authProps={authTypeParam === "login" ? loginProps : undefined}
      resources={resources ? JSON.parse(JSON.stringify(resources)) : undefined}
      cultureName={cultureName || "tr"}
      onLangChange={changeLocale}
    >
      <div className="bg-zinc-800 flex flex-auto justify-center items-center">
        <div>
          <img src="https://i.imgur.com/z5WQB9B.png" alt="logo" />
        </div>
      </div>
    </Auth>
  );
}
