"use client";
import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

type ActiveClass =
  | "#home"
  | "#about"
  | "#how-it-works"
  | "#find-tutors"
  | "#edu-feed"
  | "#contact";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ActiveClass>("#home");

  return (
    <nav className="tl-nav flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-6">
      <Link
        href="/"
        onClick={() => setActive("#home")}
        className="flex items-center gap-1 text-xl font-bold"
      >
        <span className="font-geist text-neutral-900">Tutor</span>
        <span className="font-poppins text-[#1E88FF]">Link</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="font-poppins">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  onClick={() => setActive("#home")}
                  className={cn(
                    "text-sm font-medium",
                    active === "#home"
                      ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs hover:text-black!"
                      : "text-neutral-700 hover:text-neutral-900",
                  )}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#about"
                  onClick={() => setActive("#about")}
                  className={cn(
                    "text-sm font-medium",
                    active === "#about"
                      ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs hover:text-black!"
                      : "text-neutral-700 hover:text-neutral-900",
                  )}
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#how-it-works"
                  onClick={() => setActive("#how-it-works")}
                  className={cn(
                    "text-sm font-medium",
                    active === "#how-it-works"
                      ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs hover:text-black!"
                      : "text-neutral-700 hover:text-neutral-900",
                  )}
                >
                  How It Works
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/dashboard"
                  onClick={() => setActive("#find-tutors")}
                  className={cn(
                    "text-sm font-medium",
                    active === "#find-tutors"
                      ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs hover:text-black!"
                      : "text-neutral-700 hover:text-neutral-900",
                  )}
                >
                  Find Tutors
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#edu-feed"
                  onClick={() => setActive("#edu-feed")}
                  className={cn(
                    "text-sm font-medium",
                    active === "#edu-feed"
                      ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs hover:text-black!"
                      : "text-neutral-700 hover:text-neutral-900",
                  )}
                >
                  Edu Feed
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#contact"
                  onClick={() => setActive("#contact")}
                  className={cn(
                    "text-sm font-medium",
                    active === "#contact"
                      ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs hover:text-black!"
                      : "text-neutral-700 hover:text-neutral-900",
                  )}
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop CTAs */}
      <div className="hidden items-center gap-3 md:flex">
        <SignInButton>
          <Button
            variant="brandOutline"
            size="lg"
            className="cursor-pointer rounded-full"
          >
            Log in
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button
            variant="brand"
            size="lg"
            className="cursor-pointer rounded-full shadow-md hover:text-black/90!"
          >
            Sign up
          </Button>
        </SignUpButton>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild aria-controls="radix-_R_46atnlb_">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 px-3">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">
              The navigation menu for Tutorlink's homepage
            </SheetDescription>
            <div className="font-poppins mt-6 flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => {
                  setActive("#home");
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  active === "#home"
                    ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs"
                    : "rounded-full text-neutral-700 hover:bg-[--brand-100] hover:text-neutral-900",
                )}
              >
                Home
              </Link>
              <Link
                href="#about"
                onClick={() => {
                  setActive("#about");
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  active === "#about"
                    ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs"
                    : "rounded-full text-neutral-700 hover:bg-[--brand-100] hover:text-neutral-900",
                )}
              >
                About
              </Link>
              <Link
                href="#how-it-works"
                onClick={() => {
                  setActive("#how-it-works");
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  active === "#how-it-works"
                    ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs"
                    : "rounded-full text-neutral-700 hover:bg-[--brand-100] hover:text-neutral-900",
                )}
              >
                How It Works
              </Link>
              <Link
                href="/dashboard"
                onClick={() => {
                  setActive("#find-tutors");
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  active === "#find-tutors"
                    ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs"
                    : "rounded-full text-neutral-700 hover:bg-[--brand-100] hover:text-neutral-900",
                )}
              >
                Find Tutors
              </Link>
              <Link
                href="#edu-feed"
                onClick={() => {
                  setActive("#edu-feed");
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  active === "#edu-feed"
                    ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs"
                    : "rounded-full text-neutral-700 hover:bg-[--brand-100] hover:text-neutral-900",
                )}
              >
                Edu Feed
              </Link>
              <Link
                href="#contact"
                onClick={() => {
                  setActive("#contact");
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  active === "#contact"
                    ? "rounded-full bg-[--brand-100] text-[#1E88FF] shadow-xs"
                    : "rounded-full text-neutral-700 hover:bg-[--brand-100] hover:text-neutral-900",
                )}
              >
                Contact
              </Link>

              {/* Mobile CTAs */}
              <div className="mt-4 flex flex-col gap-2">
                <SignUpButton>
                  <Button
                    variant="brand"
                    size="lg"
                    className="cursor-pointer rounded-full shadow-md"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </Button>
                </SignUpButton>
                <SignInButton>
                  <Button
                    variant="brandOutline"
                    size="lg"
                    className="cursor-pointer rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Button>
                </SignInButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
