"use client";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { dataConfigOfCrm } from "../../../../data";
import type { CreateOrganizationDto } from "../../../new/page";

export default function Page({
  params,
}: {
  params: {
    data: string;
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  // const [countries, setCountries] =
  //   useState<UniRefund_LocationService_Countries_CountryDto[]>();
  // const [cities, setCities] =
  //   useState<UniRefund_LocationService_Cities_CityDto[]>();

  // useEffect(() => {
  //   setLoading(true);
  //   getCountries({ maxResultCount: 500, sorting: "name" })
  //     .then((response) => {
  //       if (response.type === "success") {
  //         setCountries(response.data.items || []);
  //       } else if (response.type === "api-error") {
  //         toast.error(response.message);
  //       } else {
  //         toast.error("Fatal error");
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  //   void getCities({ maxResultCount: 500, sorting: "name" }).then(
  //     (response) => {
  //       if (response.type === "success") {
  //         setCities(response.data.items || []);
  //       } else if (response.type === "api-error") {
  //         toast.error(response.message);
  //       } else {
  //         toast.error("Fatal error");
  //       }
  //     },
  //   );
  // }, []);

  function formSchemaByData() {
    const config = dataConfigOfCrm.companies.pages[params.data];
    return createZodObject(
      config.createFormSchema?.schema,
      config.createFormSchema?.formPositions,
      undefined,
      config.createFormSchema?.formSubPositions,
    );
  }

  const handleSave = async (formData: CreateOrganizationDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData = {
      customsId: "a3bf0c31-47ef-ba8c-9840-3a14ca207817",
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formData.organization,
              parentCompanyId: params.id,
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [{ ...formData.address, primaryFlag: true }],
                },
              ],
            },
          ],
        },
      ],
    };
    try {
      const response = await fetch(getBaseLink(`api/crm/${params.data}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createformData),
      });
      if (response.ok) {
        toast.success(`Store added successfully`);
        router.push(getBaseLink(`/app/admin/crm/${params.data}/${params.id}`));
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add Store`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Store`);
    }
  };

  return (
    <AutoForm
      className="grid-col-1 grid grid-rows-1 gap-2 space-y-0 lg:grid-cols-3 lg:grid-rows-2"
      fieldConfig={{
        address: {
          className: "row-span-2",
        },
        organization: {
          className: "row-span-2",
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        telephone: {
          localNumber: {
            fieldType: "phone",
            displayName: "Telephone Number",
            inputProps: {
              showLabel: true,
            },
          },
        },
      }}
      formClassName="pb-40 "
      formSchema={formSchemaByData()}
      onSubmit={(val) => {
        void handleSave(val as CreateOrganizationDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
