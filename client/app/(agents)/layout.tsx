'use client';

import { useState, useCallback } from "react";
import { Raleway } from "next/font/google";
import Sidebar from "./components/agents/Sidebar";
import Topbar from "./components/agents/Topbar";
import ToasterProvider from "../providers/ToasterProvider";
import '../globals.css';

const font = Raleway({ subsets: ["latin"] });

interface AgentsLayoutProps {
  children: React.ReactNode;
}

export default function AgentsLayout({ children }: AgentsLayoutProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible(prev => !prev);
  }, []);

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <Sidebar 
          isVisible={isSidebarVisible} 
          onClose={toggleSidebar} 
        />

        <div className="flex flex-col min-h-screen">
          <Topbar onMenuClick={toggleSidebar} />

          <main 
            onClick={() => setIsSidebarVisible(false)} 
            className="flex-1 p-4 md:p-6 bg-gray-50"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
