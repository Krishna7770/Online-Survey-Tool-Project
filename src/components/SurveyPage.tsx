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
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Page Title */}
        <h2 style={styles.pageTitle}>{page.title}</h2>

        {/* Intro */}
        {page.introText && (
          <p style={styles.intro}>{page.introText}</p>
        )}

        {/* Categories */}
        {page.categories.map((cat: any) => (
          <div key={cat.categoryId} style={styles.category}>
            <h3 style={styles.categoryTitle}>{cat.title}</h3>

            {/* Questions inside category */}
            <div style={styles.questionsContainer}>
              {cat.questions.map((q: any) => (
                <div key={q.questionId} style={styles.questionBlock}>
                  <QuestionField question={q} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
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
            <button style={styles.submitButton} onClick={() => alert("Submit coming soon!")}>
              Submit Survey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;

// ---------------------
// Modern UI Styles
// ---------------------
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
    border: "1px solid rgba(255,255,255,0.6)",
  },

  pageTitle: {
    fontSize: "30px",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: 650,
    color: "#222",
  },

  intro: {
    marginBottom: "30px",
    fontSize: "17px",
    color: "#555",
    textAlign: "center",
  },

  category: {
    marginBottom: "45px",
    padding: "20px 25px",
    background: "rgba(250,250,255,0.8)",
    borderRadius: "14px",
    border: "1px solid #e6e6f0",
  },

  categoryTitle: {
    fontSize: "24px",
    marginBottom: "22px",
    paddingBottom: "8px",
    borderBottom: "2px solid #d5d5e0",
    color: "#333",
    fontWeight: 600,
  },

  questionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  questionBlock: {
    padding: "18px 20px",
    borderRadius: "10px",
    background: "#f5f6fa",
    border: "1px solid #ddd",
  },

  navButtons: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
  },

  prevButton: {
    padding: "12px 20px",
    background: "#bfc4cc",
    color: "white",
    borderRadius: "12px",
    border: "none",
    fontSize: "17px",
    cursor: "pointer",
    fontWeight: 500,
  },

  nextButton: {
    padding: "12px 22px",
    background: "#4b7bec",
    color: "white",
    borderRadius: "12px",
    border: "none",
    fontSize: "17px",
    cursor: "pointer",
    fontWeight: 500,
  },

  submitButton: {
    padding: "12px 22px",
    background: "#20bf6b",
    color: "white",
    borderRadius: "12px",
    border: "none",
    fontSize: "17px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
