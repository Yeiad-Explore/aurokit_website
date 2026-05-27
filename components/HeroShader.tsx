"use client";

import { useEffect, useRef } from "react";

const VERT = /* glsl */ `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 frag;

uniform float u_time;
uniform vec2  u_res;
uniform vec2  u_mouse;

// Hash + simplex-ish noise (cheap, smooth)
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

// Smooth radial bloom
float bloom(vec2 uv, vec2 center, float radius, float softness) {
  float d = distance(uv, center);
  return smoothstep(radius, radius - softness, d);
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  // Parallax offset from mouse (subtle)
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0) * 0.06;

  float t = u_time * 0.045;

  // FBM warp field
  vec2 warp = vec2(
    fbm(p * 1.3 + vec2(t, -t * 0.7)),
    fbm(p * 1.3 + vec2(-t * 0.6, t * 0.9))
  );
  vec2 q = p + (warp - 0.5) * 0.55 + m;

  // Three soft blooms with mist-green / pale-cyan / muted violet
  vec3 colA = vec3(0.866, 0.921, 0.882);   // mist green
  vec3 colB = vec3(0.846, 0.937, 0.918);   // pale cyan
  vec3 colC = vec3(0.780, 0.713, 0.902);   // muted violet (very low intensity)

  float b1 = bloom(q, vec2(0.32 * aspect * 0.55, -0.15) + m * 1.5, 0.55, 0.62);
  float b2 = bloom(q, vec2(-0.30 * aspect * 0.55, 0.20) + m * 1.2, 0.50, 0.58);
  float b3 = bloom(q, vec2(0.02, 0.35) + m * 0.8, 0.42, 0.55);

  // Energy field
  float field = fbm(q * 2.4 + t * 0.6) * 0.85 + fbm(q * 5.0 - t) * 0.25;

  vec3 col = vec3(0.011, 0.015, 0.019); // near-black base
  col += colA * b1 * 0.55;
  col += colB * b2 * 0.42;
  col += colC * b3 * 0.18;

  // Subtle chromatic dispersion at the edges of blooms
  float edge = smoothstep(0.35, 0.0, abs(field - 0.5)) * 0.10;
  col.r += edge * 0.05;
  col.b += edge * 0.07;

  // Soft vignette
  float vig = smoothstep(1.15, 0.30, length(p * 1.05));
  col *= mix(0.55, 1.0, vig);

  // Bottom fade so the canvas blends into the page
  float bottomFade = smoothstep(0.0, 0.32, uv.y);
  col *= mix(0.40, 1.0, bottomFade);

  // Cinematic film grain
  float grain = (hash(uv * u_res + u_time) - 0.5) * 0.022;
  col += grain;

  // Mild tone curve
  col = col / (1.0 + col * 0.45);

  frag = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 });

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext("webgl2", {
        antialias: false,
        alpha: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });
      if (!gl) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;

      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.bindAttribLocation(prog, 0, "a_pos");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        return;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(prog, "u_time");
      const uRes = gl.getUniformLocation(prog, "u_res");
      const uMouse = gl.getUniformLocation(prog, "u_mouse");

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.tx = (e.clientX - rect.left) / rect.width;
        mouseRef.current.ty = 1 - (e.clientY - rect.top) / rect.height;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const t0 = performance.now();
      const tick = () => {
        const now = (performance.now() - t0) / 1000;
        
        // Elastic inertia (spring physics)
        const stiffness = 0.03;
        const damping = 0.85;

        const dx = mouseRef.current.tx - mouseRef.current.x;
        const dy = mouseRef.current.ty - mouseRef.current.y;

        mouseRef.current.vx += dx * stiffness;
        mouseRef.current.vy += dy * stiffness;

        mouseRef.current.vx *= damping;
        mouseRef.current.vy *= damping;

        mouseRef.current.x += mouseRef.current.vx;
        mouseRef.current.y += mouseRef.current.vy;

        gl.uniform1f(uTime, now);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
