import { toast } from "@/components/ui/sonner";
import { $UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressDto } from "@ayasofyazilim/saas/LocationService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { AutoFormInputComponentProps } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  createFieldConfigWithResource,
  CustomCombobox,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import type { Dispatch, SetStateAction } from "react";
import type { LanguageDataResourceType } from "src/language-data/language-data";
import {
  getCitiesByRegionId,
  getDefaultRegionsByCountryIdApi,
  getRegionsByCountryIdApi,
} from "./actions";
import type {
  CityDto,
  CountryDto,
  RegionDto,
  SelectedAddressField,
} from "./types";

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
  cityList?: CityDto[];
  regionList?: RegionDto[];
  countryList?: CountryDto[];
  languageData: LanguageDataResourceType;
}) {
  const fieldConfig = {
    cityId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<CityDto>
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
        <CustomCombobox<CountryDto>
          childrenProps={props}
          emptyValue={params.languageData["Country.Select"]}
          list={params.countryList}
          selectIdentifier="id"
          selectLabel="name"
        />
      ),
    },
    regionId: {
      renderer: (props: AutoFormInputComponentProps) => (
        <CustomCombobox<RegionDto>
          childrenProps={props}
          emptyValue={params.languageData["Region.Select"]}
          list={params.regionList}
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
export function handleOnAddressValueChange({
  values,
  selectedFields,
  setSelectedFields,
  countryList = [],
  setRegionList,
  setCityList,
  languageData,
}: {
  values: Record<string, string>;
  setCityList: Dispatch<SetStateAction<CityDto[]>>;
  setRegionList?: Dispatch<SetStateAction<RegionDto[]>>;
  countryList?: CountryDto[];
  selectedFields: SelectedAddressField;
  setSelectedFields: Dispatch<SetStateAction<SelectedAddressField>>;
  languageData: LanguageDataResourceType;
}) {
  async function getCities(regionId: string) {
    setSelectedFields((current) => ({
      ...current,
      regionId,
      cityId: "",
    }));
    const cities = await getCitiesByRegionId({ regionId });
    if (cities.type === "success") {
      setCityList(cities.data);
      return;
    }
    setCityList([]);
    toast.error(languageData["Fetch.Fail"]);
  }

  async function getRegions(countryId: string) {
    if (!setRegionList) return;

    setSelectedFields((current) => ({
      ...current,
      countryId,
      regionId: "",
      cityId: "",
    }));
    const selectedCountry = countryList.find(
      (country) => country.id === val.countryId,
    );
    if (selectedCountry?.hasRegion) {
      const regions = await getRegionsByCountryIdApi({
        countryId,
      });
      setCityList([]);
      if (regions.type === "success") {
        setRegionList(regions.data);
        return;
      }
      setRegionList([]);
      toast.error(languageData["Fetch.Fail"]);
      return;
    }
    const regions = await getDefaultRegionsByCountryIdApi({
      countryId: val.countryId,
    });
    if (regions.type === "success") {
      const regionId = regions.data;
      setRegionList([]);
      setSelectedFields((current) => ({
        ...current,
        regionId,
      }));
      void getCities(regionId);
      return;
    }
    setCityList([]);
    toast.error(languageData["Fetch.Fail"]);
  }
  const val = values as {
    [key in AddressFormFieldsType]: string;
  };
  if (setRegionList && val.countryId !== selectedFields.countryId) {
    void getRegions(val.countryId);
  } else if (val.regionId !== selectedFields.regionId) {
    void getCities(val.regionId);
  } else if (val.cityId !== selectedFields.cityId) {
    setSelectedFields((current) => ({
      ...current,
      cityId: val.cityId,
    }));
  }
}
export function getAddressSchema(hideFields: AddressFormFieldsType[] = []) {
  const fields = AddressFormFields.filter(
    (field) => !hideFields.includes(field),
  );
  const schema = createZodObject(AddressDto, fields);
  return schema;
}
