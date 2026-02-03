"use client";

import { useState, useEffect, useMemo } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

// Joint-based stick figure: angles in degrees relative to parent
interface Pose {
  torsoAngle: number;
  leftShoulderAngle: number;
  leftElbowAngle: number;
  rightShoulderAngle: number;
  rightElbowAngle: number;
  leftHipAngle: number;
  leftKneeAngle: number;
  rightHipAngle: number;
  rightKneeAngle: number;
}

interface RopeAnchor {
  anchorX: number; // viewport %
  anchorY: number; // vh offset from 50vh
}

interface Keyframe {
  scroll: number;
  x: number; // viewport %
  y: number; // vh offset from 50vh
  rotation: number;
  pose: keyof typeof namedPoses;
  bounce: number; // 0 or 1 — enables parabolic arc
  rope?: RopeAnchor;
}

// ── 9 Named Poses ──────────────────────────────────────────────────────

const namedPoses: Record<string, Pose> = {
  standing: {
    torsoAngle: 0,
    leftShoulderAngle: 160, rightShoulderAngle: 200,
    leftElbowAngle: 10, rightElbowAngle: -10,
    leftHipAngle: 180, rightHipAngle: 180,
    leftKneeAngle: 0, rightKneeAngle: 0,
  },
  crouch: {
    torsoAngle: 15,
    leftShoulderAngle: 120, rightShoulderAngle: 240,
    leftElbowAngle: -40, rightElbowAngle: 40,
    leftHipAngle: 140, rightHipAngle: 140,
    leftKneeAngle: -70, rightKneeAngle: -70,
  },
  jump: {
    torsoAngle: -10,
    leftShoulderAngle: 30, rightShoulderAngle: 330,
    leftElbowAngle: 10, rightElbowAngle: -10,
    leftHipAngle: 130, rightHipAngle: 230,
    leftKneeAngle: -50, rightKneeAngle: 50,
  },
  tuck: {
    torsoAngle: -30,
    leftShoulderAngle: 80, rightShoulderAngle: 280,
    leftElbowAngle: -60, rightElbowAngle: 60,
    leftHipAngle: 80, rightHipAngle: 280,
    leftKneeAngle: -80, rightKneeAngle: 80,
  },
  layout: {
    torsoAngle: 0,
    leftShoulderAngle: 60, rightShoulderAngle: 300,
    leftElbowAngle: 15, rightElbowAngle: -15,
    leftHipAngle: 150, rightHipAngle: 210,
    leftKneeAngle: -10, rightKneeAngle: 10,
  },
  landing: {
    torsoAngle: 5,
    leftShoulderAngle: 110, rightShoulderAngle: 250,
    leftElbowAngle: -20, rightElbowAngle: 20,
    leftHipAngle: 170, rightHipAngle: 190,
    leftKneeAngle: -15, rightKneeAngle: 15,
  },
  hanging: {
    torsoAngle: 0,
    leftShoulderAngle: 10, rightShoulderAngle: 350,
    leftElbowAngle: 5, rightElbowAngle: -5,
    leftHipAngle: 190, rightHipAngle: 170,
    leftKneeAngle: 10, rightKneeAngle: -10,
  },
  sitting: {
    torsoAngle: 0,
    leftShoulderAngle: 140, rightShoulderAngle: 220,
    leftElbowAngle: -30, rightElbowAngle: 30,
    leftHipAngle: 130, rightHipAngle: 130,
    leftKneeAngle: -40, rightKneeAngle: -40,
  },
  victory: {
    torsoAngle: 0,
    leftShoulderAngle: 40, rightShoulderAngle: 320,
    leftElbowAngle: 0, rightElbowAngle: 0,
    leftHipAngle: 180, rightHipAngle: 180,
    leftKneeAngle: 0, rightKneeAngle: 0,
  },
};

// ── Choreography Keyframes ──────────────────────────────────────────────
// Coordinate system:
//   x = viewport width %  (0=left, 100=right)
//   y = vh offset from 50vh (negative = higher, positive = lower)
//
// Page landmarks (approximate viewport-relative positions):
//   Hero LinkedIn button: x≈50%, y≈8vh (below center)
//   About section top border: y varies with scroll, treat as overhead anchor
//   Timeline dots: x=50% (centerline), content alternates left/right
//   Project cards: 3-col grid at x≈30%, 50%, 70%
//   Publication cards: stacked at x≈50%
//   Contact LinkedIn button: x≈50%, y≈6vh

// Hero LinkedIn button position (centered below h1)
const BTN_X = 50;
const BTN_Y = 8; // feet rest on button top

const keyframes: Keyframe[] = [
  // ── Hero (0–14%): Standing on LinkedIn button → crouch → jump off ────
  { scroll: 0,  x: BTN_X,   y: BTN_Y,    rotation: 0,    pose: "standing", bounce: 0 },
  { scroll: 5,  x: BTN_X,   y: BTN_Y,    rotation: 0,    pose: "standing", bounce: 0 },
  { scroll: 7,  x: BTN_X,   y: BTN_Y+1,  rotation: 0,    pose: "crouch",   bounce: 0 },
  { scroll: 9,  x: BTN_X+5, y: 0,        rotation: -30,  pose: "jump",     bounce: 1 },
  { scroll: 12, x: BTN_X+10,y: -6,       rotation: -90,  pose: "tuck",     bounce: 1 },
  { scroll: 14, x: 55,      y: -2,       rotation: -180, pose: "layout",   bounce: 1 },

  // ── About (15–25%): Fire rope to section top-border → swing across ───
  { scroll: 16, x: 55,      y: 0,        rotation: -180, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -18 } },
  { scroll: 18, x: 48,      y: 2,        rotation: -180, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -18 } },
  { scroll: 20, x: 40,      y: 3,        rotation: -190, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -18 } },
  { scroll: 22, x: 33,      y: 4,        rotation: -200, pose: "landing",  bounce: 0, rope: { anchorX: 50, anchorY: -18 } },
  { scroll: 24, x: 28,      y: 6,        rotation: -210, pose: "landing",  bounce: 0 },

  // ── Timeline (25–60%): Dot-to-dot along centerline, sit on sides ─────
  // 6 items: 4 experience (alternating right/left content) + 2 education
  // Dots are at x=50%. Content alternates: even items right, odd items left.

  // Approach dot 1 (experience item 0 — content right side)
  { scroll: 26, x: 42,      y: 5,        rotation: -220, pose: "standing", bounce: 0 },
  { scroll: 28, x: 50,      y: 5,        rotation: -250, pose: "standing", bounce: 0 },
  // Sit on right side of content
  { scroll: 30, x: 38,      y: 6,        rotation: -270, pose: "sitting",  bounce: 0 },

  // Dot 1 → Dot 2 (experience item 1 — content left side)
  { scroll: 32, x: 42,      y: 5,        rotation: -280, pose: "crouch",   bounce: 0 },
  { scroll: 34, x: 50,      y: 0,        rotation: -360, pose: "jump",     bounce: 1 },
  // Sit on left side of content
  { scroll: 36, x: 62,      y: 6,        rotation: -360, pose: "sitting",  bounce: 0 },

  // Dot 2 → Dot 3 (experience item 2 — content right, rope swing)
  { scroll: 38, x: 58,      y: 4,        rotation: -370, pose: "crouch",   bounce: 0 },
  { scroll: 40, x: 50,      y: -2,       rotation: -400, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -14 } },
  { scroll: 42, x: 42,      y: 2,        rotation: -430, pose: "landing",  bounce: 0, rope: { anchorX: 50, anchorY: -14 } },
  // Sit on right content side
  { scroll: 43, x: 38,      y: 6,        rotation: -450, pose: "sitting",  bounce: 0 },

  // Dot 3 → Dot 4 (experience item 3 — content left, tuck flip)
  { scroll: 45, x: 42,      y: 4,        rotation: -460, pose: "crouch",   bounce: 0 },
  { scroll: 47, x: 50,      y: -2,       rotation: -540, pose: "tuck",     bounce: 1 },
  // Sit on left side
  { scroll: 49, x: 62,      y: 6,        rotation: -540, pose: "sitting",  bounce: 0 },

  // Dot 4 → Dot 5 (education item 0 — content right, layout flip)
  { scroll: 51, x: 58,      y: 4,        rotation: -550, pose: "crouch",   bounce: 0 },
  { scroll: 53, x: 50,      y: -3,       rotation: -630, pose: "layout",   bounce: 1 },
  // Sit on right content side
  { scroll: 55, x: 38,      y: 6,        rotation: -700, pose: "sitting",  bounce: 0 },

  // Dot 5 → Dot 6 (education item 1 — content left, rope between dots)
  { scroll: 56, x: 42,      y: 4,        rotation: -710, pose: "crouch",   bounce: 0 },
  { scroll: 57, x: 50,      y: -2,       rotation: -750, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -14 } },
  { scroll: 59, x: 58,      y: 2,        rotation: -810, pose: "landing",  bounce: 0, rope: { anchorX: 50, anchorY: -14 } },
  { scroll: 60, x: 62,      y: 5,        rotation: -900, pose: "landing",  bounce: 0 },

  // ── Projects (60–80%): Bounce across 3 card tops ─────────────────────
  // Cards in 3-col grid: x≈30%, 50%, 70%

  // Land on card 1 (x≈30%)
  { scroll: 62, x: 50,      y: 4,        rotation: -900,  pose: "standing", bounce: 0 },
  { scroll: 63, x: 40,      y: 4,        rotation: -910,  pose: "crouch",   bounce: 0 },
  { scroll: 65, x: 30,      y: -2,       rotation: -990,  pose: "tuck",     bounce: 1 },
  { scroll: 67, x: 30,      y: 6,        rotation: -1080, pose: "standing", bounce: 0 },

  // Card 1 → Card 2 (x≈50%, tuck flip)
  { scroll: 68, x: 30,      y: 6,        rotation: -1080, pose: "crouch",   bounce: 0 },
  { scroll: 70, x: 40,      y: -3,       rotation: -1170, pose: "tuck",     bounce: 1 },
  { scroll: 72, x: 50,      y: 6,        rotation: -1260, pose: "standing", bounce: 0 },

  // Card 2 → Card 3 (x≈70%, tuck flip)
  { scroll: 73, x: 50,      y: 6,        rotation: -1260, pose: "crouch",   bounce: 0 },
  { scroll: 75, x: 60,      y: -3,       rotation: -1350, pose: "tuck",     bounce: 1 },
  { scroll: 77, x: 70,      y: 6,        rotation: -1440, pose: "standing", bounce: 0 },

  // ── Publications (78–90%): Rope-swing across 2 stacked cards ─────────
  { scroll: 78, x: 70,      y: 7,        rotation: -1450, pose: "crouch",   bounce: 0 },
  { scroll: 80, x: 65,      y: 2,        rotation: -1470, pose: "jump",     bounce: 0 },
  { scroll: 82, x: 58,      y: -2,       rotation: -1490, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -16 } },
  { scroll: 84, x: 50,      y: 0,        rotation: -1510, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -16 } },
  { scroll: 86, x: 42,      y: -1,       rotation: -1530, pose: "hanging",  bounce: 0, rope: { anchorX: 50, anchorY: -16 } },
  { scroll: 88, x: 35,      y: 3,        rotation: -1560, pose: "landing",  bounce: 0, rope: { anchorX: 50, anchorY: -16 } },
  { scroll: 89, x: 32,      y: 6,        rotation: -1580, pose: "landing",  bounce: 0 },

  // ── Contact (90–100%): Land on LinkedIn button → victory → fade ──────
  { scroll: 90, x: 38,      y: 4,        rotation: -1600, pose: "standing", bounce: 0 },
  { scroll: 92, x: 44,      y: 2,        rotation: -1620, pose: "jump",     bounce: 1 },
  { scroll: 94, x: 50,      y: 6,        rotation: -1710, pose: "landing",  bounce: 0 },
  { scroll: 96, x: 50,      y: 6,        rotation: -1800, pose: "victory",  bounce: 0 },
  { scroll: 100,x: 50,      y: 6,        rotation: -1800, pose: "victory",  bounce: 0 },
];

// ── Interpolation helpers ───────────────────────────────────────────────

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    torsoAngle: lerp(a.torsoAngle, b.torsoAngle, t),
    leftShoulderAngle: lerp(a.leftShoulderAngle, b.leftShoulderAngle, t),
    leftElbowAngle: lerp(a.leftElbowAngle, b.leftElbowAngle, t),
    rightShoulderAngle: lerp(a.rightShoulderAngle, b.rightShoulderAngle, t),
    rightElbowAngle: lerp(a.rightElbowAngle, b.rightElbowAngle, t),
    leftHipAngle: lerp(a.leftHipAngle, b.leftHipAngle, t),
    leftKneeAngle: lerp(a.leftKneeAngle, b.leftKneeAngle, t),
    rightHipAngle: lerp(a.rightHipAngle, b.rightHipAngle, t),
    rightKneeAngle: lerp(a.rightKneeAngle, b.rightKneeAngle, t),
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function interpolate(scrollPercent: number) {
  let i = 0;
  for (; i < keyframes.length - 1; i++) {
    if (scrollPercent <= keyframes[i + 1].scroll) break;
  }
  const from = keyframes[i];
  const to = keyframes[Math.min(i + 1, keyframes.length - 1)];

  const range = to.scroll - from.scroll;
  const rawT = range === 0 ? 0 : (scrollPercent - from.scroll) / range;
  const clamped = Math.min(1, Math.max(0, rawT));

  const tPos = smoothstep(clamped);
  const tPose = easeInOutCubic(clamped);

  // Parabolic bounce arc for y
  const baseY = lerp(from.y, to.y, tPos);
  const arcHeight = (from.bounce || to.bounce) ? -12 * 4 * clamped * (1 - clamped) : 0;

  const interpolatedPose = lerpPose(
    namedPoses[from.pose],
    namedPoses[to.pose],
    tPose
  );

  // Rope interpolation
  let ropeAnchorX = 0;
  let ropeAnchorY = 0;
  let ropeOpacity = 0;

  const fromHasRope = !!from.rope;
  const toHasRope = !!to.rope;

  if (fromHasRope && toHasRope) {
    ropeAnchorX = lerp(from.rope!.anchorX, to.rope!.anchorX, tPos);
    ropeAnchorY = lerp(from.rope!.anchorY, to.rope!.anchorY, tPos);
    ropeOpacity = 1;
  } else if (fromHasRope && !toHasRope) {
    ropeAnchorX = from.rope!.anchorX;
    ropeAnchorY = from.rope!.anchorY;
    ropeOpacity = 1 - smoothstep(clamped);
  } else if (!fromHasRope && toHasRope) {
    ropeAnchorX = to.rope!.anchorX;
    ropeAnchorY = to.rope!.anchorY;
    ropeOpacity = smoothstep(clamped);
  }

  return {
    x: lerp(from.x, to.x, tPos),
    y: baseY + arcHeight,
    rotation: lerp(from.rotation, to.rotation, tPos),
    pose: interpolatedPose,
    ropeAnchorX,
    ropeAnchorY,
    ropeOpacity,
  };
}

// ── Geometry helpers ────────────────────────────────────────────────────

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function endpoint(
  x: number, y: number, angleDeg: number, length: number
): [number, number] {
  const r = toRad(angleDeg);
  return [x + Math.cos(r) * length, y + Math.sin(r) * length];
}

// Limb dimensions
const HEAD_RADIUS = 5;
const TORSO_LENGTH = 18;
const UPPER_ARM = 10;
const FOREARM = 9;
const UPPER_LEG = 12;
const LOWER_LEG = 11;
const STROKE_WIDTH = 2.8;

// ── StickFigure SVG renderer ────────────────────────────────────────────

function StickFigure({ pose, className }: { pose: Pose; className: string }) {
  const hipX = 0, hipY = 0;

  const torsoAngleRad = toRad(pose.torsoAngle - 90);
  const shoulderX = hipX + Math.cos(torsoAngleRad) * TORSO_LENGTH;
  const shoulderY = hipY + Math.sin(torsoAngleRad) * TORSO_LENGTH;

  const headX = shoulderX + Math.cos(torsoAngleRad) * (HEAD_RADIUS + 1);
  const headY = shoulderY + Math.sin(torsoAngleRad) * (HEAD_RADIUS + 1);

  const [lElbowX, lElbowY] = endpoint(shoulderX, shoulderY, pose.leftShoulderAngle, UPPER_ARM);
  const [lHandX, lHandY] = endpoint(lElbowX, lElbowY, pose.leftShoulderAngle + pose.leftElbowAngle, FOREARM);
  const [rElbowX, rElbowY] = endpoint(shoulderX, shoulderY, pose.rightShoulderAngle, UPPER_ARM);
  const [rHandX, rHandY] = endpoint(rElbowX, rElbowY, pose.rightShoulderAngle + pose.rightElbowAngle, FOREARM);

  const [lKneeX, lKneeY] = endpoint(hipX, hipY, pose.leftHipAngle, UPPER_LEG);
  const [lFootX, lFootY] = endpoint(lKneeX, lKneeY, pose.leftHipAngle + pose.leftKneeAngle, LOWER_LEG);
  const [rKneeX, rKneeY] = endpoint(hipX, hipY, pose.rightHipAngle, UPPER_LEG);
  const [rFootX, rFootY] = endpoint(rKneeX, rKneeY, pose.rightHipAngle + pose.rightKneeAngle, LOWER_LEG);

  return (
    <g className={className}>
      <circle cx={headX} cy={headY} r={HEAD_RADIUS} fill="currentColor" />
      <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={shoulderX} y1={shoulderY} x2={lElbowX} y2={lElbowY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={lElbowX} y1={lElbowY} x2={lHandX} y2={lHandY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={shoulderX} y1={shoulderY} x2={rElbowX} y2={rElbowY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={rElbowX} y1={rElbowY} x2={rHandX} y2={rHandY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={hipX} y1={hipY} x2={lKneeX} y2={lKneeY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={lKneeX} y1={lKneeY} x2={lFootX} y2={lFootY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={hipX} y1={hipY} x2={rKneeX} y2={rKneeY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
      <line x1={rKneeX} y1={rKneeY} x2={rFootX} y2={rFootY} strokeWidth={STROKE_WIDTH} stroke="currentColor" strokeLinecap="round" />
    </g>
  );
}

// ── Compute hand position for rope attachment ───────────────────────────

function getHandPosition(pose: Pose): { handX: number; handY: number } {
  const hipX = 0, hipY = 0;
  const torsoAngleRad = toRad(pose.torsoAngle - 90);
  const shoulderX = hipX + Math.cos(torsoAngleRad) * TORSO_LENGTH;
  const shoulderY = hipY + Math.sin(torsoAngleRad) * TORSO_LENGTH;
  const [rElbowX, rElbowY] = endpoint(shoulderX, shoulderY, pose.rightShoulderAngle, UPPER_ARM);
  const [rHandX, rHandY] = endpoint(rElbowX, rElbowY, pose.rightShoulderAngle + pose.rightElbowAngle, FOREARM);
  return { handX: rHandX, handY: rHandY };
}

// ── Main component ──────────────────────────────────────────────────────

export default function AcrobaticFigure() {
  const scrollPercent = useScrollProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { x, y, rotation, pose, ropeAnchorX, ropeAnchorY, ropeOpacity } = useMemo(
    () => interpolate(scrollPercent),
    [scrollPercent]
  );

  // Fade out in last 3% of scroll
  const opacity = scrollPercent > 97 ? (100 - scrollPercent) / 3 : 1;

  if (!mounted) return null;

  const figLeft = x;
  const figTop = y;
  const { handX, handY } = getHandPosition(pose);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 hidden md:block motion-reduce:hidden"
      aria-hidden="true"
    >
      {/* Grappling rope */}
      {ropeOpacity > 0 && (
        <svg
          className="text-stone-900/40 dark:text-stone-400/40"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: ropeOpacity * opacity,
          }}
        >
          <RopeLine
            figX={figLeft}
            figTopVh={figTop}
            handX={handX}
            handY={handY}
            rotation={rotation}
            anchorX={ropeAnchorX}
            anchorY={ropeAnchorY}
          />
        </svg>
      )}

      {/* Stick figure */}
      <svg
        width="70"
        height="70"
        viewBox="-30 -45 60 70"
        overflow="visible"
        className="text-stone-900/40 dark:text-stone-400/40"
        style={{
          position: "absolute",
          left: `${figLeft}%`,
          top: `calc(50vh + ${figTop}vh)`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        <StickFigure pose={pose} className="" />
      </svg>
    </div>
  );
}

// ── Rope SVG line with sag ──────────────────────────────────────────────

function RopeLine({
  figX,
  figTopVh,
  handX,
  handY,
  rotation,
  anchorX,
  anchorY,
}: {
  figX: number;
  figTopVh: number;
  handX: number;
  handY: number;
  rotation: number;
  anchorX: number;
  anchorY: number;
}) {
  const scale = 70 / 60;
  const rotRad = toRad(rotation);
  const cosR = Math.cos(rotRad);
  const sinR = Math.sin(rotRad);

  const rotatedHandX = handX * cosR - handY * sinR;
  const rotatedHandY = handX * sinR + handY * cosR;

  const handPxOffsetX = rotatedHandX * scale;
  const handPxOffsetY = rotatedHandY * scale;

  // viewBox 0 0 1000 1000 mapped to full viewport
  const vbScale = 10;
  const winW = typeof window !== "undefined" ? window.innerWidth : 1920;
  const winH = typeof window !== "undefined" ? window.innerHeight : 1080;

  const startXvb = figX * vbScale + (handPxOffsetX / winW) * 1000;
  const startYvb = 500 + figTopVh * vbScale + (handPxOffsetY / winH) * 1000;
  const endXvb = anchorX * vbScale;
  const endYvb = 500 + anchorY * vbScale;

  // Quadratic bezier with sag
  const midX = (startXvb + endXvb) / 2;
  const midY = (startYvb + endYvb) / 2;
  const dist = Math.sqrt((endXvb - startXvb) ** 2 + (endYvb - startYvb) ** 2);
  const sagAmount = Math.min(dist * 0.18, 50);
  const ctrlX = midX;
  const ctrlY = midY + sagAmount;

  return (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" width="100%" height="100%">
      <path
        d={`M ${startXvb} ${startYvb} Q ${ctrlX} ${ctrlY} ${endXvb} ${endYvb}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
