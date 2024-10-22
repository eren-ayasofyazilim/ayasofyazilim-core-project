import { $UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressDto } from "@ayasofyazilim/saas/LocationService";
import type {
  UniRefund_LocationService_Cities_CityDto,
  UniRefund_LocationService_Countries_CountryDto,
} from "@ayasofyazilim/saas/LocationService";
import type { AutoFormInputComponentProps } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  createFieldConfigWithResource,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { LanguageDataResourceType } from "src/language-data/language-data";

const AddressFormFields: AddressFormFieldsType[] = [
  "type",
  "countryId",
  "regionId",
  "cityId",
  "districtId",
  "neighborhoodId",
  "addressLine",
  "fullAddress",
  "postalCode",
];
type AddressFormFieldsType =
  | "type"
  | "countryId"
  | "regionId"
  | "cityId"
  | "districtId"
  | "neighborhoodId"
  | "addressLine"
  | "fullAddress"
  | "postalCode";

export function getAddressFieldConfig(params: {
  cityList?: UniRefund_LocationService_Cities_CityDto[];
  countryList?: UniRefund_LocationService_Countries_CountryDto[];
  languageData: LanguageDataResourceType;
}) {
  const fieldConfig = {
    cityId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<UniRefund_LocationService_Cities_CityDto>
          childrenProps={props}
          emptyValue={params.languageData["City.Select"]}
          list={params.cityList}
          selectIdentifier="id"
          selectLabel="name"
        />
      ),
    },
    countryId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<UniRefund_LocationService_Countries_CountryDto>
          childrenProps={props}
          emptyValue={params.languageData["Country.Select"]}
          list={params.countryList}
          selectIdentifier="id"
          selectLabel="name"
        />
      ),
    },
  };
  const translatedForm = createFieldConfigWithResource({
    schema: AddressDto,
    resources: params.languageData,
    name: "Form.address",
    extend: fieldConfig,
  });

  return translatedForm;
}
export function getAddressSchema(hideFields: AddressFormFieldsType[] = []) {
  const fields = AddressFormFields.filter(
    (field) => !hideFields.includes(field),
  );
  const schema = createZodObject(AddressDto, fields);
  return schema;
}
