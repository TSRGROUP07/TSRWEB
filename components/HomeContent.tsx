"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Lazy load ağır bileşenler
const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const ServicesOverview = dynamic(() => import("@/components/ServicesOverview"), { ssr: false });
const CompanyAbout = dynamic(() => import("@/components/CompanyAbout"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const Features = dynamic(() => import("@/components/Features"), { ssr: false });
const BlogCards = dynamic(() => import("@/components/BlogCards"), { ssr: false });
const AnalyticsMap = dynamic(() => import("@/components/AnalyticsMap"), { ssr: false });
const PropertyCalculator = dynamic(() => import("@/components/PropertyCalculator"), { ssr: false });
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: false });

// Intersection Observer ile lazy loading için hook
function useIntersectionObserver(ref: React.RefObject<HTMLElement>, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

export default function HomeContent() {
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const showStats = useIntersectionObserver(statsRef);
  const showServices = useIntersectionObserver(servicesRef);
  const showCompany = useIntersectionObserver(companyRef);
  const showAbout = useIntersectionObserver(aboutRef);
  const showFeatures = useIntersectionObserver(featuresRef);
  const showBlog = useIntersectionObserver(blogRef);
  const showMap = useIntersectionObserver(mapRef);
  const showCalculator = useIntersectionObserver(calculatorRef);
  const showNewsletter = useIntersectionObserver(newsletterRef);

  return (
    <>
      {/* Neden TSR GROUP'u seçmelisiniz? */}
      <div ref={statsRef}>
        {showStats && <Stats />}
      </div>

      {/* Ne İş Yapıyoruz? Bölümü */}
      <div ref={servicesRef}>
        {showServices && <ServicesOverview />}
      </div>

      {/* Şirket Hakkında Bölümü */}
      <div ref={companyRef}>
        {showCompany && <CompanyAbout />}
      </div>

      {/* Hakkında Bölümü */}
      <div ref={aboutRef}>
        {showAbout && <AboutSection />}
      </div>

      {/* Özellikler */}
      <div ref={featuresRef}>
        {showFeatures && <Features />}
      </div>

      {/* Blog/Haber Kartları */}
      <div ref={blogRef}>
        {showBlog && <BlogCards />}
      </div>

      {/* Analitik Harita Bölümü */}
      <div ref={mapRef}>
        {showMap && <AnalyticsMap />}
      </div>

      {/* Gayrimenkul Hesaplayıcı */}
      <div ref={calculatorRef}>
        {showCalculator && <PropertyCalculator />}
      </div>

      {/* Newsletter */}
      <div ref={newsletterRef}>
        {showNewsletter && <Newsletter />}
      </div>
    </>
  );
}
