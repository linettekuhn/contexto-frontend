"use client";

import { useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import styles from "./styles/Slider.module.css";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const SNAP_POINTS = [0, 0.5, 1];

export default function Slider({ value, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const THUMB_SIZE = 25;

  // convert value (0–1) to x pixel position
  const valueToX = (v: number, width: number) => v * (width - THUMB_SIZE);

  // convert x pixel to value (0–1)
  const xToValue = (px: number, width: number) =>
    Math.max(0, Math.min(1, px / (width - THUMB_SIZE)));

  const snapToNearest = (raw: number) =>
    SNAP_POINTS.reduce((prev, curr) =>
      Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev,
    );

  const handleDragStart = () => {
    const width = trackRef.current?.offsetWidth ?? 0;
    x.set(valueToX(value, width));
  };

  const handleDragEnd = () => {
    const width = trackRef.current?.offsetWidth ?? 0;
    const raw = xToValue(x.get(), width);
    const snapped = snapToNearest(raw);
    const targetX = valueToX(snapped, width);

    animate(x, targetX, { type: "spring", stiffness: 400, damping: 30 });
    onChange(snapped);
  };

  return (
    <div className={styles.sliderWrapper}>
      {/* Custom drag-based track */}
      <div
        ref={trackRef}
        style={{
          position: "relative",
          height: THUMB_SIZE,
          borderRadius: "var(--space-2xs)",
          backgroundColor: "rgb(var(--color-primary-700))",
          boxShadow: "0 0 8px 0 rgba(var(--color-primary-700), 0.4)",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={(e) => {
          const rect = trackRef.current!.getBoundingClientRect();
          const width = rect.width;
          const clickX = e.clientX - rect.left - THUMB_SIZE / 2;
          const raw = xToValue(clickX, width);
          const snapped = snapToNearest(raw);
          const targetX = valueToX(snapped, width);
          animate(x, targetX, { type: "spring", stiffness: 400, damping: 30 });
          onChange(snapped);
        }}
      >
        {/* Draggable thumb */}
        <motion.div
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          style={{
            x,
            position: "absolute",
            top: "50%",
            translateY: "-50%",
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: "var(--space-3xs)",
            backgroundColor: "rgb(var(--color-primary-500))",
            boxShadow: "0 0 8px 0 rgba(var(--color-primary-500), 0.4)",
            cursor: "pointer",
            touchAction: "none",
          }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>

      <div className={styles.sliderLabels}>
        <p>Formal</p>
        <p>Neutral</p>
        <p>Colloquial</p>
      </div>
    </div>
  );
}
