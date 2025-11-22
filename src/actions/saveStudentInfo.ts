"use server";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/server";
import { type inferProcedureInput } from "@trpc/server";

type CreateStudentProfileProcedure = AppRouter["student"]["createProfile"];
type StudentProfileInput = inferProcedureInput<CreateStudentProfileProcedure>;

export async function saveStudentInfo(studentInfo: StudentProfileInput) {
  console.log("Student profile being created......");
  await api.student.createProfile(studentInfo);
  console.log("Student profile created......");
}
