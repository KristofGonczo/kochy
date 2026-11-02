"use client";

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
import { authClient } from "@/lib/auth-client"; // import the auth client
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const session = authClient.useSession();
  const { open } = useSidebar();

  return (
    <ShadCnSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <DropdownMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                <Avatar size={open ? "lg" : "default"}>
                  <AvatarImage />
                  <AvatarFallback>
                    {session.data?.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-lg">
                  {open && session.data?.user.name}
                </span>
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
      <SidebarFooter />
    </ShadCnSidebar>
  );
};

export default Sidebar;
