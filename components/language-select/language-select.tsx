"use client";

import {
  getSupportedLocaleName,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/i18n/locales";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { persistLocale } from "./actions";

export const AUTO_LOCALE = "auto";
export type LanguageSelectValue = Locale | typeof AUTO_LOCALE;

export function LanguageSelect({
  initialLocale,
  renderTrigger,
  setLocaleAction = persistLocale,
}: {
  initialLocale?: Locale;
  renderTrigger?: ReactElement;
  setLocaleAction?: typeof persistLocale;
}) {
  const t = useTranslations("Sidebar");
  const router = useRouter();
  const [value, setValue] = useState<LanguageSelectValue>(
    initialLocale ?? AUTO_LOCALE,
  );

  async function handleValueChange(nextValue: LanguageSelectValue | null) {
    if (!nextValue) return;
    await setLocaleAction(nextValue);
    setValue(nextValue);
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={renderTrigger ?? <Button />}
        aria-label={t("language")}
      >
        <span className="relative -m-2 flex size-8 shrink-0 items-center justify-center">
          <Languages />
        </span>
        <div className="flex-1">
          <span className="truncate font-medium">
            {getSupportedLocaleName(value as Locale) ?? t("languageAuto")}
          </span>
        </div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleValueChange(AUTO_LOCALE)}>
            {t("languageAuto")}
          </DropdownMenuItem>
          {SUPPORTED_LOCALES.map(({ code, name }) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleValueChange(code)}
            >
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
