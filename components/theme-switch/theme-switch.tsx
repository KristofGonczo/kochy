"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useSidebar } from "../ui/sidebar";

export function ThemeSwitch({
  renderTrigger,
}: {
  renderTrigger?: React.ReactElement;
}) {
  const t = useTranslations("ThemeSwitch");
  const { setTheme, theme } = useTheme();
  const { open } = useSidebar();

  // This is a workaround for the fact that next-themes does not support server-side rendering.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const selectedTheme = mounted ? theme : undefined;

  return (
    <Select
      items={[
        { value: "system", label: t("system") },
        { value: "light", label: t("light") },
        { value: "dark", label: t("dark") },
      ]}
      value={selectedTheme ?? ""}
      onValueChange={(nextValue) => nextValue && setTheme(nextValue)}
    >
      <SelectTrigger
        render={renderTrigger}
        className={open ? "w-full" : "[&>svg:last-child]:hidden"}
      >
        {selectedTheme === "light" && <Sun />}
        {selectedTheme === "dark" && <Moon />}
        {selectedTheme === "system" && <SunMoon />}
        {open && <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key={"light"} value={"light"}>
            {t("light")}
          </SelectItem>
          <SelectItem key={"dark"} value={"dark"}>
            {t("dark")}
          </SelectItem>
          <SelectItem key={"system"} value={"system"}>
            {t("system")}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
