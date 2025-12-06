import React, { useEffect, useState } from "react";
import { useSurvey } from "../context/SurveyContext";

const FinalSummaryPage: React.FC = () => {
  const { answers } = useSurvey();
  const [surveyData, setSurveyData] = useState<any | null>(null);

  // Load survey structure from backend
  useEffect(() => {
    fetch("http://localhost/online-survey-api/getSurvey.php?qid=1")
      .then((res) => res.json())
      .then((data) => setSurveyData(data))
      .catch((err) => console.error("Summary load error:", err));
  }, []);

  if (!surveyData) return <p>Loading summary...</p>;

  const totalQuestions = Object.keys(answers).length;

  return (
    <div
      style={{
        maxWidth: "1050px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, color: "#1e3a8a" }}>
          Survey Summary
        </h1>
        <p style={{ fontSize: "17px", color: "#475569" }}>
          Below is a clear summary of all the responses you submitted.
        </p>
      </div>

      {/* KPI CARD */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <div
          style={{
            padding: "22px",
            background: "white",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            width: "260px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#475569", fontSize: "16px", marginBottom: "8px" }}>
            Questions Answered
          </h3>
          <p style={{ color: "#1e3a8a", fontSize: "32px", fontWeight: 700 }}>{totalQuestions}</p>
        </div>
      </div>

      {/* PDF DOWNLOAD BUTTON */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "12px 22px",
            background: "#1d4ed8",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          📄 Download PDF
        </button>
      </div>

      {/* SURVEY ANSWERS */}
      {surveyData.pages.map((page: any, pageIndex: number) => (
        <div
          key={page.pageId}
          style={{
            marginBottom: "45px",
            padding: "30px",
            background: "#f8fafc",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ fontSize: "24px", color: "#1e40af", marginBottom: "18px" }}>
            {pageIndex + 1}. {page.title}
          </h2>

          {/* CATEGORY SECTIONS */}
          {page.categories.map((cat: any) => (
            <div
              key={cat.categoryId}
              style={{
                marginBottom: "25px",
                padding: "20px",
                background: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  color: "#1e3a8a",
                  marginBottom: "12px",
                  fontSize: "19px",
                  borderLeft: "4px solid #3b82f6",
                  paddingLeft: "10px",
                }}
              >
                {cat.title}
              </h3>

              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {cat.questions.map((q: any) => {
                  let ans = answers[q.questionId];

                  // FIX: Dropdown answer should show actual text, not number.
                  if (q.options && Array.isArray(q.options) && ans !== undefined) {
                    const found = q.options.find((opt: any) => opt.value === ans);
                    if (found) ans = found.text;
                  }

                  return (
                    <li
                      key={q.questionId}
                      style={{
                        background: "#f1f5f9",
                        padding: "15px 18px",
                        marginBottom: "12px",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <strong style={{ fontSize: "16px", color: "#0f172a" }}>
                        🔹 {q.label}
                      </strong>
                      <br />
                      <span
                        style={{
                          fontSize: "15px",
                          color: "#334155",
                          marginLeft: "28px",
                        }}
                      >
                        {ans !== undefined && ans !== null && ans !== ""
                          ? ans.toString()
                          : "No answer"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* THANK YOU SECTION */}
      <div style={{ textAlign: "center", marginTop: "50px", padding: "30px" }}>
        <h2 style={{ fontSize: "30px", color: "#16a34a" }}>🎉 Thank You!</h2>
        <p style={{ fontSize: "17px", color: "#475569" }}>
          Your responses have been successfully recorded.
        </p>
      </div>
    </div>
  );
};

export default FinalSummaryPage;
