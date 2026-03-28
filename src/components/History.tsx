import { useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../services/HistoryService";
import type { HistoryItem } from "../types";
import { TbChevronUp, TbHistory } from "react-icons/tb";
import { getDialectLabel, getLanguageLabel } from "../constants/languages";
import styles from "./styles/History.module.css";
import { FaRepeat } from "react-icons/fa6";
import TextBoxHeader from "./TextBoxHeader";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

function HistoryListItem({
  item,
  index,
}: {
  item: HistoryItem;
  index: number;
}) {
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
    <motion.div
      className={styles.historyItem}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.06,
        ease: "easeOut",
      }}
    >
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
        <motion.button
          className={styles.expandButton}
          onClick={() => setExpanded((e) => !e)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {expanded ? "See preview" : "See full translation"}
        </motion.button>
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
    </motion.div>
  );
}

export default function HistoryButton() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  const { data: history, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
    enabled: !!user, // fetch as soon as user is logged in
    staleTime: 10000 * 60 * 5, // cache for 5 min
  });

  const handleToggle = async () => {
    setVisible((prev) => !prev);
    console.log(history);
    console.log(history?.length);
  };

  if (!user) return null;
  if (!history || history.length === 0) return null;

  return (
    <>
      <motion.button
        className="button"
        onClick={handleToggle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {visible ? (
          <>
            <TbChevronUp /> Hide history
          </>
        ) : (
          <>
            <TbHistory /> View history
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {!isLoading && visible && history && (
          <motion.div
            className={styles.historyList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {history.map((item, index) => (
              <HistoryListItem key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
