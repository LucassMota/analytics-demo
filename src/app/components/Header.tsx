import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      role="banner"
      className={[
        "sticky top-0 z-50 w-full shadow-sm",
        "border-b border-[var(--gray-neutral-200)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between gap-3">
        {children}
      </div>
    </header>
  );
};

export default Header;
