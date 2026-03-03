import styles from "./styles/Slider.module.css";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function Slider({ value, onChange }: Props) {
  return (
    <div className={styles.sliderWrapper}>
      <input
        type="range"
        min={0}
        max={1}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.sliderLabels}>
        <p>Formal</p>
        <p>Neutral</p>
        <p>Colloquial</p>
      </div>
    </div>
  );
}
