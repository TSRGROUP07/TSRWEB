import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E0F2F1',   // Çok Açık Buz Yeşili
          100: '#B2DFDB',
          200: '#80CBC4',   // Açık Aqua/Nane
          300: '#4DB6AC',
          400: '#26A69A',
          500: '#189BA3',   // Canlı Turkuaz (ana vurgu)
          600: '#00897B',
          700: '#00796B',
          800: '#00695C',
          900: '#004B4D',   // Koyu Teal (Petrol)
        },
        teal: {
          dark: '#004B4D',      // Koyu Teal (Petrol) - "BUILDING THE FUTURE" arka plan
          vibrant: '#189BA3',  // Canlı Turkuaz - Logo vurgu
          light: '#80CBC4',    // Açık Aqua/Nane - Butonlar, ikincil dolgu
          ice: '#E0F2F1',      // Çok Açık Buz Yeşili - Kartvizit zeminleri
        },
        dark: {
          green: '#004B4D',    // Koyu Teal olarak güncellendi
          'green-light': '#189BA3',  // Canlı Turkuaz
          'green-dark': '#003A3C',    // Daha koyu teal
          brown: '#3d2817',
          'brown-light': '#5a3d28',
          'brown-dark': '#2a1a0f',
        },
        // Modern Mor/Mavi Paleti (Yeşil ile uyumlu)
        purple: {
          50: '#F3E5F5',
          100: '#E1BEE7',
          200: '#CE93D8',
          300: '#BA68C8',  // Medium purple
          400: '#AB47BC',  // Vibrant purple
          500: '#9C27B0',  // Classic purple
          600: '#8E24AA',  // Deep purple
          700: '#7B1FA2',  // Dark purple
          800: '#6A1B9A',  // Very dark purple
          900: '#4A148C',  // Almost black purple
        },
        // Modern Cyan/Mavi Paleti
        cyan: {
          50: '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',  // Light cyan
          400: '#26C6DA',  // Medium cyan
          500: '#00BCD4',  // Classic cyan
          600: '#00ACC1',  // Deep cyan
          700: '#0097A7',  // Dark cyan
          800: '#00838F',  // Very dark cyan
          900: '#006064',  // Almost black cyan
        },
        // Altın/Turuncu Paleti (Lüks hissi)
        gold: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',  // Light gold
          400: '#FFCA28',  // Medium gold
          500: '#FFC107',  // Classic gold
          600: '#FFB300',  // Deep gold
          700: '#FFA000',  // Dark gold
          800: '#FF8F00',  // Very dark gold
          900: '#FF6F00',  // Orange gold
        },
      },
    },
  },
  plugins: [],
};
export default config;




