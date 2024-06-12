import { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";

export const mockSettingsResponse: UniRefund_SettingService_CountrySettings_CountrySettingDto =
  {
    isEnabled: true,
    groups: [
      {
        isEnabled: true,
        key: "CountryManagement.IssuingFieldManagement",
        displayName: "Issuing - Field management",
        description:
          "Select the applicable information to issue Tax Free tags in this country",
        items: [
          {
            isEnabled: true,

            isRequired: false,
            isActive: true,
            pattern: null,
            depth: 0,
            description: "test",
            displayName: "Parent Display",
            key: "Parentasd",
            parentName: null,
            value: null,
            defaultValue: "true",
            bonds: [
              {
                key: "Parentasd.IsApplicable",
                pattern: "^false$",
                type: "DISABLES",
              },
            ],
            subItems: [
              {
                isEnabled: true,

                isRequired: false,
                isActive: true,
                pattern: null,
                depth: 0,
                description: null,
                displayName: "Password",
                key: "Password",
                parentName: null,
                value: null,
                defaultValue: null,
                bonds: [
                  {
                    key: "IsApplicable",
                    pattern: "^false$",
                    type: "DISABLES",
                  },
                ],
                subItems: [
                  {
                    isEnabled: true,
                    isRequired: false,
                    isActive: true,
                    pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
                    depth: 0,
                    description:
                      "If traveller's passport is required while issuing.",
                    displayName: "Make mandatory",
                    key: "MakeMandatory", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
                    parentName: null,
                    value: "18",
                    defaultValue: null,
                    bonds: [],
                    subItems: [],
                    valueType: {
                      itemSource: null,
                      name: "ToggleStringValueType",
                      properties: "{}",
                      validator: {
                        name: "BOOLEAN",
                        properties: {
                          minValue: 0,
                          maxValue: 0,
                        },
                      },
                    },
                  },
                  {
                    isEnabled: true,
                    isRequired: false,
                    isActive: true,
                    pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
                    depth: 0,
                    description:
                      "If traveller's passport is required while issuing.",
                    displayName: "Make mandatory",
                    key: "Makemandatory2", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
                    parentName: null,
                    value: "18",
                    defaultValue: null,
                    bonds: [],
                    subItems: [],
                    valueType: {
                      itemSource: null,
                      name: "ToggleStringValueType",
                      properties: "{}",
                      validator: {
                        name: "BOOLEAN",
                        properties: {
                          minValue: 0,
                          maxValue: 0,
                        },
                      },
                    },
                  },
                ],
                valueType: {
                  itemSource: null,
                  name: null,
                  properties: "{}",
                  validator: {
                    name: null,
                    properties: {
                      minValue: 0,
                      maxValue: 0,
                    },
                  },
                },
              },
              {
                isEnabled: true,

                isRequired: true,
                isActive: true,
                pattern: null,
                depth: 0,
                description: null,
                displayName: "ChildInput",
                key: "ChildInput",
                parentName: null,
                value: "0",
                defaultValue: "0",
                bonds: [],
                subItems: [],
                valueType: {
                  itemSource: null,
                  name: "FreeTextStringValueType",
                  properties: "{}",
                  validator: {
                    name: "NUMERIC",
                    properties: {
                      minValue: 0,
                      maxValue: 2147483647,
                    },
                  },
                },
              },
              {
                isEnabled: true,

                isRequired: false,
                isActive: true,
                pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
                depth: 0,
                description:
                  "If traveller's passport is required while issuing.",
                displayName: "IsApplicable",
                key: "IsApplicable", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
                parentName: null,
                value: "true",
                defaultValue: "false",
                bonds: [],
                subItems: [],
                valueType: {
                  itemSource: null,
                  name: "ToggleStringValueType",
                  properties: "{}",
                  validator: {
                    name: "BOOLEAN",
                    properties: {
                      minValue: 0,
                      maxValue: 0,
                    },
                  },
                },
              },
            ],
            valueType: {
              itemSource: null,
              name: null,
              properties: "{}",
              validator: {
                name: null,
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: false,
            isActive: true,
            pattern: null,
            depth: 0,
            description: "",
            displayName: "DateOfBirth",
            key: "DateOfBirth",
            parentName: null,
            value: null,
            defaultValue: null,
            bonds: [],
            subItems: [
              {
                isEnabled: true,

                isRequired: false,
                isActive: true,
                pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
                depth: 0,
                description:
                  "If traveller's passport is required while issuing.",
                displayName: "MakeMandatory",
                key: "MakeMandatory2xx", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
                parentName: null,
                value: "true",
                defaultValue: "true",
                bonds: [],
                subItems: [],
                valueType: {
                  itemSource: null,
                  name: "ToggleStringValueType",
                  properties: "{}",
                  validator: {
                    name: "BOOLEAN",
                    properties: {
                      minValue: 0,
                      maxValue: 0,
                    },
                  },
                },
              },
              {
                isEnabled: true,

                isRequired: true,
                isActive: true,
                pattern: null,
                depth: 0,
                description:
                  "Minimum age a traveller should be to be eligible to shop Tax Free. Leave empty or 0 (zero) if you don't want to apply the rule.",
                displayName: "MinimumTravellerAge",
                key: "MinimumTravellerAge",
                parentName: null,
                value: "asdasd",
                defaultValue: "asdasd",
                bonds: [
                  {
                    key: "MakeMandatory2xx",
                    pattern: "^false$",
                    type: "DISABLES",
                  },
                ],
                subItems: [],
                valueType: {
                  itemSource: null,
                  name: "FreeTextStringValueType",
                  properties: "{}",
                  validator: {
                    name: "NUMERIC",
                    properties: {
                      minValue: 0,
                      maxValue: 2147483647,
                    },
                  },
                },
              },
            ],
            valueType: {
              itemSource: null,
              name: null,
              properties: "{}",
              validator: {
                name: null,
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description: null,
            displayName: "FormAlertAmount",
            key: "FormAlertAmount",
            parentName: null,
            value: "true",
            defaultValue: "true",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "FreeTextStringValueType",
              properties: "{}",
              validator: {
                name: "NUMERIC",
                properties: {
                  minValue: 0,
                  maxValue: 2147483647,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description: null,
            displayName: "Formrefillfactor",
            key: "Formrefillfactor",
            parentName: null,
            value: "0",
            defaultValue: "0",
            bonds: [
              {
                key: "FormAlertAmount",
                pattern: "^true$",
                type: "DISABLES",
              },
            ],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "FreeTextStringValueType",
              properties: "{}",
              validator: {
                name: "NUMERIC",
                properties: {
                  minValue: 0,
                  maxValue: 2147483647,
                },
              },
            },
          },
        ],
      },
      {
        isEnabled: true,
        key: "CountryManagement.Services",
        displayName: "Services",
        description:
          "Select the applicable information to issue Tax Free tags in this country",
        items: [
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Exchange", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: null,
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Tour guide", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: null,
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Eligibility Service", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "false",
            defaultValue: "false",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description:
              "Number of hours that the last eligibility check is valid for. Leave empty or 0 (zero) if eligibility check should be done every time it is required.",
            displayName: "MakeMandatory",
            key: "Eligibility check result validity (hours)", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "0",
            defaultValue: "0",
            bonds: [
              {
                key: "Eligibility Service",
                pattern: "^false$",
                type: "DISABLES",
              },
            ],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "FreeTextStringValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Allow eligibility complaint", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: null,
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
        ],
      },
      {
        isEnabled: true,
        key: "CountryManagement.Invoicing",
        displayName: "Invoicing",
        description: "CountryManagement.InputExample.Description",
        items: [
          {
            isEnabled: true,

            isRequired: false,
            isActive: true,
            pattern: "trial",
            depth: 0,
            description: "",
            displayName: "LDAP Login",
            key: "Invoice sale type",
            parentName: null,
            value: "Optional",
            defaultValue: "Double Sale",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: {
                items: [
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item0.DisplayText.Name.Optional",
                      resourceName: "SettingService",
                    },
                    value: "Single Sale",
                  },
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                      resourceName: "SettingService",
                    },
                    value: "Double Sale",
                  },
                ],
              },
              name: "SelectionStringValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Rebate", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: "true",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: false,
            isActive: true,
            pattern: "trial",
            depth: 0,
            description: "",
            displayName: "LDAP Login",
            key: "Rebate invoicing",
            parentName: null,
            value: "Optional",
            defaultValue: "Advice",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: {
                items: [
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item0.DisplayText.Name.Optional",
                      resourceName: "SettingService",
                    },
                    value: "None",
                  },
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                      resourceName: "SettingService",
                    },
                    value: "Advice",
                  },
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                      resourceName: "SettingService",
                    },
                    value: "Self-billing Invoice",
                  },
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                      resourceName: "SettingService",
                    },
                    value: "Both",
                  },
                ],
              },
              name: "SelectionStringValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description: "",
            displayName: "WelcomeText",
            key: "Min amount of rebate",
            parentName: null,
            value: "0",
            defaultValue: "250",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "FreeTextStringValueType",
              properties: "{}",
              validator: {
                name: "STRING",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Ropo invoice service", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: null,
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Invoicing exported", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: null,
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,

            isRequired: true,
            isActive: true,
            pattern: "^(1[89]|[2-5][0-9]|6[0-5])$",
            depth: 0,
            description: "",
            displayName: "MakeMandatory",
            key: "Direct Debit", //"CountryManagement.IssuingFieldManagement.Passport.MakeMandatory",
            parentName: null,
            value: "true",
            defaultValue: null,
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: null,
              name: "BooleanValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
        ],
      },
    ],
  };

export const test4: UniRefund_SettingService_CountrySettings_CountrySettingDto =
  {
    isEnabled: true,
    groups: [
      {
        isEnabled: true,
        key: "CountryManagement.InputExample",
        displayName: "CountryManagement.InputExample.DisplayName",
        description: null,
        items: [
          {
            isEnabled: true,
            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description: null,
            displayName:
              "CountryManagement.InputExample.ToggleInputExample.DisplayName1",
            key: "CountryManagement.InputExample.ToggleInputExample1",
            parentName: null,
            value: "false",
            defaultValue: "false",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: {
                items: [],
              },
              name: "ToggleStringValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,
            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description: null,
            displayName:
              "CountryManagement.InputExample.ToggleInputExample.DisplayName2",
            key: "CountryManagement.InputExample.ToggleInputExample2",
            parentName: null,
            value: "false",
            defaultValue: "false",
            bonds: [
              {
                key: "CountryManagement.InputExample.ToggleInputExample1",
                pattern: "^true$",
                type: "HIDES",
              },
            ],
            subItems: [],
            valueType: {
              itemSource: {
                items: [],
              },
              name: "ToggleStringValueType",
              properties: "{}",
              validator: {
                name: "BOOLEAN",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,
            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description:
              "CountryManagement.InputExample.NumericInputExample.Description",
            displayName:
              "CountryManagement.InputExample.NumericInputExample.DisplayName",
            key: "CountryManagement.InputExample.NumericInputExample",
            parentName: null,
            value: "0",
            defaultValue: "0",
            bonds: [
              {
                key: "CountryManagement.InputExample.ToggleInputExample",
                pattern: "^true$",
                type: "DISABLES",
              },
            ],
            subItems: [
              {
                isEnabled: true,
                isRequired: true,
                isActive: true,
                pattern: null,
                depth: 1,
                description:
                  "CountryManagement.InputExample.NumericInputExample.SubItemExample.Description",
                displayName:
                  "CountryManagement.InputExample.NumericInputExample.SubItemExample.DisplayName",
                key: "CountryManagement.InputExample.NumericInputExample.SubItemExample",
                parentName: null,
                value: "true",
                defaultValue: "true",
                bonds: [
                  {
                    key: "CountryManagement.InputExample.NumericInputExample.IsApplicable",
                    pattern: "^false$",
                    type: "DISABLES",
                  },
                ],
                subItems: [
                  {
                    isEnabled: true,
                    isRequired: true,
                    isActive: true,
                    pattern: null,
                    depth: 1,
                    description:
                      "CountryManagement.InputExample.NumericInputExample.SubItemExample.DeepSubItem.Description",
                    displayName:
                      "CountryManagement.InputExample.NumericInputExample.SubItemExample.DeepSubItem.DisplayName",
                    key: "CountryManagement.InputExample.NumericInputExample.SubItemExample.DeepSubItem",
                    parentName: null,
                    value: "true",
                    defaultValue: "true",
                    bonds: [],
                    subItems: [],
                    valueType: {
                      itemSource: {
                        items: [],
                      },
                      name: "ToggleStringValueType",
                      properties: "{}",
                      validator: {
                        name: "BOOLEAN",
                        properties: {
                          minValue: 0,
                          maxValue: 2147483647,
                        },
                      },
                    },
                  },
                ],
                valueType: {
                  itemSource: {
                    items: [],
                  },
                  name: "ToggleStringValueType",
                  properties: "{}",
                  validator: {
                    name: "BOOLEAN",
                    properties: {
                      minValue: 0,
                      maxValue: 2147483647,
                    },
                  },
                },
              },
              {
                isEnabled: true,
                isRequired: true,
                isActive: true,
                pattern: null,
                depth: 1,
                description:
                  "CountryManagement.InputExample.NumericInputExample.IsApplicable.Description",
                displayName:
                  "CountryManagement.InputExample.NumericInputExample.IsApplicable.DisplayName",
                key: "CountryManagement.InputExample.NumericInputExample.IsApplicable",
                parentName: null,
                value: "true",
                defaultValue: "true",
                bonds: [],
                subItems: [],
                valueType: {
                  itemSource: {
                    items: [],
                  },
                  name: "ToggleStringValueType",
                  properties: "{}",
                  validator: {
                    name: "BOOLEAN",
                    properties: {
                      minValue: 0,
                      maxValue: 2147483647,
                    },
                  },
                },
              },
            ],
            valueType: {
              itemSource: {
                items: [],
              },
              name: "FreeTextStringValueType",
              properties: "{}",
              validator: {
                name: "NUMERIC",
                properties: {
                  minValue: 0,
                  maxValue: 2147483647,
                },
              },
            },
          },
          {
            isEnabled: true,
            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description:
              "CountryManagement.InputExample.StringInputExample.Description",
            displayName:
              "CountryManagement.InputExample.StringInputExample.DisplayName",
            key: "CountryManagement.InputExample.StringInputExample",
            parentName: null,
            value: "Trial",
            defaultValue: "Trial",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: {
                items: [],
              },
              name: "FreeTextStringValueType",
              properties: "{}",
              validator: {
                name: "STRING",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
          {
            isEnabled: true,
            isRequired: true,
            isActive: true,
            pattern: null,
            depth: 0,
            description:
              "CountryManagement.InputExample.SelectableInputExample.Description",
            displayName:
              "CountryManagement.InputExample.SelectableInputExample.DisplayName",
            key: "CountryManagement.InputExample.SelectableInputExample",
            parentName: null,
            value: "Optional",
            defaultValue: "Optional",
            bonds: [],
            subItems: [],
            valueType: {
              itemSource: {
                items: [
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item0.DisplayText.Name.Optional",
                      resourceName: "SettingService",
                    },
                    value: "Optional",
                  },
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item1.DisplayText.Name.Disabled",
                      resourceName: "SettingService",
                    },
                    value: "Disabled",
                  },
                  {
                    displayText: {
                      name: "CountryManagement.InputExample.SelectableInputExample.ValueType.Item2.DisplayText.Name.Forced",
                      resourceName: "SettingService",
                    },
                    value: "Forced",
                  },
                ],
              },
              name: "SelectionStringValueType",
              properties: "{}",
              validator: {
                name: "",
                properties: {
                  minValue: 0,
                  maxValue: 0,
                },
              },
            },
          },
        ],
      },
    ],
  };
