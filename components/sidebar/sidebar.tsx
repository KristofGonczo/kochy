"use client";

import { LanguageSelect } from "@/components/language-select/language-select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as ShadCnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { Locale } from "@/i18n/locales";
import { authClient } from "@/lib/auth-client"; // import the auth client
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { ThemeSwitch } from "../theme-switch/theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = ({ initialLocale }: { initialLocale?: Locale }) => {
  const t = useTranslations("Sidebar");
  const session = authClient.useSession();
  const { open } = useSidebar();

  return (
    <ShadCnSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <DropdownMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton className="sidebar-avatar-trigger group-data-[collapsible=icon]:[&.sidebar-avatar-trigger]:p-0!" />
                }
              >
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {session.data?.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {open && (
                  <span className="font-semibold text-lg">
                    {session.data?.user.name}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      authClient.signOut().then(() => {
                        redirect("/login");
                      });
                    }}
                  >
                    <LogOut />
                    {t("logOut")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </SidebarMenuItem>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LanguageSelect
              initialLocale={initialLocale}
              renderTrigger={<SidebarMenuButton />}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ThemeSwitch compact={!open} renderTrigger={<SidebarMenuButton />} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadCnSidebar>
  );
};

export default Sidebar;
