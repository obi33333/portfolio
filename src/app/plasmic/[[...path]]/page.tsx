import PlasmicPageClient from "./PlasmicPageClient";

export default function PlasmicCatchallPage({
  params,
}: {
  params: { path?: string[] };
}) {
  return <PlasmicPageClient path={params.path} />;
}
