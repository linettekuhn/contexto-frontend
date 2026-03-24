import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../services/HistoryService";
import type { HistoryItem } from "../types";
import { TbHistory } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { getDialectLabel, getLanguageLabel } from "../constants/languages";
import styles from "./styles/History.module.css";
import { FaRepeat } from "react-icons/fa6";

function HistoryListItem({ item }: { item: HistoryItem }) {
  const sourceLabel = getLanguageLabel(item.source_language);
  const targetLabel = getLanguageLabel(item.target_language);
  const dialectLabel = getDialectLabel(item.target_language, item.dialect);

  return (
    <div className={styles.historyItem}>
      <div className={styles.textWrapper}>
        <p className={`caption ${styles.header}`}>{sourceLabel}</p>
        <p className={styles.text}>{item.original_text}</p>
      </div>
      <div className={styles.iconWrapper}>
        <FaRepeat />
      </div>
      <div className={styles.textWrapper}>
        <p className={`caption ${styles.header}`}>
          {targetLabel} · {dialectLabel}
        </p>
        <p className={styles.text}>{item.translated_text}</p>
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
