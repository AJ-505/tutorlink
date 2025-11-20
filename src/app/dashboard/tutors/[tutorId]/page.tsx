import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TutorProfileView } from "./_components/tutor-profile-view";

export async function generateStaticParams() {
  return [{ tutorId: "__placeholder__" }];
}

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) {
  const { tutorId } = await params;

  if (tutorId === "__placeholder__") {
    notFound();
  }

  return (
    <Suspense fallback={<div className="h-32 animate-pulse rounded bg-gray-200" />}>
      <TutorProfileView tutorId={tutorId} />
    </Suspense>
  );
}
