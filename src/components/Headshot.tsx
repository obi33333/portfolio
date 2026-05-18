import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  size?: number;
};

export default function Headshot({
  src = "/headshot.jpg",
  alt = "Headshot",
  size = 140,
}: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-full border border-black/10 bg-zinc-100 shadow-sm dark:border-white/10 dark:bg-white/5"
      style={{ width: size, height: size }}
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
  );
}

