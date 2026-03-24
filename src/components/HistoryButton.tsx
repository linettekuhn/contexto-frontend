import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../services/HistoryService";
import type { HistoryItem } from "../types";

export default function HistoryButton() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  if (!user) return null;

  const handleHistory = async () => {
    setHistory(await getHistory());
    console.log(history);
  };

  return (
    <>
      <button type="button" onClick={handleHistory}>
        get history
      </button>
      {history && (
        <div>
          {history.map((item) => (
            <p>{item.translated_text}</p>
          ))}
        </div>
      )}
    </>
  );
}
