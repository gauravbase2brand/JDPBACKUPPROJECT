'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { 
  LayoutDashboard, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  FileText, 
  Users, 
  Briefcase, 
  MapPin, 
  UserCheck, 
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell
} from "lucide-react"
import { cn } from "@/lib/utils"
// import { LogoutConfirmationDialog } from "../LogoutConfirmationDialog"

interface SidebarProps {
  currentPath?: string
  // onLogout?: () => void
}

export function Sidebar({ currentPath,
  //  onLogout 

}: SidebarProps) {
  const [activestate, setActivestate] = useState<string | null>(null)
  // const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [expandedProfiles, setExpandedProfiles] = useState(false)
  const router = useRouter()

  const navigation = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      description: "Overview of key metrics and summaries"
    },
    {
      id: "analytics",
      name: "Analytics", 
      icon: BarChart3,
      href: "/analytics",
      description: "Reports, performance charts, and usage stats"
    },
    {
      id: "products",
      name: "Products",
      icon: Package,
      href: "/products",
      description: "Manage product listings and details"
    },
    {
      id: "orders",
      name: "Orders",
      icon: ShoppingCart,
      href: "/orders",
      description: "Track and manage customer orders"
    },
    {
      id: "invoices",
      name: "Invoices",
      icon: FileText,
      href: "/invoices",
      description: "View and generate billing documents"
    },
    {
      id: "customers",
      name: "Customers",
      icon: Users,
      href: "/customers",
      description: "Customer database and interactions"
    },
    {
      id: "jobs",
      name: "Job Management",
      icon: Briefcase,
      href: "/jobs",
      description: "Create and manage job postings"
    },
    {
      id: "tracking",
      name: "Live Tracking",
      icon: MapPin,
      href: "/tracking",
      description: "Real-time job progress and resource tracking"
    },
    {
      id: "contractors",
      name: "Contractor Listing",
      icon: UserCheck,
      href: "/contractors",
      description: "Directory of available contractors"
    },
    {
      id: "staff",
      name: "Staff Management",
      icon: Settings,
      href: "/staff",
      description: "Administer staff accounts and permissions"
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      href: "/notifications",
      description: "Manage and view system alerts and messages"
    }
  ]

  const profileSubItems = [
    {
      id: "staff-profile",
      name: "Staff Profile",
      href: "/profiles/staff",
      description: "Manage staff member profiles"
    },
    {
      id: "lead-labour-profile", 
      name: "Lead Labour Profile",
      href: "/profiles/lead-labour",
      description: "Manage lead labour profiles"
    },
    {
      id: "labour-profile",
      name: "Labour Profile", 
      href: "/profiles/labour",
      description: "Manage labour profiles"
    }
  ]

  // const handleLogoutClick = () => {
  //   setShowLogoutDialog(true)
  // }

  const toggleProfiles = () => {
    setExpandedProfiles(!expandedProfiles)
  }

  const isActive = (href: string) => {
    return currentPath === href || (href + '/')
  }

  return (
    <>
      <aside className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col animate-fade-in shadow-sm min-h-screen h-full">
        <div className="p-4 border-b border-sidebar-border bg-gradient-to-r from-sidebar to-sidebar-accent/20">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-sm">JDP</span>
            </div>
            <div>
              <span className="font-semibold text-sidebar-foreground text-lg">JDP</span>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            // const active = isActive(item.href)
            const Icon = item.icon

            return (
              <button 
                key={item.id}
                className={`flex p-3 w-full items-center rounded-md ${activestate === item.id ? 'bg-[#0092e6c0] text-white' : 'text-sidebar-foreground'}`}
                onClick={() => { router.push(item.href); setActivestate(item.id) }}
                title={item.description}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            )
          })}

          {/* Profiles Section */}
          <div className="pt-2">
            <button
            
              onClick={toggleProfiles}
              className='flex p-3 w-full items-center rounded-md text-sidebar-foreground'
            >
              <Settings className="mr-3 h-4 w-4" />
              <span className="font-medium">Profiles</span>
              <div className="ml-auto transition-transform duration-200">
                {expandedProfiles ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>

            {expandedProfiles && (
              <div className="ml-6 mt-1 space-y-1 animate-slide-up">
                {profileSubItems.map((subItem) => {
                  const active = isActive(subItem.href)
                  
                  return (
                    <Button
                      key={subItem.id}
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      onClick={() => router.push(subItem.href)}
                      className={cn(
                        "w-full justify-start text-left text-sm sidebar-item h-8",
                        active 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      title={subItem.description}
                    >
                      <div className="w-2 h-2 rounded-full bg-current mr-3 opacity-60" />
                      <span>{subItem.name}</span>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/10">
          <Button
            variant="ghost"
            size="sm"
            // onClick={handleLogoutClick}
            className="w-full justify-start text-left logout-button h-10"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* <LogoutConfirmationDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogoutConfirm}
      /> */}
    </>
  )
}
