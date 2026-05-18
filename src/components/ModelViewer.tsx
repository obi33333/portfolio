"use client";

import React, { useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  cameraControls?: boolean;
  autoRotate?: boolean;
  disableZoom?: boolean;
  loading?: "auto" | "lazy";
  reveal?: "auto" | "interaction" | "manual";
  rotationPerSecond?: string;
  bounds?: "legacy" | "tight";
  orientation?: string;
  cameraOrbit?: string;
  minCameraOrbit?: string;
  maxCameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  minFieldOfView?: string;
  maxFieldOfView?: string;
  shadowIntensity?: number;
  shadowSoftness?: number;
  exposure?: number;
  interactionPrompt?: "auto" | "none";
  onPointerDown?: React.PointerEventHandler<HTMLElement>;
  onPointerMove?: React.PointerEventHandler<HTMLElement>;
  onPointerUp?: React.PointerEventHandler<HTMLElement>;
};

export default function ModelViewer({
  src,
  alt,
  className,
  style,
  cameraControls = true,
  autoRotate = false,
  disableZoom = false,
  loading = "lazy",
  reveal = "auto",
  rotationPerSecond = "24deg",
  bounds = "tight",
  orientation,
  cameraOrbit,
  minCameraOrbit,
  maxCameraOrbit,
  cameraTarget,
  fieldOfView,
  minFieldOfView,
  maxFieldOfView,
  shadowIntensity = 0.6,
  shadowSoftness = 0,
  exposure = 1,
  interactionPrompt = "auto",
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Props) {
  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  const props: Record<string, unknown> = {
    src,
    alt,
    className,
    style,
    loading,
    reveal,
    "rotation-per-second": rotationPerSecond,
    bounds,
    orientation,
    exposure,
    "shadow-intensity": shadowIntensity,
    "shadow-softness": shadowSoftness,
    "interaction-prompt": interactionPrompt,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };

  if (cameraControls) props["camera-controls"] = true;
  if (autoRotate) props["auto-rotate"] = true;
  if (disableZoom) props["disable-zoom"] = true;
  if (cameraOrbit) props["camera-orbit"] = cameraOrbit;
  if (minCameraOrbit) props["min-camera-orbit"] = minCameraOrbit;
  if (maxCameraOrbit) props["max-camera-orbit"] = maxCameraOrbit;
  if (cameraTarget) props["camera-target"] = cameraTarget;
  if (fieldOfView) props["field-of-view"] = fieldOfView;
  if (minFieldOfView) props["min-field-of-view"] = minFieldOfView;
  if (maxFieldOfView) props["max-field-of-view"] = maxFieldOfView;

  return React.createElement("model-viewer", props);
}
