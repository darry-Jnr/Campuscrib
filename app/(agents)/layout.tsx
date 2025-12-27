'use client';
import localFont from "next/font/local"; // Add this!
import { useState, useCallback } from "react";
import ToasterProvider from "../providers/ToasterProvider";
import '../globals.css';
import ConditionalAgentNav from "./components/agents/ConditionalAgentNav";


const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: '100 900',
});

interface AgentsLayoutProps {
  children: React.ReactNode;
}

export default function AgentsLayout({ children }: AgentsLayoutProps) {
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // const toggleSidebar = useCallback(() => {
  //   setIsSidebarVisible(prev => !prev);
  // }, []);

  return (
    <html lang="en" className={`${satoshi.variable}`}>
      <body >
        <ToasterProvider />
{/* 
        <Sidebar 
          isVisible={isSidebarVisible} 
          onClose={toggleSidebar} 
        />

        <div className="flex flex-col min-h-screen">
          <Topbar onMenuClick={toggleSidebar} /> */}

        <ConditionalAgentNav />
          <main 
            onClick={() => setIsSidebarVisible(false)} 
            className="flex-1 p-4 md:p-6 bg-gray-50"
          >
            {children}
          </main>
      </body>
    
    </html>
  );
}
