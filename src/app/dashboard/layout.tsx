
import type { Metadata } from "next";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Home, User, Video, LogOut, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggleButton } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Painel NexusPro",
  description: "Área administrativa do sistema NexusPro.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex flex-col items-center gap-2">
                <Image src="https://placehold.co/160x160.png" alt="Andromeda Solutions Logo" width={160} height={160} data-ai-hint="logo" />
                <span className="text-lg font-bold text-sidebar-foreground">NexusPro</span>
              </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <Home />
                  Painel
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                <Link href="/dashboard/tutorials">
                  <Video />
                  Tutoriais do Sistema
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton asChild>
                <Link href="/dashboard/user-data">
                  <User />
                  Dados do Usuário
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                <Link href="/dashboard/contract-data">
                  <FileText />
                  Dados Contratuais
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <LogOut />
                  Sair
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="flex md:hidden" />
            <div className="flex w-full items-center justify-end gap-4">
                 <ThemeToggleButton />
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
        </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
