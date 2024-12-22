import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link href="/">
        <Image src="/logo.png" alt="Bakery Logo" className="h-10" />
      </Link>
    </div>
  );
};

export default Logo;
