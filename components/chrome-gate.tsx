"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Routes that run full-bleed, without the site's navigation, footer or
 * pointer furniture. The Learn in India film brings its own minimal HUD.
 */
const BARE = ["/learn-in-india"];

export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (BARE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
