"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type KioskImage = {
  src: string;
  alt: string;
};

type Props = {
  images: KioskImage[];
  className?: string;
  radius?: number;
  secondsPerRevolution?: number;
};

export default function HeadshotKiosk({
  images,
  className,
  radius,
  secondsPerRevolution = 52,
}: Props) {
  const safeImages = images.filter((img) => img.src);
  const count = safeImages.length;
  const step = count > 0 ? 360 / count : 0;

  const itemWidth = 180;
  const itemHeight = 260;

  const resolvedRadius = useMemo(() => {
    if (typeof radius === "number") return radius;
    if (count <= 1) return 0;
    const idealRadius = itemWidth / 2 / Math.tan(Math.PI / count);
    return Math.max(100, Math.round(idealRadius * 1.1));
  }, [radius, count]);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const pointerDownSrcRef = useRef<string | null>(null);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Animation loop — pauses snapping while dragging
  useEffect(() => {
    if (count === 0) return;
    let raf = 0;
    const defaultSpeed = 360 / secondsPerRevolution;
    const k = 5;

    const tick = (ts: number) => {
      if (!carouselRef.current) return;
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      if (!isDraggingRef.current) {
        const target = targetAngleRef.current;
        if (target == null) {
          angleRef.current = (angleRef.current + defaultSpeed * dt) % 360;
        } else {
          const current = angleRef.current;
          const diff = ((target - current + 540) % 360) - 180;
          const alpha = 1 - Math.exp(-k * dt);
          angleRef.current = Math.abs(diff) < 0.15 ? target : current + diff * alpha;
        }
      }

      carouselRef.current.style.transform = `translateZ(${-resolvedRadius}px) rotateY(${angleRef.current}deg)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, secondsPerRevolution, resolvedRadius]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = angleRef.current;
    dragDistanceRef.current = 0;
    targetAngleRef.current = null;
    lastTsRef.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.abs(dx);
    angleRef.current = dragStartAngleRef.current + dx * 0.45;
  };

  const onPointerUp = () => {
    isDraggingRef.current = false;
    if (dragDistanceRef.current < 5 && pointerDownSrcRef.current) {
      // Tap — open lightbox
      setLightboxSrc(pointerDownSrcRef.current);
    } else if (dragDistanceRef.current >= 5) {
      // Drag — snap to nearest card
      const normalizedAngle = (((-angleRef.current) % 360) + 360) % 360;
      const nearestIdx = Math.round(normalizedAngle / step) % count;
      targetAngleRef.current = -nearestIdx * step;
    }
    pointerDownSrcRef.current = null;
  };

  const onPointerCancel = () => {
    isDraggingRef.current = false;
    pointerDownSrcRef.current = null;
  };

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxSrc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxSrc]);

  if (count === 0) return null;

  return (
    <>
      {/* Carousel */}
      <div
        className={[
          "relative h-[340px] w-[280px] overflow-hidden perspective-[900px] sm:h-[360px] sm:w-[320px] select-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ touchAction: "none" }}
        aria-label="Rotating headshot gallery"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={() => {
          if (!isDraggingRef.current) {
            lastTsRef.current = null;
            targetAngleRef.current = null;
          }
        }}
      >
        <div
          ref={carouselRef}
          className="absolute inset-0 transform-3d will-change-transform"
          style={{ transform: `translateZ(${-resolvedRadius}px) rotateY(0deg)` }}
        >
          {safeImages.map((img, idx) => (
            <div
              key={img.src}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl backface-hidden cursor-pointer"
              style={{
                width: itemWidth,
                height: itemHeight,
                transform: `translate(-50%, -50%) rotateY(${idx * step}deg) translateZ(${resolvedRadius}px)`,
              }}
              onPointerDown={() => { pointerDownSrcRef.current = img.src; }}
              onPointerEnter={() => {
                if (!isDraggingRef.current) targetAngleRef.current = -idx * step;
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="190px"
                className="object-cover pointer-events-none"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Drag hint — fades out after 3s via animation */}
        <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-black/30 pointer-events-none animate-[fadeout_3s_ease-in_1s_forwards]">
          drag to rotate · tap to enlarge
        </p>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute -top-4 -right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Photo */}
            <div className="relative overflow-hidden rounded-2xl" style={{ width: "min(85vw, 420px)", aspectRatio: "9/13" }}>
              <Image
                src={lightboxSrc}
                alt="Headshot"
                fill
                sizes="420px"
                className="object-cover"
                priority
              />
            </div>

            {/* Credit */}
            <p className="mt-2 text-right text-xs text-white/50">Shot by Liam Lyons</p>
          </div>
        </div>
      )}
    </>
  );
}
