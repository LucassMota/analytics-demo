"use client";

import LogoIcon from "./ReactIcons/LogoIcon";

type SideBarProps = {
  children?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  isSidebarOpen?: boolean;
};

export const SidebarHeader = () => {
  return (
    <div className="h-20 w-full flex items-center justify-center">
      <LogoIcon />
    </div>
  );
};

export const SideBar = ({
  children,
  className,
  isSidebarOpen,
}: SideBarProps) => {
  return (
    <aside
      id="sidebar"
      role="complementary"
      aria-label="Sidebar"
      data-open={isSidebarOpen}
      className={[
        "bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)] dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]",
        "sticky z-40 h-screen shrink-0",
        "overflow-y-auto overflow-x-hidden",
        "border-r border-[var(--gray-light-mode-300)] dark:border-[var(--gray-dark-mode-800)]",
        "transition-[width] duration-300 ease-in-out",
        isSidebarOpen ? "w-[280px]" : "w-20",
        className ?? "",
      ].join(" ")}
    >
      <div className="p-3 sm:p-4">
        <SidebarHeader />
        <div
          className={[
            "mt-1",
            "transition-opacity duration-200",
            isSidebarOpen ? "opacity-100" : "opacity-100",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
