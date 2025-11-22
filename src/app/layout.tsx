import "@/styles/globals.css";

import { type Metadata } from "next";
import { cal, inter } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "TutorLink - Connect with Verified Tutors",
  description: "Link up with verified tutors and get AI-powered study notes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${cal.variable} scroll-smooth antialiased`}
      >
        <body className="font-primary antialiased">
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
