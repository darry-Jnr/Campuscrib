'use client';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

const ConditionalBottomNav = () => {
  const pathname = usePathname();

  // Hide BottomNav on certain pages
  if (pathname.startsWith('/apartment') || pathname.startsWith('/auth')) return null;

  return <BottomNav />;
};

export default ConditionalBottomNav;
