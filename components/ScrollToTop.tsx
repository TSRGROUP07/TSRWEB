"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ScrollToTop() {
  const tCommon = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl mr-20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      aria-label={tCommon('scrollToTop')}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dairesel "UP PAGE" yazısı - SVG ile */}
        <svg
          className="absolute inset-0 w-full h-full rotate-0"
          viewBox="0 0 64 64"
        >
          <defs>
            <path
              id="circle-path"
              d="M 32,32 m -20,0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0"
            />
          </defs>
          <text
            fontSize="4"
            fill="white"
            fontFamily="Arial, sans-serif"
            letterSpacing="1"
          >
            <textPath href="#circle-path" startOffset="0%">
              UP PAGE • UP PAGE • UP PAGE • UP PAGE • UP PAGE • UP PAGE • UP PAGE • UP PAGE
            </textPath>
          </text>
        </svg>
        {/* Merkez ok */}
        <ChevronUp className="h-6 w-6 relative z-10" />
      </div>
    </button>
  );
}

