
'use client';

import React from "react";
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
import { Home, User, Video, LogOut, FileText, Download, Headset, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggleButton } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import logoNexus from "@/images/NewLogoNexus.png";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/user-data", label: "Dados do Usuário", icon: User },
  { href: "/dashboard/contract-data", label: "Meu Plano", icon: FileText },
  { href: "/dashboard/financial-support", label: "Suporte Financeiro", icon: Headset },
  { href: "/dashboard/tutorials", label: "Tutoriais do Sistema", icon: Video },
  { href: "/dashboard/installer", label: "Download", icon: Download },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50 bg-sidebar/50 backdrop-blur-xl">
        <SidebarHeader className="p-6">
           <div className="flex flex-col items-center gap-3 py-4 bg-primary/5 rounded-2xl border border-primary/10 shadow-sm">
                <div className="relative w-20 h-20 bg-white rounded-full p-2 shadow-inner flex items-center justify-center">
                    <Image src={logoNexus} alt="NexusPro" width={64} height={64} className="object-contain" priority />
                </div>
                <div className="text-center">
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                        NexusPro
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Sistema de Gestão</p>
                </div>
              </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3">
          <SidebarMenu className="gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive}
                    className={cn(
                        "relative flex items-center gap-3 px-4 py-6 rounded-xl transition-all duration-300 group overflow-hidden",
                        isActive 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                            : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Link href={item.href}>
                      <Icon className={cn(
                          "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                          isActive ? "text-primary-foreground" : "text-primary/70"
                      )} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-foreground shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-border/50 bg-muted/30">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                className="flex items-center gap-3 px-4 py-5 rounded-xl text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 group"
              >
                <Link href="/">
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-semibold uppercase text-xs tracking-wider">Sair da Conta</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background">
        <header className="flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6 sticky top-0 z-30">
            <SidebarTrigger className="flex md:hidden text-primary" />
            <div className="flex-1 hidden md:block">
                <h2 className="text-sm font-semibold text-muted-foreground">
                    {menuItems.find(i => i.href === pathname)?.label || "Painel de Controle"}
                </h2>
            </div>
            <div className="flex items-center justify-end gap-4 ml-auto">
                 <ThemeToggleButton />
            </div>
        </header>
        <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
                {children}
            </div>
        </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
