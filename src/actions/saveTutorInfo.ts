"use server";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/server";
import { type inferProcedureInput } from "@trpc/server";

type CreateTutorProfileProcedure = AppRouter["tutor"]["createProfile"];
type TutorProfile = inferProcedureInput<CreateTutorProfileProcedure>;

export async function saveTutorInfo(tutorInfo: TutorProfile) {
  console.log("Tutor profile being created......");
  await api.tutor.createProfile(tutorInfo);

  console.log("Tutor profile created......");
}
