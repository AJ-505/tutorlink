import "server-only";
import { api } from "@/trpc/server";
import { Suspense } from "react";

async function ProfileContent() {
  const [student, tutor] = await Promise.all([
    api.student.getProfile(),
    api.tutor.getProfile(),
  ]);

  return (
    <p className="text-sm text-neutral-600">
      Prefill coming from your current{" "}
      {tutor ? "tutor" : student ? "student" : "—"} profile.
    </p>
  );
}

export default function EditProfilePage() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold text-neutral-900">Edit profile</h1>
      <Suspense fallback={<div className="h-6 w-64 animate-pulse rounded bg-gray-200" />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
