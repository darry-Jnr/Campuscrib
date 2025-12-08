// components/navbar/ConditionalBottomNav.tsx
'use client';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

const ConditionalBottomNav = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/apartment') ) return null;
  return (
  <BottomNav />
  );
};

export default ConditionalBottomNav;
