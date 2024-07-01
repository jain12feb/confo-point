"use client";

import { usePathname } from "next/navigation";
import { SidebarOptions } from "../../constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[251px]">
      <div className="flex flex-1 flex-col gap-6">
        {SidebarOptions.map((v, i) => {
          const isActive = pathname === v.route || pathname.startsWith(v.route);
          return (
            <Link
              key={i}
              href={v.route}
              className={cn(
                "flex gap-4 items-center p-4 rounded-[10px] justify-start",
                { "bg-blue-1": isActive }
              )}
            >
              <Image src={v.imgUrl} alt={v.label} width={24} height={24} />
              <p className="text-lg font-semibold max-lg:hidden">{v.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
