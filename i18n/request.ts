import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { getSupportedLocale, type Locale } from "./locales";

const getLocaleFromCookie = async () => {
  return getSupportedLocale((await cookies()).get("locale")?.value);
};

const getLocaleFromHeader = async () => {
  return (await headers())
    .get("accept-language")
    ?.split(",")
    .map((preference) => getSupportedLocale(preference.split(";")[0].trim()))
    .find((locale): locale is Locale => locale !== undefined);
};

export default getRequestConfig(async () => {
  const cookieLocale = await getLocaleFromCookie();
  const browserLocale = await getLocaleFromHeader();
  const locale = cookieLocale ?? browserLocale ?? "en";

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
