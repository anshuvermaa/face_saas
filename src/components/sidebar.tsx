"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { FreeCounter } from "@/components/free-counter";
import {
  ArrowLeftRight,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Chat Conversation",
    icon: MessageSquare,
    href: "/chat",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "lipsync",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/lipsync",
  },
  {
    label: "faceswap",
    icon: ArrowLeftRight,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/faceswap",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];



export const Sidebar = (
  {
    apiLimitCount = 0,
    isPro = false,
    plan="free",
    limit
  }: {
    apiLimitCount: number;
    isPro: boolean;
    plan?:string
    limit?:number
  }
) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
    <div className="px-3 py-2 flex-1">
      <Link href="/dashboard" className="flex items-center pl-3 mb-14">
        <div className="relative h-10 w-10 mr-4">
          <Image className="rounded-md" fill alt="Logo" src="/logo.jpg" />
        </div>
        <h1 className={cn("text-2xl font-bold", poppins.className)}>
          Stable diffusion
        </h1>
      </Link>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href} 
            href={route.href}
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
              pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
            )}
          >
            <div className="flex items-center flex-1">
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
    <FreeCounter 
      apiLimitCount={apiLimitCount} 
      isPro={isPro}
      plan={plan}
      limit={limit}
    />
  </div>
  );
};
