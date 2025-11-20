"use client";

export function TutorProfileView({ tutorId }: { tutorId: string }) {
  return (
    <div>
      <h1 className="text-xl font-semibold">Tutor Profile</h1>
      <p>Tutor ID: {tutorId}</p>
    </div>
  );
}
