import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  RotateCcw,
  Eye,
  Layers,
  Sparkles,
  Compass,
  Sliders,
  ChevronRight,
  HelpCircle,
  Activity,
  Move
} from "lucide-react";

// Complex number helpers
const addC = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const mulC = (a, b) => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});
const SQRT2_INV = 1 / Math.SQRT2;

const GATE_MATRICES = {
  X: [
    [{ re: 0, im: 0 }, { re: 1, im: 0 }],
    [{ re: 1, im: 0 }, { re: 0, im: 0 }]
  ],
  Y: [
    [{ re: 0, im: 0 }, { re: 0, im: -1 }],
    [{ re: 0, im: 1 }, { re: 0, im: 0 }]
  ],
  Z: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: -1, im: 0 }]
  ],
  H: [
    [{ re: SQRT2_INV, im: 0 }, { re: SQRT2_INV, im: 0 }],
    [{ re: SQRT2_INV, im: 0 }, { re: -SQRT2_INV, im: 0 }]
  ],
  S: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 0, im: 1 }]
  ],
  T: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: SQRT2_INV, im: SQRT2_INV }]
  ]
};

// 3D Projection function
function projectPoint(x, y, z, pitchDeg, yawDeg, cx = 200, cy = 200, R = 120) {
  const yawRad = (yawDeg * Math.PI) / 180;
  const pitchRad = (pitchDeg * Math.PI) / 180;

  // 1. Yaw rotation (around Z-axis)
  const x1 = x * Math.cos(yawRad) - y * Math.sin(yawRad);
  const y1 = x * Math.sin(yawRad) + y * Math.cos(yawRad);
  const z1 = z;

  // 2. Pitch rotation (around horizontal camera axis)
  const x2 = x1;
  const y2 = y1 * Math.cos(pitchRad) - z1 * Math.sin(pitchRad);
  const z2 = y1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

  return {
    x: cx + R * x2,
    y: cy - R * z2, // In SVG, Y grows downward; +Z goes upward
    depth: y2
  };
}

// Generate sampled arc of a circle in 3D
function generateRingPoints(axis, pitch, yaw, cx, cy, R, count = 48) {
  const points = [];
  for (let i = 0; i <= count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    let x = 0,
      y = 0,
      z = 0;
    if (axis === "equator") {
      x = Math.cos(angle);
      y = Math.sin(angle);
      z = 0;
    } else if (axis === "meridian-xz") {
      x = Math.cos(angle);
      y = 0;
      z = Math.sin(angle);
    } else if (axis === "meridian-yz") {
      x = 0;
      y = Math.cos(angle);
      z = Math.sin(angle);
    }
    const p = projectPoint(x, y, z, pitch, yaw, cx, cy, R);
    points.push(p);
  }
  return points;
}

// Convert points array to SVG path
function pointsToSvgPath(points) {
  if (!points || points.length === 0) return "";
  return points.reduce((path, pt, idx) => {
    return `${path} ${idx === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
  }, "");
}

// Preset camera views
const CAMERA_PRESETS = [
  { name: "3D Isometric", pitch: 22, yaw: -45, desc: "Classic 3D perspective" },
  { name: "Top (+Z / |0⟩)", pitch: 88, yaw: 0, desc: "Down Z-axis into equator" },
  { name: "Front (+X / |+⟩)", pitch: 0, yaw: 0, desc: "Facing Hadamard basis" },
  { name: "Side (+Y / |+i⟩)", pitch: 0, yaw: 90, desc: "Facing imaginary phase basis" },
  { name: "Bottom (-Z / |1⟩)", pitch: -88, yaw: 0, desc: "Looking up from south pole" }
];

// Basis state presets
const BASIS_STATES = [
  { label: "|0⟩", theta: 0, phi: 0, desc: "North Pole (Ground State)" },
  { label: "|1⟩", theta: 180, phi: 0, desc: "South Pole (Excited State)" },
  { label: "|+⟩", theta: 90, phi: 0, desc: "Front Equator (Equal Superposition)" },
  { label: "|−⟩", theta: 90, phi: 180, desc: "Back Equator (π Phase Superposition)" },
  { label: "|+i⟩", theta: 90, phi: 90, desc: "Right Equator (+i Phase Superposition)" },
  { label: "|−i⟩", theta: 90, phi: 270, desc: "Left Equator (−i Phase Superposition)" }
];

export default function BlochSphere() {
  // Qubit State Angles (Degrees)
  const [theta, setTheta] = useState(60);
  const [phi, setPhi] = useState(45);

  // Camera Orientation (Degrees)
  const [cameraPitch, setCameraPitch] = useState(22);
  const [cameraYaw, setCameraYaw] = useState(-45);

  // Visual toggles
  const [showProjection, setShowProjection] = useState(true);
  const [showMeridians, setShowMeridians] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0, pitch: 22, yaw: -45 });
  const svgRef = useRef(null);

  // Dimensions
  const CX = 200;
  const CY = 190;
  const RADIUS = 125;

  // Compute Cartesian Bloch Coordinates
  const stateVector = useMemo(() => {
    const tRad = (theta * Math.PI) / 180;
    const pRad = (phi * Math.PI) / 180;
    const x = Math.sin(tRad) * Math.cos(pRad);
    const y = Math.sin(tRad) * Math.sin(pRad);
    const z = Math.cos(tRad);

    // Probabilities
    const prob0 = Math.cos(tRad / 2) ** 2;
    const prob1 = Math.sin(tRad / 2) ** 2;

    // Amplitudes
    const amp0 = Math.cos(tRad / 2);
    const amp1Re = Math.sin(tRad / 2) * Math.cos(pRad);
    const amp1Im = Math.sin(tRad / 2) * Math.sin(pRad);

    return {
      x,
      y,
      z,
      prob0,
      prob1,
      amp0,
      amp1Re,
      amp1Im
    };
  }, [theta, phi]);

  // Project Origin
  const centerProjected = useMemo(() => {
    return projectPoint(0, 0, 0, cameraPitch, cameraYaw, CX, CY, RADIUS);
  }, [cameraPitch, cameraYaw]);

  // Project State Vector Tip
  const tipProjected = useMemo(() => {
    return projectPoint(
      stateVector.x,
      stateVector.y,
      stateVector.z,
      cameraPitch,
      cameraYaw,
      CX,
      CY,
      RADIUS
    );
  }, [stateVector, cameraPitch, cameraYaw]);

  // Project Equatorial Shadow (x, y, 0)
  const shadowProjected = useMemo(() => {
    return projectPoint(
      stateVector.x,
      stateVector.y,
      0,
      cameraPitch,
      cameraYaw,
      CX,
      CY,
      RADIUS
    );
  }, [stateVector, cameraPitch, cameraYaw]);

  // Project Coordinate Axes (+ and -)
  const axesProjected = useMemo(() => {
    const len = 1.35;
    return {
      zPos: projectPoint(0, 0, len, cameraPitch, cameraYaw, CX, CY, RADIUS),
      zNeg: projectPoint(0, 0, -len, cameraPitch, cameraYaw, CX, CY, RADIUS),
      xPos: projectPoint(len, 0, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      xNeg: projectPoint(-len, 0, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      yPos: projectPoint(0, len, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      yNeg: projectPoint(0, -len, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      // Basis labels on sphere surface
      pole0: projectPoint(0, 0, 1.05, cameraPitch, cameraYaw, CX, CY, RADIUS),
      pole1: projectPoint(0, 0, -1.05, cameraPitch, cameraYaw, CX, CY, RADIUS),
      statePlus: projectPoint(1.08, 0, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      stateMinus: projectPoint(-1.08, 0, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      statePlusI: projectPoint(0, 1.08, 0, cameraPitch, cameraYaw, CX, CY, RADIUS),
      stateMinusI: projectPoint(0, -1.08, 0, cameraPitch, cameraYaw, CX, CY, RADIUS)
    };
  }, [cameraPitch, cameraYaw]);

  // Project Equator & Meridian Rings
  const equatorRing = useMemo(() => {
    const raw = generateRingPoints("equator", cameraPitch, cameraYaw, CX, CY, RADIUS, 56);
    // Split into front (depth >= 0) and back (depth < 0) segments
    const front = [];
    const back = [];
    raw.forEach((pt) => {
      if (pt.depth >= -0.05) front.push(pt);
      else back.push(pt);
    });
    return {
      fullPath: pointsToSvgPath(raw),
      frontPath: pointsToSvgPath(front),
      backPath: pointsToSvgPath(back)
    };
  }, [cameraPitch, cameraYaw]);

  const meridianXZRing = useMemo(() => {
    const raw = generateRingPoints("meridian-xz", cameraPitch, cameraYaw, CX, CY, RADIUS, 56);
    return pointsToSvgPath(raw);
  }, [cameraPitch, cameraYaw]);

  const meridianYZRing = useMemo(() => {
    const raw = generateRingPoints("meridian-yz", cameraPitch, cameraYaw, CX, CY, RADIUS, 56);
    return pointsToSvgPath(raw);
  }, [cameraPitch, cameraYaw]);

  // Handle Drag to Rotate View
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pitch: cameraPitch,
      yaw: cameraYaw
    };
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      // Sensitivity
      const newYaw = (dragStartRef.current.yaw + dx * 0.6) % 360;
      let newPitch = dragStartRef.current.pitch - dy * 0.6;
      if (newPitch > 89) newPitch = 89;
      if (newPitch < -89) newPitch = -89;

      setCameraYaw(Math.round(newYaw));
      setCameraPitch(Math.round(newPitch));
    },
    [isDragging]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  // Apply Quantum Gate to Current State
  const applyGate = (gateName) => {
    const mat = GATE_MATRICES[gateName];
    if (!mat) return;

    const tRad = (theta * Math.PI) / 180;
    const pRad = (phi * Math.PI) / 180;
    const c0 = { re: Math.cos(tRad / 2), im: 0 };
    const c1 = {
      re: Math.sin(tRad / 2) * Math.cos(pRad),
      im: Math.sin(tRad / 2) * Math.sin(pRad)
    };

    const newC0 = addC(mulC(mat[0][0], c0), mulC(mat[0][1], c1));
    const newC1 = addC(mulC(mat[1][0], c0), mulC(mat[1][1], c1));

    // Remove global phase so c0 is real non-negative
    const phase0 = Math.atan2(newC0.im, newC0.re);
    const cosP0 = Math.cos(-phase0);
    const sinP0 = Math.sin(-phase0);
    const fixPhase = (c) => ({
      re: c.re * cosP0 - c.im * sinP0,
      im: c.re * sinP0 + c.im * cosP0
    });

    const adjC0 = fixPhase(newC0);
    const adjC1 = fixPhase(newC1);

    const norm0 = Math.min(1, Math.max(0, adjC0.re));
    const newThetaRad = 2 * Math.acos(norm0);
    let newPhiRad = Math.atan2(adjC1.im, adjC1.re);
    if (newPhiRad < 0) newPhiRad += 2 * Math.PI;

    setTheta(Math.round((newThetaRad * 180) / Math.PI));
    setPhi(Math.round((newPhiRad * 180) / Math.PI));
  };

  return (
    <div className="bloch-card enhanced-bloch">
      {/* Header */}
      <div className="bloch-header">
        <div>
          <span className="eyebrow">
            <Compass size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
            3D Quantum State Visualization
          </span>
          <h3>Interactive Bloch Sphere</h3>
        </div>
        <div className="bloch-header-badges">
          <span className="state-badge">|ψ⟩</span>
        </div>
      </div>

      {/* Camera View Switcher Bar */}
      <div className="bloch-camera-bar">
        <div className="camera-label-group">
          <Eye size={14} className="camera-icon" />
          <span>Change 3D View:</span>
        </div>
        <div className="camera-presets-list">
          {CAMERA_PRESETS.map((preset) => {
            const isActive =
              Math.abs(cameraPitch - preset.pitch) < 3 &&
              Math.abs(cameraYaw - preset.yaw) < 3;
            return (
              <button
                key={preset.name}
                className={`camera-view-btn ${isActive ? "active" : ""}`}
                onClick={() => {
                  setCameraPitch(preset.pitch);
                  setCameraYaw(preset.yaw);
                }}
                title={preset.desc}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D SVG Canvas Stage */}
      <div
        className={`sphere-3d-stage ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        ref={svgRef}
      >
        <div className="drag-hint-badge">
          <Move size={12} />
          <span>Drag canvas to freely orbit in 3D</span>
        </div>

        <svg
          viewBox="0 0 400 380"
          className="bloch-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sphere Body Gradient */}
            <radialGradient id="sphereShading" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#c8eafa" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#087ea5" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1674c4" stopOpacity="0.22" />
            </radialGradient>

            {/* Glowing State Vector Marker */}
            <radialGradient id="tipGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="40%" stopColor="#087ea5" />
              <stop offset="100%" stopColor="#087ea5" stopOpacity="0" />
            </radialGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrow Marker */}
            <marker
              id="vectorArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--cyan)" />
            </marker>
          </defs>

          {/* 1. Translucent 3D Sphere Orb */}
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="url(#sphereShading)"
            stroke="var(--line-soft)"
            strokeWidth="1.5"
            className="sphere-silhouette"
          />

          {/* 2. Negative/Back Coordinate Axes (behind sphere center) */}
          <g className="back-axes" stroke="var(--line-soft)" strokeDasharray="3 3" strokeWidth="1">
            <line x1={centerProjected.x} y1={centerProjected.y} x2={axesProjected.zNeg.x} y2={axesProjected.zNeg.y} />
            <line x1={centerProjected.x} y1={centerProjected.y} x2={axesProjected.xNeg.x} y2={axesProjected.xNeg.y} />
            <line x1={centerProjected.x} y1={centerProjected.y} x2={axesProjected.yNeg.x} y2={axesProjected.yNeg.y} />
          </g>

          {/* 3. Meridian Wireframes (Optional Toggle) */}
          {showMeridians && (
            <g className="meridians-group" opacity="0.45" stroke="var(--line-soft)" fill="none">
              <path d={meridianXZRing} strokeWidth="1" strokeDasharray="4 4" />
              <path d={meridianYZRing} strokeWidth="1" strokeDasharray="4 4" />
            </g>
          )}

          {/* 4. Equator Ring (x-y superposition plane) */}
          <path
            d={equatorRing.fullPath}
            fill="none"
            stroke="rgba(65, 105, 193, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="equator-ring-back"
          />
          <path
            d={equatorRing.frontPath}
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="1.8"
            className="equator-ring-front"
          />

          {/* 5. Positive Coordinate Axes (coming toward viewer) */}
          <g className="front-axes" strokeWidth="1.5">
            {/* Z-Axis */}
            <line
              x1={centerProjected.x}
              y1={centerProjected.y}
              x2={axesProjected.zPos.x}
              y2={axesProjected.zPos.y}
              stroke="var(--cyan)"
            />
            {/* X-Axis */}
            <line
              x1={centerProjected.x}
              y1={centerProjected.y}
              x2={axesProjected.xPos.x}
              y2={axesProjected.xPos.y}
              stroke="#3b5998"
            />
            {/* Y-Axis */}
            <line
              x1={centerProjected.x}
              y1={centerProjected.y}
              x2={axesProjected.yPos.x}
              y2={axesProjected.yPos.y}
              stroke="#3b5998"
            />
          </g>

          {/* 6. Projection Lines to show (theta, phi) components */}
          {showProjection && (
            <g className="projection-lines" opacity="0.75">
              {/* Origin to shadow on equator */}
              <line
                x1={centerProjected.x}
                y1={centerProjected.y}
                x2={shadowProjected.x}
                y2={shadowProjected.y}
                stroke="#3b5998"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {/* Shadow on equator up to vector tip */}
              <line
                x1={shadowProjected.x}
                y1={shadowProjected.y}
                x2={tipProjected.x}
                y2={tipProjected.y}
                stroke="var(--cyan)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {/* Equatorial shadow dot */}
              <circle
                cx={shadowProjected.x}
                cy={shadowProjected.y}
                r="3.5"
                fill="#3b5998"
                opacity="0.8"
              />
            </g>
          )}

          {/* 7. Center Origin Dot */}
          <circle cx={centerProjected.x} cy={centerProjected.y} r="3" fill="var(--text)" />

          {/* 8. Main State Vector Arrow */}
          <line
            x1={centerProjected.x}
            y1={centerProjected.y}
            x2={tipProjected.x}
            y2={tipProjected.y}
            stroke="var(--cyan)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#glowFilter)"
          />

          {/* Glowing Vector Tip Marker */}
          <circle
            cx={tipProjected.x}
            cy={tipProjected.y}
            r="10"
            fill="url(#tipGlow)"
            opacity="0.7"
          />
          <circle
            cx={tipProjected.x}
            cy={tipProjected.y}
            r="5"
            fill="var(--cyan)"
            stroke="#fff"
            strokeWidth="1.5"
          />

          {/* 9. Basis State Labels on the Sphere */}
          <g className="sphere-basis-labels" font-family="DM Mono, monospace" font-size="12" font-weight="700">
            {/* North Pole |0⟩ */}
            <text
              x={axesProjected.pole0.x}
              y={axesProjected.pole0.y - 6}
              textAnchor="middle"
              fill="var(--text)"
              className="basis-label-click"
              onClick={() => { setTheta(0); setPhi(0); }}
            >
              |0⟩
            </text>

            {/* South Pole |1⟩ */}
            <text
              x={axesProjected.pole1.x}
              y={axesProjected.pole1.y + 14}
              textAnchor="middle"
              fill="var(--text)"
              className="basis-label-click"
              onClick={() => { setTheta(180); setPhi(0); }}
            >
              |1⟩
            </text>

            {/* +X basis |+⟩ */}
            <text
              x={axesProjected.statePlus.x + 8}
              y={axesProjected.statePlus.y + 4}
              textAnchor="start"
              fill="var(--cyan)"
              className="basis-label-click"
              onClick={() => { setTheta(90); setPhi(0); }}
            >
              |+⟩ (+X)
            </text>

            {/* +Y basis |+i⟩ */}
            <text
              x={axesProjected.statePlusI.x}
              y={axesProjected.statePlusI.y - 8}
              textAnchor="middle"
              fill="#3b5998"
              className="basis-label-click"
              onClick={() => { setTheta(90); setPhi(90); }}
            >
              |+i⟩ (+Y)
            </text>
          </g>

          {/* Axis Labels (+Z, +X, +Y) */}
          <g font-family="DM Mono, monospace" font-size="10" fill="var(--muted)">
            <text x={axesProjected.zPos.x + 8} y={axesProjected.zPos.y} textAnchor="start">+Z</text>
            <text x={axesProjected.xPos.x} y={axesProjected.xPos.y + 16} textAnchor="middle">+X</text>
            <text x={axesProjected.yPos.x + 10} y={axesProjected.yPos.y + 4} textAnchor="start">+Y</text>
          </g>
        </svg>

        {/* Floating View Angle Badge */}
        <div className="camera-readout-badge">
          <span>Pitch: <strong>{cameraPitch}°</strong></span>
          <span>Yaw: <strong>{cameraYaw}°</strong></span>
        </div>
      </div>

      {/* Basis State Presets & Gate Operations */}
      <div className="bloch-presets-and-gates">
        {/* Quick Basis States */}
        <div className="bloch-sub-row">
          <span className="bloch-row-title">Basis States:</span>
          <div className="state-preset-pills">
            {BASIS_STATES.map((st) => {
              const isSelected = theta === st.theta && phi === st.phi;
              return (
                <button
                  key={st.label}
                  className={`state-pill ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setTheta(st.theta);
                    setPhi(st.phi);
                  }}
                  title={st.desc}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply Quantum Gates */}
        <div className="bloch-sub-row">
          <span className="bloch-row-title">Apply Gate:</span>
          <div className="gate-transform-pills">
            {["X", "Y", "Z", "H", "S", "T"].map((g) => (
              <button
                key={g}
                className="bloch-gate-btn"
                onClick={() => applyGate(g)}
                title={`Rotate Bloch vector by applying ${g} gate`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Angle Sliders (θ & φ) */}
      <div className="bloch-controls-grid">
        <div className="slider-control-card">
          <div className="slider-label-row">
            <span>θ (Polar Angle) — North to South:</span>
            <strong>{theta}°</strong>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
            className="bloch-range-slider"
          />
          <div className="slider-endpoints">
            <span>0° (|0⟩)</span>
            <span>90° (Equator)</span>
            <span>180° (|1⟩)</span>
          </div>
        </div>

        <div className="slider-control-card">
          <div className="slider-label-row">
            <span>φ (Azimuthal Angle) — Equator Phase:</span>
            <strong>{phi}°</strong>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
            className="bloch-range-slider"
          />
          <div className="slider-endpoints">
            <span>0° (+X / |+⟩)</span>
            <span>90° (+Y / |+i⟩)</span>
            <span>180° (−X / |−⟩)</span>
            <span>270° (−Y)</span>
          </div>
        </div>
      </div>

      {/* Probability Distribution & Cartesian Values */}
      <div className="bloch-output-footer">
        <div className="bloch-prob-meters">
          <div className="prob-pill-item">
            <div className="prob-header">
              <span className="prob-ket">|0⟩</span>
              <strong>{(stateVector.prob0 * 100).toFixed(1)}%</strong>
            </div>
            <div className="mini-prob-track">
              <div
                className="mini-prob-fill"
                style={{ width: `${(stateVector.prob0 * 100).toFixed(1)}%` }}
              />
            </div>
          </div>

          <div className="prob-pill-item">
            <div className="prob-header">
              <span className="prob-ket">|1⟩</span>
              <strong>{(stateVector.prob1 * 100).toFixed(1)}%</strong>
            </div>
            <div className="mini-prob-track">
              <div
                className="mini-prob-fill"
                style={{ width: `${(stateVector.prob1 * 100).toFixed(1)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3D Coordinates Vector */}
        <div className="vector-values-ribbon">
          <span className="coord-chip">
            X: <strong>{stateVector.x.toFixed(2)}</strong>
          </span>
          <span className="coord-chip">
            Y: <strong>{stateVector.y.toFixed(2)}</strong>
          </span>
          <span className="coord-chip">
            Z: <strong>{stateVector.z.toFixed(2)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}