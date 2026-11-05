"use server";

import { cookies } from "next/headers";
import { AUTO_LOCALE, LanguageSelectValue } from "./language-select";

type LocaleCookieStore = Pick<
  Awaited<ReturnType<typeof cookies>>,
  "delete" | "set"
>;

export function persistLocaleCookie(
  cookieStore: LocaleCookieStore,
  locale: LanguageSelectValue,
) {
  if (locale === AUTO_LOCALE) {
    cookieStore.delete("locale");
    return;
  }

  cookieStore.set("locale", locale);
}

export async function persistLocale(locale: LanguageSelectValue) {
  const cookieStore = await cookies();

  persistLocaleCookie(cookieStore, locale);
}
