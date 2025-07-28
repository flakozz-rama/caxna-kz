"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
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

           const getCurrentPage = () => {
           if (pathname.includes("/admin/maqalalar")) return "articles";
           if (pathname.includes("/admin/zhanalyqtar")) return "news";
           if (pathname.includes("/admin/suqbattar")) return "interviews";
           if (pathname.includes("/admin/piesa")) return "piesa";
           if (pathname.includes("/admin/synshy")) return "synshy";
           if (pathname.includes("/admin/videolar")) return "videos";
           if (pathname.includes("/admin/paidalanushylar")) return "users";
           if (pathname === "/admin") return "dashboard";
           return "dashboard";
         };

           const handleNavigate = (page: string) => {
           switch (page) {
             case "dashboard":
               router.push("/admin");
               break;
             case "articles":
               router.push("/admin/maqalalar");
               break;
             case "news":
               router.push("/admin/zhanalyqtar");
               break;
             case "interviews":
               router.push("/admin/suqbattar");
               break;
             case "piesa":
               router.push("/admin/piesa");
               break;
             case "synshy":
               router.push("/admin/synshy");
               break;
             case "videos":
               router.push("/admin/videolar");
               break;
             case "users":
               router.push("/admin/paidalanushylar");
               break;
           }
         };

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
