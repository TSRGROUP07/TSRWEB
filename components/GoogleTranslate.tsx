"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
    const googleTranslateRef = useRef<HTMLDivElement>(null);

    const initTranslate = () => {
        if (
            window.google &&
            window.google.translate &&
            window.google.translate.TranslateElement
        ) {
            if (!document.querySelector(".goog-te-combo")) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "tr",
                        layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE || 0,
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            }
        }
    };

    useEffect(() => {
        // If script is already loaded (e.g. navigation back)
        if (window.google?.translate?.TranslateElement) {
            initTranslate();
        }
    }, []);

    return (
        <div className="google-translate-container">
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="lazyOnload"
                onLoad={() => {
                    window.googleTranslateElementInit = initTranslate;
                    // In case it's already defined or we need to trigger it
                    setTimeout(initTranslate, 1000);
                }}
            />
            <div id="google_translate_element" ref={googleTranslateRef}></div>
            <style jsx global>{`
        .google-translate-container {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9999;
            background: white;
            padding: 5px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        /* Gizle üst barı */
        .goog-te-banner-frame.skiptranslate {
            display: none !important;
        } 
        body {
            top: 0px !important; 
        }
        /* Widget stili */
        .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            font-size: 14px !important;
        }
      `}</style>
        </div>
    );
}
