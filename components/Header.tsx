"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false }
);
const Header = () => {
  const pathname = usePathname();
  const router = useRouter()
  
  return (
    <div className="flex items-center p-4 justify-between shadow-sm bg-secondary">
      <Image src={"/logo.svg"} alt="Logo" width={70} height={100} />
      <ul className="items-center gap-6 hidden md:flex">
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard" && "text-primary font-bold"}`}
          onClick={()=>router.push('/dashboard')}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard/questions" && "text-primary font-bold"}`}
          onClick={()=>router.push('/dashboard/questions')}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard/upgrade" && "text-primary font-bold"}`}
          onClick={()=>router.push('/dashboard/upgrade')}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${pathname == "/dashboard/work" && "text-primary font-bold"}`}
          onClick={()=>router.push('/dashboard/work')}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
