"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreateSidebar } from "@/store/use-createsidebar";
import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessagesSquare, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {}

function Navigation(props: Props) {
  const {} = props;

  const { user } = useUser();

  const pathName = usePathname();

  const { collapsed } = useCreateSidebar((state) => state);

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessagesSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="gap-y-3 px-2 flex flex-col items-start w-full">
        {[...Array(3)].map((_, index) => (
          <NavigationSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn("gap-y-3 px-2 flex flex-col items-start ", {
        "items-center pt-8 lg:pt-0": collapsed,
      })}
    >
      {routes.map((route) => (
        <li
          className={cn(" rounded-lg", {
            "bg-gray-100/5": pathName === route.href,
            "w-full": !collapsed,
          })}
          key={route.label}
        >
          <Link
            href={route.href}
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <route.icon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className={cn("hidden ml-3", { "lg:flex": !collapsed })}>
              {route.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;

export function NavigationSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2 w-full">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-10" />
      </div>
    </li>
  );
}
