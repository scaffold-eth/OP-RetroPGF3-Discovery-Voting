import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchProjects from "./SearchProjects";
import { SwitchTheme } from "./SwitchTheme";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "text-black" : "text-slate-400"
      } hover:bg-secondary focus:bg-secondary py-1.5 px-3 text-sm gap-2`}
    >
      {children}
      {isActive ? <span className="active-nav"></span> : ""}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/projects">Projects</NavLink>
      </li>
      <li className="dark:text-white">
        <NavLink href="/lists">Lists</NavLink>
      </li>
      <li className="flex sm:hidden">
        <RainbowKitCustomConnectButton />
      </li>
      <li className="md:hidden">
        <SwitchTheme className="pointer-events-auto" />
      </li>
    </>
  );

  return (
    <div className="sticky w-full lg:static top-0 gap-2 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md px-0 sm:px-2">
      <div className=" self-start ">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content flex gap-5 flex-col min-h-[100px] mt-3 pb-3 p-2 shadow bg-base-100 rounded-box w-52 dark:text-white"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/projects" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative">
            <Image alt="OP logo" className="cursor-pointer" height={22} width={160} src="/optimismLogo.png" />
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="self-center   flex-grow mr-4 max-w-[400px]">
        <SearchProjects />
      </div>
      <div className="hidden sm:flex self-end   w-fit mr-4">
        <RainbowKitCustomConnectButton />
        <SwitchTheme className="pointer-events-auto hidden md:block" />
      </div>
    </div>
  );
};
