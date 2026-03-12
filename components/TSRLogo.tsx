"use client";

import Image from "next/image";
import Link from "next/link";

export default function TSRLogo({ 
  className = "", 
  isScrolled = false 
}: { 
  className?: string;
  isScrolled?: boolean;
}) {
  return (
    <Link href="/" prefetch={true} className={className}>
      <Image 
        src="/KHY.jpeg" 
        alt="TSR GROUP Logo" 
        width={220} 
        height={88} 
        className="h-20 w-auto object-contain"
        priority
        unoptimized
        style={{ mixBlendMode: 'normal' }}
      />
    </Link>
  );
}
