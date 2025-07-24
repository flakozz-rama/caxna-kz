"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "./components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Не проверяем guard на странице логина
    if (pathname === "/admin/login") {
      setIsAuthChecked(true);
      setIsAuthenticated(false);
      return;
    }
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    if (!token) {
      router.replace("/admin/login");
      setIsAuthChecked(false);
      setIsAuthenticated(false);
    } else {
      setIsAuthChecked(true);
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Пока не проверили авторизацию — ничего не рендерим (чтобы не мигал UI)
  if (!isAuthChecked && pathname !== "/admin/login") {
    return null;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
