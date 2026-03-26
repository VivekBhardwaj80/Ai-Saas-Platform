"use client";
import dynamic from "next/dynamic";
// import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { useEffect } from "react";

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false }
);
const Header = () => {
  const pathname = usePathname();
  
  return (
    <div className="flex items-center p-4 justify-between shadow-sm bg-secondary">
      <Image src={"/logo.svg"} alt="Logo" width={70} height={100} />
      <ul className="items-center gap-6 hidden md:flex">
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard" && "text-primary font-bold"}`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard/questions" && "text-primary font-bold"}`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard/upgrade" && "text-primary font-bold"}`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard/how" && "text-primary font-bold"}`}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
