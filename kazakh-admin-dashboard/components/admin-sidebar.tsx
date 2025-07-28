"use client"

import { Home, FileText, Newspaper, MessageCircle, Video, Users, LogOut, BookOpen, Star } from "lucide-react"
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

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const menuItems = [
  { id: "dashboard", title: "Басты бет", icon: Home },
  { id: "articles", title: "Мақалалар", icon: FileText },
  { id: "news", title: "Жаңалықтар", icon: Newspaper },
  { id: "interviews", title: "Сұхбаттар", icon: MessageCircle },
  { id: "piesa", title: "Пьесалар", icon: BookOpen },
  { id: "synshy", title: "Сыншы жазбашылар", icon: Star },
  { id: "videos", title: "Видеолар", icon: Video },
  { id: "users", title: "Пайдаланушылар", icon: Users },
]

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Қ</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">CAXNA.KZ</h2>
            <p className="text-sm text-gray-500">Мәдени портал басқару панелі</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onNavigate(item.id)}
                isActive={currentPage === item.id}
                className="w-full justify-start gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Шығу
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
