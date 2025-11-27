import React from "react";

type SideBarProps = {
  children?: React.ReactNode;
  className?: string;
};

export const SideBar = ({ children, className }: SideBarProps) => {
  return (
    <aside
      role="complementary"
      aria-label="Sidebar"
      className={[
        "sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto",
        "border-r border-[var(--gray-neutral-200)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="p-3 sm:p-4">{children}</div>
    </aside>
  );
};

export default SideBar;
