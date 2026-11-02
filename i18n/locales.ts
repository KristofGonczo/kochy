export const SUPPORTED_LOCALES = [
  { code: "en", name: "English" },
  { code: "hu", name: "Magyar" },
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number]["code"];

function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.some(({ code }) => code === value);
}

export function getSupportedLocale(value?: string): Locale | undefined {
  const code = value?.split("-")[0].toLowerCase();

  return code && isSupportedLocale(code) ? code : undefined;
}
