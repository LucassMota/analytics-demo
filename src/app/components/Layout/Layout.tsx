"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-row">
      <SideBar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <div className="min-h-screen w-full flex flex-col">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <main role="main" className="flex-1 min-w-0 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
