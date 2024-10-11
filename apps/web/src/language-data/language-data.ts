import type { AbpUiNavigationResource } from "./AbpUiNavigation";
import type { ContractServiceResource } from "./ContractService";
import type { CRMServiceServiceResource } from "./CRMService";
import type { CustomerServiceResource } from "./CustomersService";
import type { DebtorsServiceResource } from "./DebtorsService";
import type { IdentityServiceResource } from "./IdentityService";
import type { ProjectServiceResource } from "./ProjectService";
import type { SettingServiceResource } from "./SettingService";
import type { TravellerServiceResource } from "./TravellerService";

export type LanguageDataResourceType =
  | AbpUiNavigationResource
  | ContractServiceResource
  | CRMServiceServiceResource
  | CustomerServiceResource
  | DebtorsServiceResource
  | IdentityServiceResource
  | ProjectServiceResource
  | SettingServiceResource
  | TravellerServiceResource;
