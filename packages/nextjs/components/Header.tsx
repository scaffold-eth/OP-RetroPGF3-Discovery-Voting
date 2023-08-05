import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SwitchTheme } from "./SwitchTheme";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import BallotComponent from "./ballot/Ballot";

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
      <li>
        <NavLink href="/lists">Lists</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md px-0 sm:px-2 py-4">
      <div className="navbar-start w-1/3 ">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative">
            <Image alt="OP logo" className="cursor-pointer" height={22} width={160} src="/optimismLogo.png" />
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-center w-1/3 flex-grow">
        <label className="w-full">
          <MagnifyingGlassIcon className="pointer-events-none absolute mr-2 w-8 h-6 top-4 pl-2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or lists"
            className="input input-info input-bordered bg-secondary border-slate-200 w-full min-w-full pl-10 rounded-md h-10"
          />
        </label>
      </div>
      <div className="navbar-end w-1/3 flex-grow mr-4">
        <BallotComponent />
        <RainbowKitCustomConnectButton />
        <SwitchTheme className="pointer-events-auto" />
      </div>
    </div>
  );
};
