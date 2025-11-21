"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/stores/onboarding";

export default function TutorSummary() {
  console.log("User log: === TUTOR SUMMARY PAGE LOADED ===");

  const role = useOnboardingStore((s) => s.role);
  const hydrated = useOnboardingStore((s) => s.hydrated);
  const subjectInterests = Array.from(
    useOnboardingStore((s) => s.subjectInterests),
  );
  const teachingLevels = Array.from(
    useOnboardingStore((s) => s.teachingLevels),
  );
  const yearsOfExperience = useOnboardingStore((s) => s.yearsOfExperience);
  const teachingStyle = Array.from(useOnboardingStore((s) => s.teachingStyle));
  const preferredSessionTypes = Array.from(
    useOnboardingStore((s) => s.preferredSessionTypes),
  );
  const router = useRouter();

  console.log("User log: [TUTOR SUMMARY] Role from store:", role);
  console.log("User log: [TUTOR SUMMARY] Hydrated:", hydrated);
  console.log("User log: [TUTOR SUMMARY] Subject interests:", subjectInterests);
  console.log("User log: [TUTOR SUMMARY] Teaching levels:", teachingLevels);
  console.log("User log: [TUTOR SUMMARY] Years of experience:", yearsOfExperience);
  console.log("User log: [TUTOR SUMMARY] Teaching style:", teachingStyle);
  console.log("User log: [TUTOR SUMMARY] Preferred session types:", preferredSessionTypes);

  useEffect(() => {
    console.log("User log: [TUTOR SUMMARY] useEffect triggered - hydrated:", hydrated, "role:", role);
    if (!hydrated) {
      console.log("User log: [TUTOR SUMMARY] Store not hydrated yet, skipping role check");
      return;
    }
    if (role !== "tutor") {
      console.log("User log: [TUTOR SUMMARY] ⚠️ Role is NOT tutor, redirecting to /onboarding");
      router.replace("/onboarding");
    } else {
      console.log("User log: [TUTOR SUMMARY] ✓ Role is tutor, staying on page");
    }
  }, [hydrated, role, router]);

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-white via-blue-50 to-[#43A8FF]">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <main className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white/70 p-6 shadow-sm backdrop-blur sm:mt-14 sm:p-8">
          <h2 className="font-inter mb-6 text-2xl font-semibold text-neutral-800">
            Summary
          </h2>

          <div className="space-y-4 text-neutral-800">
            <div>
              <div className="text-sm text-neutral-500">Role</div>
              <div className="font-medium">{role ?? "—"}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">Subjects Taught</div>
              <div className="font-medium">
                {subjectInterests.length ? subjectInterests.join(", ") : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">Teaching Levels</div>
              <div className="font-medium">
                {teachingLevels.length ? teachingLevels.join(", ") : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">
                Years of Experience
              </div>
              <div className="font-medium">
                {yearsOfExperience ? `${yearsOfExperience} years` : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">Teaching Style</div>
              <div className="font-medium">
                {teachingStyle.length ? teachingStyle.join(", ") : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">
                Preferred Session Types
              </div>
              <div className="font-medium">
                {preferredSessionTypes.length
                  ? preferredSessionTypes.join(", ")
                  : "—"}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              variant="brandOutline"
              className="rounded-full px-6"
            >
              <Link href="/onboarding/tutor/subjects">Back</Link>
            </Button>
            <Button
              variant="brand"
              className="rounded-full px-8 py-6 text-black"
              onClick={() => {
                console.log("User log: [TUTOR SUMMARY] 🚨 CRITICAL: Finish button clicked!");
                console.log("User log: [TUTOR SUMMARY] 🚨 BUG LOCATION: This does NOT call any API to save tutor profile!");
                console.log("User log: [TUTOR SUMMARY] 🚨 The user role will NOT be updated in the database!");
                console.log("User log: [TUTOR SUMMARY] About to navigate to /dashboard WITHOUT saving profile");
                console.log("User log: [TUTOR SUMMARY] Role from store:", role);
                console.log("User log: [TUTOR SUMMARY] Data that SHOULD be saved but WON'T:", {
                  role,
                  subjectInterests,
                  teachingLevels,
                  yearsOfExperience,
                  teachingStyle,
                  preferredSessionTypes,
                });
                router.push("/dashboard");
              }}
            >
              Finish
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
