import "./App.css";
import { useState, useEffect } from "react";

import SurveyPage from "./components/SurveyPage";
import FinalSummaryPage from "./components/FinalSummaryPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { useSurvey } from "./hooks/useSurvey";

export default function App() {
  // -----------------------------
  // LOGIN / REGISTER / SURVEY SWITCH
  // -----------------------------
  const [view, setView] = useState<string>(
    localStorage.getItem("token") ? "survey" : "login"
  );

  // Load survey pages from backend
  const { survey: surveyData, loading } = useSurvey(1);

  // Current page index
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // When survey loads, go to page 0
  useEffect(() => {
    if (surveyData && surveyData.pages && surveyData.pages.length > 0) {
      setCurrentPageIndex(0);
    }
  }, [surveyData]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    setView("login");
  }

  // -----------------------------
  // LOGIN SCREEN
  // -----------------------------
  if (view === "login") {
    return (
      <LoginPage
        onLogin={(mode?: string) => {
          if (mode === "register") setView("register");
          else setView("survey");
        }}
      />
    );
  }

  // REGISTER SCREEN
  if (view === "register") {
    return <RegisterPage onBack={() => setView("login")} />;
  }

  // -----------------------------
  // SURVEY SCREEN
  // -----------------------------
  if (loading || !surveyData || !surveyData.pages) {
    return <p style={{ padding: "20px" }}>Loading survey...</p>;
  }

  // Inject a summary page at the end automatically
  const pages = [
    ...surveyData.pages,
    {
      pageId: "summary",
      title: "Summary / Download",
      isSummaryPage: true,
    },
  ];

  const currentPage = pages[currentPageIndex];

  const lastSurveyPageIndex = pages.length - 2; // last before summary

  const goNext = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>{surveyData.title}</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* TOP PAGE BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {pages.map((page: any, index: number) => (
          <button
            key={page.pageId}
            onClick={() => setCurrentPageIndex(index)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border:
                currentPageIndex === index
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
              backgroundColor:
                currentPageIndex === index ? "#e0f0ff" : "#f9f9f9",
              cursor: "pointer",
            }}
          >
            {page.title}
          </button>
        ))}
      </div>

      {/* PAGE CONTENT */}
      {currentPage.isSummaryPage ? (
        <FinalSummaryPage />
      ) : (
        <SurveyPage
          page={currentPage}
          onNext={goNext}
          onPrev={goPrev}
          isFirst={currentPageIndex === 0}
          isLast={currentPageIndex === lastSurveyPageIndex}
        />
      )}
    </div>
  );
}
