import { ZodSchema, z } from "zod";

export function isServerSide() {
  return typeof window === "undefined";
}

function getLocale(locale?: string) {
  if (isServerSide()) {
    const cookieStore = require("next/headers").cookies();
    locale = cookieStore.get("locale")?.value ?? "en";
  } else {
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split("/");
    locale = pathnameParts?.[1] ?? "en";
  }
  return locale;
}

export function getBaseLink(
  location: string,
  withLocale?: boolean,
  locale?: string
) {
  // check if location first character is a slash
  if (location.charAt(0) === "/") {
    location = location.slice(1);
  }
  const origin = isServerSide()
    ? process.env.PROJECT_BASE_URL
    : window.location.origin;
  const localePath = withLocale ? getLocale(locale) + "/" : "";
  return `${origin}/${localePath}${location}`;
}

export function JsonSchemaToZod(schema: any):ZodSchema<any> {
  const zodObject = z.object({});
  for (const key in schema.properties) {
    const property = schema.properties[key];
    // switch for props type
    if (property.type === "object") {
      zodObject[key] = JsonSchemaToZod(property);
    } else {
      zodObject[key] = property.type;
    }
  }
  return zodObject;
}

type JsonSchema = {
  type: 'string' | 'boolean';
  isRequired?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  format?: 'date-time';
}

type SchemaType = Record<string, JsonSchema>;

export function createZodObject(schema: SchemaType,positions: Array<any>): ZodSchema<any> {
  const zodSchema = {};
  positions.forEach((element: string) => {
    const props = schema.properties[element];
    const isRequired = schema.required.includes[element];
    let zodType = createZodType(props, isRequired);
    zodSchema[element] = zodType;
  });
  return z.object(zodSchema);
}

function createZodType(schema:JsonSchema, isRequired:boolean): ZodSchema<any>{
  let zodType;
  switch (schema.type) {
    case 'string':
      zodType = z.string();
      if (schema.maxLength) zodType = zodType.max(schema.maxLength);
      if (schema.pattern) zodType = zodType.regex(schema.pattern);
      break;
    case 'boolean':
      zodType = z.boolean();
      break;
    default:
      zodType = z.unknown();
  }
  if (isRequired) zodType = zodType.optional();
  return zodType;
}