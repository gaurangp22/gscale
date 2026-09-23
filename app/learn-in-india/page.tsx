import type { Metadata } from "next";
import { Hud } from "@/components/india/film/hud";
import { SceneTaj } from "@/components/india/film/scene-taj";
import { SceneDelhi } from "@/components/india/film/scene-delhi";
import { SceneQutub } from "@/components/india/film/scene-qutub";
import { SceneLT } from "@/components/india/film/scene-lt";
import { SceneJantar } from "@/components/india/film/scene-jantar";
import { SceneProgrammes } from "@/components/india/film/scene-programmes";
import { SceneAgra } from "@/components/india/film/scene-agra";
import { SceneFinale } from "@/components/india/film/scene-finale";
import { Notes } from "@/components/india/film/notes";

export const metadata: Metadata = {
  title: { absolute: "Learn in India · International Short-Term Programmes · Galgotias University" },
  description:
    "Four 10–12 day interdisciplinary international programmes at Galgotias University, three with Larsen & Toubro. 7–20 December 2026, Greater Noida. For partner institutions nominating students.",
};

/* The page is a film: dawn at the Taj, dusk at Agra Fort, night at the Red Fort. */
export default function LearnInIndiaPage() {
  return (
    <div className="film">
      <Hud />
      <SceneTaj />
      <SceneDelhi />
      <SceneQutub />
      <SceneLT />
      <SceneJantar />
      <SceneProgrammes />
      <SceneAgra />
      <SceneFinale />
      <Notes />
    </div>
  );
}
