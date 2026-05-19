import AlbumExperience from "@/components/AlbumExperience";
import { ALBUM } from "@/content/album";

export const metadata = {
  title: `${ALBUM.title} | Obadiah Bernstein`,
  description: "Art is an Offer — an album by Obadiah Bernstein.",
};

export default function AlbumPage() {
  return <AlbumExperience />;
}
