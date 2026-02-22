import type { PropsWithChildren } from "react";
import styles from "./styles/TextBoxHeader.module.css";

type Props = {
  headerType: "input" | "output";
};

export default function TextBoxHeader({
  children,
  headerType,
}: PropsWithChildren<Props>) {
  return (
    <div id={headerType} className={styles.textBoxHeader}>
      {children}
    </div>
  );
}
