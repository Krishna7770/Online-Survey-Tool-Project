import "./App.css";
import { useState, useEffect } from "react";

import SurveyPage from "./components/SurveyPage";
import FinalSummaryPage from "./components/FinalSummaryPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { useSurvey } from "./hooks/useSurvey";

export default function App() {
  // -----------------------------  
  // 1. AUTH STATE HOOK
  // -----------------------------
  const [view, setView] = useState<string>(
    localStorage.getItem("token") ? "survey" : "login"
  );

  // -----------------------------  
  // 2. LOAD SURVEY HOOK
  // -----------------------------
  const { survey: surveyData, loading } = useSurvey(1);

  // -----------------------------  
  // 3. SURVEY PAGE HOOK
  // Always define, even if login/register page is active
  // -----------------------------
  const [currentPageId, setCurrentPageId] = useState<string>("");

  // When survey loads → set first page
  useEffect(() => {
    if (surveyData && surveyData.pages.length > 0) {
      if (!currentPageId) {
        setCurrentPageId(surveyData.pages[0].pageId);
      }
    }
  }, [surveyData, currentPageId]);

  // -----------------------------
  // LOGOUT
  // -----------------------------
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    setView("login");
  }

  // -----------------------------
  // NOW WE RENDER SCREENS SAFELY
  // -----------------------------

  // LOGIN SCREEN
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

  // SURVEY SCREEN
  if (loading || !surveyData) {
    return <p style={{ padding: "20px" }}>Loading survey...</p>;
  }

  const currentPage = surveyData.pages.find(
    (p: any) => p.pageId === currentPageId
  );

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

      {/* NAVIGATION */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {surveyData.pages.map((page: any) => (
          <button
            key={page.pageId}
            onClick={() => setCurrentPageId(page.pageId)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border:
                currentPageId === page.pageId
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
              backgroundColor:
                currentPageId === page.pageId ? "#e0f0ff" : "#f9f9f9",
              cursor: "pointer",
            }}
          >
            {page.title}
          </button>
        ))}
      </div>

      {/* SURVEY CONTENT */}
      {currentPage ? (
        currentPage.isSummaryPage ? (
          <FinalSummaryPage />
        ) : (
          <SurveyPage page={currentPage} />
        )
      ) : (
        <p>Page not found.</p>
      )}
    </div>
  );
}
