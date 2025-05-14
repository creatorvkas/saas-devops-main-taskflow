"use client";

import { FC, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  Tag, 
  Settings, 
  Zap,
  Timer,
  FileText,
  PanelLeft,
  ChevronRight,
  ChevronLeft,
  FolderKanban,
  Target,
  CreditCard,
  Bell,
  LogOut,
  User,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    title: "Upcoming",
    href: "/upcoming",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Focus",
    href: "/focus",
    icon: <Timer className="h-5 w-5" />,
  },
  {
    title: "Docs",
    href: "/docs",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Tags",
    href: "/tags",
    icon: <Tag className="h-5 w-5" />,
  },
  {
    title: "Automations",
    href: "/automations",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio(''));
    setClickSound(new Audio('https://www.soundjay.com/buttons/sounds/button-32.mp3'));

    return () => {
      if (hoverSound) {
        hoverSound.pause();
        hoverSound.currentTime = 0;
      }
      if (clickSound) {
        clickSound.pause();
        clickSound.currentTime = 0;
      }
    };
  }, []);

  const playHoverSound = () => {
    if (hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const playClickSound = () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(e => console.log("Audio play failed:", e));
    }
  };
  
  return (
    <div className={cn("relative flex flex-col", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-4 translate-x-1/2 z-10 hidden md:flex"
        onClick={() => {
          playClickSound();
          setCollapsed(!collapsed);
        }}
        onMouseEnter={playHoverSound}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    
      <motion.div 
        className={cn(
          "flex h-screen border-r bg-background",
          collapsed ? "w-16" : "w-64"
        )}
        initial={false}
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="flex flex-col w-full">
          <div className="px-4 py-6">
            <motion.div 
              className="flex items-center gap-2"
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="h-6 w-6 text-primary" />
              <span className={cn(
                "font-bold text-xl transition-opacity", 
                collapsed ? "opacity-0" : "opacity-100"
              )}>
                TaskFlow
              </span>
            </motion.div>
          </div>
          <ScrollArea className="flex-1">
            <nav className="grid gap-1 px-2">
              {sidebarLinks.map((link) => (
                <motion.div 
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                      pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    {link.icon}
                    <span className={cn(
                      "transition-opacity",
                      collapsed ? "opacity-0 w-0 h-0 overflow-hidden" : "opacity-100"
                    )}>
                      {link.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto p-4">
            <Separator className="mb-4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">Jane Doe</span>
                      <span className="text-xs text-muted-foreground">jane@example.com</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />                
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    </div>
  );
};