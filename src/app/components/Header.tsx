import React from "react";
import Switch from "./Switch";

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({
  children,
  className,
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) => {
  return (
    <header
      role="banner"
      className={[
        "sticky top-0 z-50 w-full shadow-sm",
        "border-b border-[var(--gray-neutral-200)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="h-20 px-4 sm:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">{children}</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        <Switch />
      </div>
    </header>
  );
};

export default Header;
