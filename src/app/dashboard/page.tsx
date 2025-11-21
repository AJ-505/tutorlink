"use client";
import dynamic from "next/dynamic";

const TutorSearch = dynamic(
  () => import("./_components/tutor-search").then((mod) => mod.TutorSearch),
  {
    loading: () => (
      <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
    ),
    ssr: false,
  },
);

const RecommendedTutors = dynamic(
  () =>
    import("./_components/recommended-tutors").then(
      (mod) => mod.RecommendedTutors,
    ),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>
    ),
    ssr: false,
  },
);

export default function DashboardHome() {
  // TODO: Update this - A generic name was used here because auth was avoided
  const name = "there";

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-inter text-2xl font-semibold text-neutral-900">
          Welcome back{name ? ` ${name}` : ""}!
        </h1>
        <p className="text-neutral-600">Jump back into learning</p>
      </header>

      {/* Tutor Search */}
      <section>
        <TutorSearch />
      </section>

      <section>
        <RecommendedTutors />
      </section>
    </div>
  );
}
