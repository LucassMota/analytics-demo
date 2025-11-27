"use client";

type SideBarProps = {
  children?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  isSidebarOpen?: boolean;
};

export const SidebarHeader = () => {
  return (
    <div
      className={["h-20 w-full flex items-center justify-between"].join(" ")}
    ></div>
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
        "sticky z-40 h-screen shrink-0",
        "overflow-y-auto overflow-x-hidden",
        "border-r border-[var(--gray-neutral-200)]",
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
