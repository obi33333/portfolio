"use client";

import { initPlasmicLoader, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";

const projectId = process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID;
const apiToken = process.env.NEXT_PUBLIC_PLASMIC_PROJECT_API_TOKEN;

export const PLASMIC = initPlasmicLoader({
  projects:
    projectId && apiToken
      ? [
          {
            id: projectId,
            token: apiToken,
          },
        ]
      : [],
  preview: process.env.NODE_ENV !== "production",
});

export function PlasmicClientRootProvider(
  props: Omit<React.ComponentProps<typeof PlasmicRootProvider>, "loader">
) {
  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      suspenseFallback={<div className="p-8">Loading…</div>}
      {...props}
    />
  );
}

