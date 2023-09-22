import { useEffect } from "react";
import { useDarkMode, useIsMounted } from "usehooks-ts";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { isDarkMode, toggle } = useDarkMode();
  const isMounted = useIsMounted();

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", isDarkMode ? "scaffoldEthDark" : "scaffoldEth");
  }, [isDarkMode]);

  return (
    <div className={`flex space-x-2 text-sm ${className}`}>
      {/* <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-primary bg-primary"
        onChange={toggle}
        checked={isDarkMode}
      /> */}
      <button
        className={`btn btn-secondary btn-sm h-10 px-1.5 rounded-full border-1 border-slate-200 ${
          !isDarkMode ? "hover:bg-slate-200" : "hover:bg-slate-500"
        }`}
        onClick={toggle}
      >
        {isMounted() && (
          <label htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
            <SunIcon className="swap-on h-6 w-6" />
            <MoonIcon className="swap-off h-6 w-6" />
          </label>
        )}
      </button>
    </div>
  );
};
