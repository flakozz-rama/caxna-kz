"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, Newspaper, MessageCircle, FolderOpen, Video, Users, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  { id: "admin", title: "Басты бет", icon: Home, href: "/admin" },
  { id: "maqalalar", title: "Мақалалар", icon: FileText, href: "/admin/maqalalar" },
  { id: "zhanalyqtar", title: "Жаңалықтар", icon: Newspaper, href: "/admin/zhanalyqtar" },
  { id: "suqbattar", title: "Сұхбаттар", icon: MessageCircle, href: "/admin/suqbattar" },
  { id: "arnaiy-zhobalar", title: "Арнайы жобалар", icon: FolderOpen, href: "/admin/arnaiy-zhobalar" },
  { id: "videolar", title: "Видеолар", icon: Video, href: "/admin/videolar" },
  { id: "paidalanushylar", title: "Пайдаланушылар", icon: Users, href: "/admin/paidalanushylar" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Қ</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">Мәдени портал</h2>
            <p className="text-sm text-gray-500">Басқару панелі</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                className="w-full justify-start gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
              >
                <Link href={item.href}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <Link href="/admin/login">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Шығу
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
