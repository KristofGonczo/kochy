"use server";

import { cookies } from "next/headers";
import { AUTO_LOCALE, LanguageSelectValue } from "./language-select";

export async function setLocale(locale: LanguageSelectValue) {
  const cookieStore = await cookies();

  if (locale === AUTO_LOCALE) {
    cookieStore.delete("locale");
    return;
  }

  cookieStore.set("locale", locale);
}
