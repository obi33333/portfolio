"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const MODEL_PATHS = [
  "/album/model/Parts/record.glb",
  "/album/model/Parts/recordCase.glb",
  "/album/model/Parts/recordBag.glb",
];

export default function PartsViewer({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frameId: number;
    let disposed = false;
    let cleanupFn: (() => void) | undefined;

    (async () => {
      if (disposed) return;

      const w = canvas.clientWidth || 460;
      const h = canvas.clientHeight || 460;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, w / h, 0.01, 100);
      camera.position.set(0, 1.2, 4);

      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;

      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const key = new THREE.DirectionalLight(0xffffff, 2);
      key.position.set(2, 4, 3);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.6);
      fill.position.set(-3, 2, -2);
      scene.add(fill);

      const loader = new GLTFLoader();
      const mixers: THREE.AnimationMixer[] = [];

      await Promise.all(
        MODEL_PATHS.map(
          (path) =>
            new Promise<void>((resolve) => {
              loader.load(path, (gltf) => {
                scene.add(gltf.scene);
                if (gltf.animations.length > 0) {
                  const mixer = new THREE.AnimationMixer(gltf.scene);
                  gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
                  mixers.push(mixer);
                }
                resolve();
              });
            })
        )
      );

      const clock = new THREE.Clock();

      const ro = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      });
      ro.observe(canvas);

      const tick = () => {
        if (disposed) return;
        frameId = requestAnimationFrame(tick);
        const delta = clock.getDelta();
        mixers.forEach((m) => m.update(delta));
        controls.update();
        renderer.render(scene, camera);
      };
      tick();

      cleanupFn = () => {
        ro.disconnect();
        controls.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      cleanupFn?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ display: "block" }} />;
}
