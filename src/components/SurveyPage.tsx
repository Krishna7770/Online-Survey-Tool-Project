import React from "react";
import QuestionField from "./QuestionField";
import { useSurvey } from "../context/SurveyContext";

interface SurveyPageProps {
  page: any;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const SurveyPage: React.FC<SurveyPageProps> = ({
  page,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  const { answers } = useSurvey();

  async function handleSubmit() {
    const useridStr = localStorage.getItem("userid");
    const userid = useridStr ? parseInt(useridStr, 10) : 0;

    if (!userid) {
      alert("You are not logged in. Please login again.");
      return;
    }

    try {
      const payload = {
        qid: 1,
        userid,
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      };

      const res = await fetch(
        "http://localhost/online-survey-api/submitSurvey.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Thank you! Your answers have been saved.");
        if (onNext) onNext(); // Go to Summary page
      } else {
        alert("Saving failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error while saving. Please try again.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.pageTitle}>{page.title}</h2>

        {page.introText && <p style={styles.intro}>{page.introText}</p>}

        {page.categories.map((cat: any) => (
          <div key={cat.categoryId} style={styles.category}>
            <h3 style={styles.categoryTitle}>{cat.title}</h3>

            <div style={styles.questionsContainer}>
              {cat.questions.map((q: any) => (
                <div key={q.questionId} style={styles.questionBlock}>
                  <QuestionField question={q} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={styles.navButtons}>
          {!isFirst && (
            <button style={styles.prevButton} onClick={onPrev}>
              ← Previous
            </button>
          )}

          {!isLast && (
            <button style={styles.nextButton} onClick={onNext}>
              Next →
            </button>
          )}

          {isLast && (
            <button style={styles.submitButton} onClick={handleSubmit}>
              Submit Survey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;

// --- Styles same as before ---
const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    width: "90%",
    maxWidth: "1050px",
    background: "white",
    padding: "45px",
    borderRadius: "20px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
  },
  pageTitle: {
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "15px",
  },
  intro: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#666",
  },
  category: {
    marginBottom: "40px",
    padding: "20px",
    background: "#f5f6fa",
    borderRadius: "12px",
  },
  categoryTitle: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  questionsContainer: { display: "flex", flexDirection: "column", gap: "20px" },
  questionBlock: {
    padding: "15px",
    background: "white",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  navButtons: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
  prevButton: {
    padding: "12px 20px",
    background: "#bfc4cc",
    color: "white",
    borderRadius: "12px",
    border: "none",
  },
  nextButton: {
    padding: "12px 22px",
    background: "#4b7bec",
    color: "white",
    borderRadius: "12px",
    border: "none",
  },
  submitButton: {
    padding: "12px 22px",
    background: "#20bf6b",
    color: "white",
    borderRadius: "12px",
    border: "none",
  },
};
