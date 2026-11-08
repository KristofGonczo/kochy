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
import { useRouter } from "next/navigation";
import { ThemeSwitch } from "../theme-switch/theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = ({ initialLocale }: { initialLocale?: Locale }) => {
  const t = useTranslations("Sidebar");
  const session = authClient.useSession();
  const { open } = useSidebar();
  const router = useRouter();

  return (
    <ShadCnSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  />
                }
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>
                      {session.data?.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.data?.user.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      authClient.signOut().then(() => {
                        router.push("/login");
                      });
                    }}
                  >
                    <LogOut />
                    {t("logOut")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
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
            <ThemeSwitch
              compact={!open}
              renderTrigger={<SidebarMenuButton />}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadCnSidebar>
  );
};

export default Sidebar;
