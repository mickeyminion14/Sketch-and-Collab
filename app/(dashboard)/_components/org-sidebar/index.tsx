"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../../../lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "../../../../components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BORDER_COLOR } from "../../../../lib/colors";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href={""}>
        <div className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} height={60} width={60} alt="logo" />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: `1px solid ${BORDER_COLOR}`,
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
        hidePersonal
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size={"lg"}
          className="font-normal justify-start w-full px-2"
        >
          <Link href={"/"}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size={"lg"}
          className="font-normal justify-start w-full px-2"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
