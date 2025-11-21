"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/stores/onboarding";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function StudentSummary() {
  console.log("User log: === STUDENT SUMMARY PAGE LOADED ===");

  const router = useRouter();
  const {
    role,
    hydrated,
    goals,
    style,
    preferredTutorGender,
    subjectInterests,
    reset,
  } = useOnboardingStore();

  console.log("User log: [STUDENT SUMMARY] Role from store:", role);
  console.log("User log: [STUDENT SUMMARY] Hydrated:", hydrated);
  console.log("User log: [STUDENT SUMMARY] Goals:", Array.from(goals));
  console.log("User log: [STUDENT SUMMARY] Learning style:", Array.from(style));
  console.log("User log: [STUDENT SUMMARY] Preferred tutor gender:", preferredTutorGender);
  console.log("User log: [STUDENT SUMMARY] Subject interests:", Array.from(subjectInterests));

  const { mutate: createProfile, isPending } =
    api.student.createProfile.useMutation({
      onSuccess: () => {
        console.log("User log: [STUDENT SUMMARY] ✅ API SUCCESS: Student profile created!");
        toast.success("Profile created successfully!");
        reset();
        console.log("User log: [STUDENT SUMMARY] Store reset, navigating to /dashboard");
        router.push("/dashboard");
      },
      onError: (error) => {
        console.log("User log: [STUDENT SUMMARY] ❌ API ERROR:", error.message);
        console.log("User log: [STUDENT SUMMARY] Full error:", error);
        toast.error(error.message);
      },
    });

  useEffect(() => {
    console.log("User log: [STUDENT SUMMARY] useEffect triggered - hydrated:", hydrated, "role:", role);
    if (!hydrated) {
      console.log("User log: [STUDENT SUMMARY] Store not hydrated yet, skipping role check");
      return;
    }
    if (role !== "student") {
      console.log("User log: [STUDENT SUMMARY] ⚠️ Role is NOT student, redirecting to /onboarding");
      router.replace("/onboarding");
    } else {
      console.log("User log: [STUDENT SUMMARY] ✓ Role is student, staying on page");
    }
  }, [hydrated, role, router]);

  const handleFinish = () => {
    const payload = {
      goals: Array.from(goals),
      learningStyle: Array.from(style),
      preferredTutorGender: preferredTutorGender ?? undefined,
      subjectsOfInterest: Array.from(subjectInterests),
    };
    console.log("User log: [STUDENT SUMMARY] 🚀 Finish button clicked! Calling API...");
    console.log("User log: [STUDENT SUMMARY] Role being sent:", role);
    console.log("User log: [STUDENT SUMMARY] Payload being sent:", payload);
    console.log("User log: [STUDENT SUMMARY] ✓ This DOES call the API to save profile (unlike tutor)");
    createProfile(payload);
  };

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
              <div className="text-sm text-neutral-500">Goals</div>
              <div className="font-medium">
                {goals.size > 0 ? Array.from(goals).join(", ") : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">Learning Style</div>
              <div className="font-medium">
                {style.size > 0 ? Array.from(style).join(", ") : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">
                Subjects of Interest
              </div>
              <div className="font-medium">
                {subjectInterests.size > 0
                  ? Array.from(subjectInterests).join(", ")
                  : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-neutral-500">
                Preferred Tutor Gender
              </div>
              <div className="font-medium">{preferredTutorGender ?? "—"}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              variant="brandOutline"
              className="rounded-full px-6"
            >
              <Link href="/onboarding/student/subjects">Back</Link>
            </Button>
            <Button
              variant="brand"
              className="rounded-full px-8 py-6 text-black"
              onClick={handleFinish}
              disabled={isPending}
            >
              {isPending ? "Finishing..." : "Finish"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
