import { Cormorant_Garamond, Newsreader } from "next/font/google";
import "./india.css";
import "./film.css";

/* Type for these two pages.
   Newsreader carries the form, where it has to be read at length.
   The film is titled in Cormorant Garamond — a high-contrast display
   face with a proper swash italic, used for the title card and headings.
   The site's Geist carries all running text. */
const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--lii-serif",
  display: "swap",
});
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--lii-display",
  display: "swap",
});
export default function LearnInIndiaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`lii ${serif.variable} ${display.variable}`}>{children}</div>;
}
