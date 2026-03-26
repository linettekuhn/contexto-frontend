import { useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../services/HistoryService";
import type { HistoryItem } from "../types";
import { TbHistory } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { getDialectLabel, getLanguageLabel } from "../constants/languages";
import styles from "./styles/History.module.css";
import { FaRepeat } from "react-icons/fa6";
import TextBoxHeader from "./TextBoxHeader";

function HistoryListItem({ item }: { item: HistoryItem }) {
  const [expanded, setExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);

  const sourceRef = useRef<HTMLParagraphElement>(null);
  const targetRef = useRef<HTMLParagraphElement>(null);

  // check if text is large enough to need clamping
  useLayoutEffect(() => {
    const source = sourceRef.current;
    const target = targetRef.current;
    const isClamped = (el: HTMLParagraphElement) => {
      return el.scrollHeight > el.clientHeight + 2;
    };
    if ((source && isClamped(source)) || (target && isClamped(target))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNeedsExpand(true);
    }
  }, [item]);

  const sourceLabel = getLanguageLabel(item.source_language);
  const targetLabel = getLanguageLabel(item.target_language);
  const dialectLabel = getDialectLabel(item.target_language, item.dialect);

  return (
    <div className={styles.historyItem}>
      <div className={styles.headers}>
        <TextBoxHeader headerType="input">
          <div className="caption">FROM {sourceLabel}</div>
        </TextBoxHeader>
        <TextBoxHeader headerType="output">
          <div className="caption">
            TO {dialectLabel} {targetLabel}
          </div>
        </TextBoxHeader>
      </div>
      {needsExpand && (
        <button
          className={styles.expandButton}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "See preview" : "See full translation"}
        </button>
      )}
      <div className={styles.textsRow}>
        <div className={styles.textWrapper}>
          <p
            ref={sourceRef}
            className={`${styles.text} ${expanded ? "" : styles.textClamped}`}
          >
            {item.original_text}
          </p>
        </div>
        <div className={styles.iconWrapper}>
          <FaRepeat />
        </div>
        <div className={styles.textWrapper}>
          <p
            ref={targetRef}
            className={`${styles.text} ${expanded ? "" : styles.textClamped}`}
          >
            {item.translated_text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HistoryButton() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const navigate = useNavigate();

  if (!user) return null;

  const handleHistory = async () => {
    try {
      setHistory(await getHistory());
      console.log(history);
    } catch (error) {
      console.error(error);
      navigate("/auth");
      return;
    }
  };

  return (
    <>
      <button className="button" onClick={handleHistory}>
        <TbHistory /> View translation history
      </button>
      {history && (
        <div className={styles.historyList}>
          {history.map((item) => (
            <HistoryListItem item={item} />
          ))}
        </div>
      )}
    </>
  );
}
