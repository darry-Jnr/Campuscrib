"use client";

import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { usePathname } from "next/navigation";

const ConditionalAgentNav = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  if (pathname.startsWith("/agents/auth/signup") || pathname.startsWith("/agents/auth/login") || pathname.startsWith("/agents/pending")) {
    return null;
  }

  return (
    <>
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
      <div className="">
        <Topbar onMenuClick={toggleSidebar} />
      </div>
    </>
  );
};

export default ConditionalAgentNav;