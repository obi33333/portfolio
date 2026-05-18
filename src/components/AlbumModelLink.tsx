"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import ModelViewer from "@/components/ModelViewer";

type Props = {
  src: string;
  alt: string;
  href?: string;
  className?: string;
  modelHeight?: number; // px, defaults to 440
};

export default function AlbumModelLink({
  src,
  alt,
  href = "/album",
  className,
  modelHeight = 440,
}: Props) {
  const router = useRouter();
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  return (
    <div
      className={["group relative flex flex-col", className].filter(Boolean).join(" ")}
      aria-label="Interactive album model"
    >
      <ModelViewer
        src={src}
        alt={alt}
        cameraControls
        autoRotate
        disableZoom={false}
        // 90deg X tilts flat model upright (right-side up); 180deg Y keeps it oriented correctly.
        // Camera azimuth 205deg (=25deg + 180) puts the camera on the front-face side.
        orientation="90deg 180deg 0deg"
        cameraOrbit="205deg 75deg 105%"
        fieldOfView="30deg"
        reveal="auto"
        rotationPerSecond="5deg"
        shadowIntensity={0}
        shadowSoftness={0}
        interactionPrompt="none"
        className="w-full motion-reduce:animate-none"
        style={{ height: `${modelHeight}px`, animation: "floaty 6s ease-in-out infinite" }}
        onPointerDown={(e) => {
          start.current = { x: e.clientX, y: e.clientY };
          dragged.current = false;
        }}
        onPointerMove={(e) => {
          if (!start.current) return;
          const dx = Math.abs(e.clientX - start.current.x);
          const dy = Math.abs(e.clientY - start.current.y);
          if (dx > 6 || dy > 6) dragged.current = true;
        }}
        onPointerUp={() => {
          if (!dragged.current) router.push(href);
          start.current = null;
          dragged.current = false;
        }}
      />
      {/*
        Shadow sits in normal document flow below the WebGL canvas.
        Because WebGL composites in its own GPU layer it paints above
        absolutely-positioned siblings, so we keep this in flow and let
        a small negative top margin pull it visually closer to the model.
        The shadow-float animation keeps it synced with the floaty
        motion: shrinks + fades as the model rises, grows + darkens
        as it descends — giving the illusion of a fixed overhead light.
      */}
      <div className="pointer-events-none -mt-4 flex justify-center">
        <div
          className="h-5 w-3/5 rounded-full bg-black/50 blur-xl"
          style={{ animation: "shadow-float 6s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
