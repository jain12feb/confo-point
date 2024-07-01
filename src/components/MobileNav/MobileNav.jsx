"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SidebarOptions } from "../../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[250px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            className="cursor-pointer sm:hidden"
            src="/icons/hamburger.svg"
            alt="menu"
            width={32}
            height={32}
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1 w-[250px]">
          <SheetHeader>
            <SheetTitle asChild>
              <Link href="/" className="flex items-center gap-1">
                <Image
                  className="max-sm:size-10"
                  src="/icons/logo.svg"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <p className="text-[26px] font-extrabold text-white">
                  ConfoPoint
                </p>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-auto">
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {SidebarOptions.map((v, i) => {
                const isActive =
                  pathname === v.route || pathname.startsWith(v.route);
                return (
                  <SheetClose key={i} asChild>
                    <Link
                      href={v.route}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-[10px] w-full max-w-60",
                        { "bg-blue-1": isActive }
                      )}
                    >
                      <Image
                        src={v.imgUrl}
                        alt={v.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{v.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
