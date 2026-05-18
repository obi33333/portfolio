"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

export type KioskImage = {
  src: string;
  alt: string;
};

type Props = {
  images: KioskImage[];
  className?: string;
  radius?: number;
  secondsPerRevolution?: number;
  /** When provided every card becomes a keyboard-navigable link to this href */
  cardHref?: string;
};

export default function HeadshotKiosk({
  images,
  className,
  radius,
  secondsPerRevolution = 52,
  cardHref,
}: Props) {
  const safeImages = images.filter((img) => img.src);
  const count = safeImages.length;
  const step = count > 0 ? 360 / count : 0;

  const itemWidth = 180;
  const itemHeight = 260;

  const resolvedRadius = useMemo(() => {
    if (typeof radius === "number") return radius;
    if (count <= 1) return 0;
    const idealRadius = (itemWidth / 2) / Math.tan(Math.PI / count);
    return Math.max(100, Math.round(idealRadius * 1.1));
  }, [radius, count]);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (count === 0) return;
    let raf = 0;
    const defaultSpeed = count > 0 ? 360 / secondsPerRevolution : 0;
    const k = 5;

    const tick = (ts: number) => {
      if (!carouselRef.current) return;
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const target = targetAngleRef.current;
      if (target == null) {
        angleRef.current = (angleRef.current + defaultSpeed * dt) % 360;
      } else {
        const current = angleRef.current;
        const diff = ((target - current + 540) % 360) - 180;
        const alpha = 1 - Math.exp(-k * dt);
        const next = current + diff * alpha;
        angleRef.current = Math.abs(diff) < 0.15 ? target : next;
      }

      carouselRef.current.style.transform =
        `translateZ(${-resolvedRadius}px) rotateY(${angleRef.current}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, secondsPerRevolution, resolvedRadius]);

  if (count === 0) return null;

  const cardClass =
    "absolute left-1/2 top-1/2 overflow-hidden rounded-2xl backface-hidden " +
    (cardHref
      ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      : "cursor-default");

  return (
    <div
      className={[
        "relative h-[340px] w-[280px] overflow-hidden perspective-[900px] sm:h-[360px] sm:w-[320px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Rotating headshot gallery"
      onPointerLeave={() => {
        targetAngleRef.current = null;
        lastTsRef.current = null;
      }}
    >
      <div
        ref={carouselRef}
        className="absolute inset-0 transform-3d will-change-transform"
        style={{ transform: `translateZ(${-resolvedRadius}px) rotateY(0deg)` }}
      >
        {safeImages.map((img, idx) => {
          const sharedStyle: React.CSSProperties = {
            width: itemWidth,
            height: itemHeight,
            transform: `translate(-50%, -50%) rotateY(${idx * step}deg) translateZ(${resolvedRadius}px)`,
            display: "block",
          };
          const onEnter = () => { targetAngleRef.current = -idx * step; };

          return cardHref ? (
            <Link
              key={img.src}
              href={cardHref}
              className={cardClass}
              style={sharedStyle}
              onPointerEnter={onEnter}
              aria-label="About me"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="190px"
                className="object-cover"
                priority={idx === 0}
              />
            </Link>
          ) : (
            <div
              key={img.src}
              className={cardClass}
              style={sharedStyle}
              onPointerEnter={onEnter}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="190px"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
