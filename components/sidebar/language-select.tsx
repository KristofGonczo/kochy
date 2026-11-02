"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import { setLocale } from "./actions";

export const AUTO_LOCALE = "auto";
export type LanguageSelectValue = Locale | typeof AUTO_LOCALE;

export function LanguageSelect({
  initialLocale,
  renderTrigger,
}: {
  initialLocale?: Locale;
  renderTrigger?: ReactElement;
}) {
  const t = useTranslations("Sidebar");
  const router = useRouter();
  const { open } = useSidebar();
  const [value, setValue] = useState<LanguageSelectValue>(
    initialLocale ?? AUTO_LOCALE,
  );

  async function handleValueChange(nextValue: LanguageSelectValue | null) {
    if (!nextValue) return;
    await setLocale(nextValue);
    setValue(nextValue);
    router.refresh();
  }

  return (
    <Select
      items={[
        { value: AUTO_LOCALE, label: t("languageAuto") },
        ...SUPPORTED_LOCALES.map(({ code, name }) => ({
          value: code,
          label: name,
        })),
      ]}
      value={value}
      onValueChange={(nextValue) =>
        handleValueChange(nextValue as LanguageSelectValue | null)
      }
    >
      <SelectTrigger
        render={renderTrigger}
        className={open ? "w-full" : "w-full [&>svg:last-child]:hidden"}
        aria-label={t("language")}
      >
        <Languages />
        {open && <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={AUTO_LOCALE}>{t("languageAuto")}</SelectItem>
          {SUPPORTED_LOCALES.map(({ code, name }) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
