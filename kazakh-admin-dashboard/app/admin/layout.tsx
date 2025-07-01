"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "./components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
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
