import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "./ui/input";
import { Bell, Search, Settings, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { NotificationPopup } from "./ui/NotificationPopup";


interface HeaderProps {

  onLogout: () => void;
  onNotificationViewAll: () => void;
  onProfileClick: () => void;
}
const Header = ({

  onLogout,
  onNotificationViewAll,
  onProfileClick,
}: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: "1",
      title: "New Order Received",
      message: "Order #12345 has been placed by John Doe",
      time: "2 minutes ago",
      type: "order" as const,
      unread: true,
    },
    {
      id: "2",
      title: "Payment Confirmed",
      message: "Payment of $1,250 has been confirmed for Invoice #INV-001",
      time: "15 minutes ago",
      type: "payment" as const,
      unread: true,
    },
    {
      id: "3",
      title: "Low Stock Alert",
      message: "Product 'Steel Beams' is running low in inventory",
      time: "1 hour ago",
      type: "inventory" as const,
      unread: false,
    },
    {
      id: "4",
      title: "Task Completed",
      message: "John Smith has completed the installation task",
      time: "3 hours ago",
      type: "task" as const,
      unread: false,
    },
    {
      id: "4",
      title: "Task Completed",
      message: "John Smith has completed the installation task",
      time: "3 hours ago",
      type: "task" as const,
      unread: false,
    },
    {
      id: "4",
      title: "Task Completed",
      message: "John Smith has completed the installation task",
      time: "3 hours ago",
      type: "task" as const,
      unread: false,
    },
    {
      id: "4",
      title: "Task Completed",
      message: "John Smith has completed the installation task",
      time: "3 hours ago",
      type: "task" as const,
      unread: false,
    },
      {
      id: "4",
      title: "Task Completed",
      message: "John Smith has completed the installation task",
      time: "3 hours ago",
      type: "task" as const,
      unread: false,
    },
 
   
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;
    const unreadCountleingth = notifications.length;
  return (
    <>
      <TooltipProvider>
        <div className="bg-card border-b border-gray-400 px-6 py-4 animate-fade-in shadow-sm flex items-center  justify-between">
          <h1 className="text-2xl font-medium text-foreground">Dashboard</h1>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 pl-9 transition-all duration-200 focus:w-80 bg-input-background border-border"
              />
            </div>



            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="notification-button relative"
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCountleingth > 0 && (
                      <>

                        <Badge
                          variant="danger"
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs notification-badge animate-bounce-in"

                        >
                          {unreadCountleingth > 9 ? "9+" : unreadCountleingth}
                        </Badge>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
                  </p>
                </TooltipContent>
              </Tooltip>

              {showNotifications && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <NotificationPopup
                      notifications={notifications}
                      onClose={() => setShowNotifications(false)}
                      onViewAll={onNotificationViewAll}
                    />
                  </div>
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="profile-button">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/assets/images/avatars/admin-user.jpg" alt="Admin" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 animate-scale-in"
                sideOffset={5}
              >
                <DropdownMenuLabel>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/assets/images/avatars/admin-user.jpg" alt="Admin" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">admin@jdp.com</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="logout-button cursor-pointer"
                >
                  <div className="flex items-center">
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </TooltipProvider>
    </>
  );
};

export default Header;
