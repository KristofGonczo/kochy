"use client";

import { ChevronDown, Moon, Sun, SunMoon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function ThemeSwitch({
  renderTrigger,
}: {
  renderTrigger?: React.ReactElement;
  compact?: boolean;
}) {
  const t = useTranslations("ThemeSwitch");
  const { setTheme, theme } = useTheme();

  // This is a workaround for the fact that next-themes does not support server-side rendering.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const selectedTheme = mounted ? theme : undefined;

  return (
    selectedTheme && (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={renderTrigger ?? <Button />}
          aria-label={t("theme")}
        >
          <span className="relative -m-2 flex size-8 shrink-0 items-center justify-center">
            {selectedTheme === "light" && <Sun />}
            {selectedTheme === "dark" && <Moon />}
            {selectedTheme === "system" && <SunMoon />}
          </span>
          <div className="flex-1">
            <span className="truncate font-medium">
              {t(selectedTheme as Parameters<typeof t>[0])}
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
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {t("light")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              {t("dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              {t("system")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
