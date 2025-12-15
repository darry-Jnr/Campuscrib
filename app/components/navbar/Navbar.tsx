'use client';

import Container from '../Container';
import Logo from './Logo';
import BecomeAgent from './BecomeAgent';
import Usermenu from './Usermenu';

const Navbar = () => {
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
              <BecomeAgent />
              <Usermenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;