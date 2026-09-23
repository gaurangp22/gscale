import type { Metadata } from "next";
import { InterestForm } from "@/components/india/interest-form";
import type { ProgrammeId } from "@/components/india/content";

export const metadata: Metadata = {
  title: { absolute: "Express interest · International Short-Term Programmes · Galgotias University" },
  description:
    "Express interest in the International Short-Term Programmes at Galgotias University, Greater Noida, 7–20 December 2026.",
};

const IDS = new Set(["A", "B", "C", "D"]);

export default async function ExpressInterestPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { programme } = await searchParams;
  const initial = typeof programme === "string" && IDS.has(programme) ? (programme as ProgrammeId) : undefined;
  return <InterestForm initialProgramme={initial} />;
}
