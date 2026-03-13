"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MindMapData, MindMapNode } from "./types";

type Point = { x: number; y: number };

function polarToCartesian(radius: number, angleRad: number): Point {
  return { x: radius * Math.cos(angleRad), y: radius * Math.sin(angleRad) };
}

function distributeAngles(n: number, start = -Math.PI / 2) {
  const step = (Math.PI * 2) / n;
  return new Array(n).fill(0).map((_, i) => start + i * step);
}

function useMeasure() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setRect({ width: r.width, height: r.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return { ref, rect } as const;
}

function drawBranch(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  color: string,
) {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  // simple quadratic curve for smoothness
  ctx.quadraticCurveTo(mid.x, mid.y, to.x, to.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function renderToCanvas(
  canvas: HTMLCanvasElement,
  data: MindMapData,
  colors: string[],
  scale: number,
  offset: Point,
  fontFamily: string,
  cssWidth: number,
  cssHeight: number,
  dpr: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.scale(dpr, dpr);
  const cx = width / dpr / 2;
  const cy = height / dpr / 2;
  ctx.translate(cx + offset.x, cy + offset.y);
  ctx.scale(scale, scale);

  // Center node
  const centerRadius = 12;
  ctx.strokeStyle = "rgba(124,58,237,0.15)";
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, 220, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = colors[0];
  ctx.beginPath();
  ctx.arc(0, 0, centerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `700 18px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#0f172a"; // slate-900
  ctx.fillText(data.label, 0, -36);

  const primary = data.children ?? [];
  const angles = distributeAngles(primary.length);

  primary.forEach((node, i) => {
    const angle = angles[i];
    const radius = 160; // distance from center for primary branches
    const p = polarToCartesian(radius, angle);
    const color = node.color || colors[(i + 1) % colors.length];

    drawBranch(ctx, { x: 0, y: 0 }, p, color);

    // Node dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Primary label background pill
    const text = node.label;
    ctx.font = `600 14px ${fontFamily}`;
    const paddingX = 10;
    const paddingY = 6;
    const metrics = ctx.measureText(text);
    const w = metrics.width + paddingX * 2;
    const h = 28;
    const tx = p.x + Math.cos(angle) * 16;
    const ty = p.y + Math.sin(angle) * 16;

    ctx.shadowColor = "rgba(2,6,23,0.06)";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    roundRect(ctx, tx - w / 2, ty - h / 2, w, h, 9999);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0b1220";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, tx, ty);

    // Children along the same ray direction
    const children = node.children ?? [];
    children.forEach((child, idx) => {
      const ringIndex = Math.floor(idx / 6);
      const withinRing = idx % 6;
      const step = 110 + withinRing * 70 + ringIndex * 120;
      const cp = polarToCartesian(radius + step, angle);
      drawBranch(ctx, p, cp, color);

      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      const ctext = child.label;
      ctx.font = `500 13px ${fontFamily}`;
      const cpad = 8;
      const cmetrics = ctx.measureText(ctext);
      const cw = cmetrics.width + cpad * 2;
      const ch = 24;
      const ctxx = cp.x + Math.cos(angle) * 14;
      const ctxy = cp.y + Math.sin(angle) * 14;

      ctx.shadowColor = "rgba(2,6,23,0.06)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      roundRect(ctx, ctxx - cw / 2, ctxy - ch / 2, cw, ch, 9999);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#0b1220";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(ctext, ctxx, ctxy);

      // grandchildren, if any: offset laterally
      const gkids = child.children ?? [];
      gkids.forEach((g, gi) => {
        const lateral = gi % 2 === 0 ? 1 : -1;
        const sideOffset = 40 + Math.floor(gi / 2) * 44;
        const normalAngle = angle + (Math.PI / 2) * lateral;
        const gp = {
          x: ctxx + Math.cos(normalAngle) * sideOffset,
          y: ctxy + Math.sin(normalAngle) * sideOffset,
        };
        drawBranch(ctx, { x: ctxx, y: ctxy }, gp, color);

        ctx.beginPath();
        ctx.arc(gp.x, gp.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        const gtext = g.label;
        ctx.font = `500 12px ${fontFamily}`;
        const gpad = 6;
        const gmet = ctx.measureText(gtext);
        const gw = gmet.width + gpad * 2;
        const gh = 22;

        ctx.shadowColor = "rgba(2,6,23,0.06)";
        ctx.shadowBlur = 4;
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.75;
        roundRect(ctx, gp.x - gw / 2, gp.y - gh / 2, gw, gh, 9999);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#0b1220";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(gtext, gp.x, gp.y);
      });
    });
  });

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export default function MindMap({ data }: { data: MindMapData }) {
  const { ref, rect } = useMeasure();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const colors = useMemo(
    () => [
      "#7c3aed", // purple-600
      "#10b981", // emerald-500
      "#f59e0b", // amber-500
      "#ef4444", // red-500
      "#3b82f6", // blue-500
      "#14b8a6", // teal-500
      "#a855f7", // violet-500
      "#22c55e", // green-500
      "#eab308", // yellow-500
      "#f97316", // orange-500
    ],
    [],
  );

  const [scale, setScale] = useState(0.95);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const last = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const font = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-family")
      .trim() || "Inter, ui-sans-serif, system-ui";
    renderToCanvas(canvas, data, colors, scale, offset, font, rect.width, rect.height, dpr);
  }, [rect.width, rect.height, dpr, data, colors, scale, offset]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY;
      const factor = delta > 0 ? 1.1 : 0.9;
      setScale((s) => Math.min(3, Math.max(0.5, s * factor)));
    };

    let dragging = false;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      last.current = { x: e.clientX, y: e.clientY };
      (e.target as Element).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || !last.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      last.current = null;
      (e.target as Element).releasePointerCapture(e.pointerId);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-full relative">
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur rounded-full shadow-lg px-3 py-1">
        <button
          className="text-slate-700 hover:text-slate-900 font-medium"
          onClick={() => setScale((s) => Math.min(3, s * 1.1))}
        >
          +
        </button>
        <button
          className="text-slate-700 hover:text-slate-900 font-medium"
          onClick={() => setScale((s) => Math.max(0.5, s * 0.9))}
        >
          −
        </button>
        <button
          className="text-slate-700 hover:text-slate-900 font-medium"
          onClick={() => {
            setScale(1);
            setOffset({ x: 0, y: 0 });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
