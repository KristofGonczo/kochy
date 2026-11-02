import Sidebar from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSupportedLocale } from "@/i18n/locales";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: LayoutProps<"/">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const locale = getSupportedLocale(cookieStore.get("locale")?.value);

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider defaultOpen={sidebarState !== "false"}>
      <Sidebar initialLocale={locale} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
