"use client";

import { PlasmicComponent } from "@plasmicapp/loader-nextjs";

import { PlasmicClientRootProvider } from "@/plasmic-init-client";

type Props = {
  path?: string[];
};

function getPlasmicPath(path: string[] | undefined) {
  const parts = path ?? [];
  const joined = parts.join("/");
  return joined ? `/${joined}` : "/";
}

export default function PlasmicPageClient({ path }: Props) {
  const projectId = process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID;
  const apiToken = process.env.NEXT_PUBLIC_PLASMIC_PROJECT_API_TOKEN;

  if (!projectId || !apiToken) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold">Plasmic is not configured yet</h1>
        <p className="mt-2 text-zinc-700">
          Set{" "}
          <code className="rounded bg-zinc-100 px-1">NEXT_PUBLIC_PLASMIC_PROJECT_ID</code>{" "}
          and{" "}
          <code className="rounded bg-zinc-100 px-1">
            NEXT_PUBLIC_PLASMIC_PROJECT_API_TOKEN
          </code>{" "}
          in <code className="rounded bg-zinc-100 px-1">site/.env.local</code>, then restart the dev
          server.
        </p>
      </main>
    );
  }

  const plasmicPath = getPlasmicPath(path);

  return (
    <PlasmicClientRootProvider pageRoute={plasmicPath}>
      <PlasmicComponent component={plasmicPath} />
    </PlasmicClientRootProvider>
  );
}

