import { useEffect, useState } from "react";

export function useSurvey(qid: number) {
  const [survey, setSurvey] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `http://localhost/online-survey-api/getSurvey.php?qid=${qid}`
        );
        const data = await res.json();
        setSurvey(data);
      } catch (err) {
        console.error("Failed to load survey", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [qid]);

  return { survey, loading };
}
