"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX = /* glsl */ `
  uniform float uTime;
  varying float vH;
  varying vec3 vPos;
  float wave(vec2 p){
    float h = 0.0;
    h += sin(p.x * 0.08 + uTime * 0.80) * 2.2;
    h += sin(p.y * 0.11 - uTime * 0.60) * 1.8;
    h += sin((p.x + p.y) * 0.05 + uTime * 0.50) * 1.3;
    h += sin((p.x * 0.5 - p.y * 0.7) * 0.06 - uTime * 0.90) * 0.8;
    return h;
  }
  void main(){
    vec3 pos = position;
    float h = wave(pos.xy);
    pos.z += h;
    vH = h;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying float vH;
  varying vec3 vPos;
  void main(){
    vec3 deep  = vec3(0.02, 0.10, 0.18);
    vec3 mid   = vec3(0.05, 0.36, 0.46);
    vec3 crest = vec3(0.42, 0.82, 0.90);
    float t = smoothstep(-3.0, 4.0, vH);
    vec3 col = mix(deep, mid, t);
    col = mix(col, crest, smoothstep(2.6, 4.6, vH));
    float dist = length(vPos.xy);
    float fog = smoothstep(70.0, 240.0, dist);
    vec3 horizon = vec3(0.05, 0.18, 0.27);
    col = mix(col, horizon, fog);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function makeSkyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#031019");
  grad.addColorStop(0.55, "#072636");
  grad.addColorStop(0.82, "#0c4a5e");
  grad.addColorStop(1, "#11647e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function OceanHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      return; // WebGL unavailable → CSS poster stays visible underneath.
    }

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const sky = makeSkyTexture();
    if (sky) scene.background = sky;
    scene.fog = new THREE.FogExp2(0x062130, 0.0042);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 18, 78);
    camera.lookAt(0, -6, -60);

    const geometry = new THREE.PlaneGeometry(520, 520, 200, 200);
    const uniforms = { uTime: { value: 0 } };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      fog: false,
    });
    const ocean = new THREE.Mesh(geometry, material);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = -6;
    scene.add(ocean);

    // Soft sun glow near the horizon.
    const sunMat = new THREE.SpriteMaterial({
      map: (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const g = c.getContext("2d");
        if (g) {
          const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
          rg.addColorStop(0, "rgba(255,247,222,0.95)");
          rg.addColorStop(0.4, "rgba(255,220,150,0.5)");
          rg.addColorStop(1, "rgba(255,220,150,0)");
          g.fillStyle = rg;
          g.fillRect(0, 0, 128, 128);
        }
        const t = new THREE.CanvasTexture(c);
        return t;
      })(),
      transparent: true,
      depthWrite: false,
    });
    const sun = new THREE.Sprite(sunMat);
    sun.scale.set(120, 120, 1);
    sun.position.set(60, 22, -200);
    scene.add(sun);

    let raf = 0;
    const clock = new THREE.Clock();
    const pointer = { x: 0, y: 0 };

    function onPointerMove(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function render() {
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;
      // Gentle parallax drift driven by pointer + time.
      const targetX = pointer.x * 6;
      const targetY = 18 + pointer.y * -3 + Math.sin(elapsed * 0.2) * 1.2;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, -6, -60);
      renderer.render(scene, camera);
    }

    function animate() {
      render();
      raf = window.requestAnimationFrame(animate);
    }

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);

    if (reduceMotion) {
      render(); // one static frame
    } else {
      animate();
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      sunMat.map?.dispose();
      sunMat.dispose();
      sky?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="y-hero__canvas" aria-hidden="true" />;
}
