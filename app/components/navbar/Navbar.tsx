'use client';

import Container from '../Container';
import Logo from './Logo';
import BecomeAgent from './BecomeAgent';
import Usermenu from './Usermenu';
import { auth } from '@/lib/auth';


type Session = typeof auth.$Infer.Session

const Navbar = ({session}: {session: Session | null}) => {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10">
      <div className="py-4 border-b">
        <Container>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo />
            
            <div className="flex flex-row items-center gap-3">
              {/* <BecomeAgent /> */}
              <Usermenu session={session}/>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;