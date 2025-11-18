import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const cal = localFont({
  src: "./fonts/CalSans-Regular.ttf",
  display: "swap",
  variable: "--font-cal",
});

export const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  preload: true,
  variable: "--font-inter",
});
