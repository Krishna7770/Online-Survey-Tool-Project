import React from "react";
import { useSurvey } from "../context/SurveyContext";

// Modern professional input styles
const baseLabel: React.CSSProperties = {
  display: "block",
  fontSize: "17px",
  fontWeight: 500,
  marginBottom: "8px",
  color: "#333",
};

const inputBox: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d3d6e0",
  background: "#fff",
  fontSize: "15px",
  outline: "none",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

const selectBox: React.CSSProperties = {
  ...inputBox,
  cursor: "pointer",
};

const sliderWrapper: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const sliderStyle: React.CSSProperties = {
  flex: 1,
  accentColor: "#4b7bec",
};

interface QuestionProps {
  question: {
    questionId: string;
    label: string;
    type: string;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    options?: { value: number; text: string }[];
    xLabel?: string;
    yLabel?: string;
  };
}

const QuestionField: React.FC<QuestionProps> = ({ question }) => {
  const { answers, setAnswer } = useSurvey();
  const value = answers[question.questionId] ?? "";

  // -------------------
  // TEXT INPUT
  // -------------------
  if (question.type === "text") {
    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={baseLabel}>{question.label}</label>
        <input
          type="text"
          placeholder={question.placeholder || ""}
          style={inputBox}
          value={value}
          onChange={(e) => setAnswer(question.questionId, e.target.value)}
        />
      </div>
    );
  }

  // -------------------
  // DATE
  // -------------------
  if (question.type === "date") {
    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={baseLabel}>{question.label}</label>
        <input
          type="date"
          style={inputBox}
          value={value}
          onChange={(e) => setAnswer(question.questionId, e.target.value)}
        />
      </div>
    );
  }

  // -------------------
  // SLIDER
  // -------------------
  if (question.type === "slider") {
    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={baseLabel}>
          {question.label} &nbsp;
          <span style={{ color: "#4b7bec", fontWeight: 600 }}>
            {value || question.min}
          </span>
        </label>

        <div style={sliderWrapper}>
          <input
            type="range"
            min={question.min ?? 0}
            max={question.max ?? 10}
            step={question.step ?? 1}
            style={sliderStyle}
            value={value || question.min}
            onChange={(e) =>
              setAnswer(question.questionId, Number(e.target.value))
            }
          />
        </div>
      </div>
    );
  }

  // -------------------
  // DROPDOWN
  // -------------------
  if (question.type === "dropdown") {
    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={baseLabel}>{question.label}</label>

        <select
          style={selectBox}
          value={value}
          onChange={(e) =>
            setAnswer(question.questionId, Number(e.target.value))
          }
        >
          <option value="">Select...</option>
          {question.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // -------------------
  // RADIO INPUTS
  // -------------------
  if (question.type === "radio") {
    return (
      <div style={{ marginBottom: "25px" }}>
        <label style={baseLabel}>{question.label}</label>

        {question.options?.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: "block",
              marginBottom: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <input
              type="radio"
              name={question.questionId}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => setAnswer(question.questionId, opt.value)}
              style={{ marginRight: "8px" }}
            />
            {opt.text}
          </label>
        ))}
      </div>
    );
  }

  // -------------------
  // XY TYPE (not used)
  // -------------------
  if (question.type === "xy") {
    const xy = value || { x: 0, y: 0 };

    return (
      <div style={{ marginBottom: "20px" }}>
        <label style={baseLabel}>{question.label}</label>

        <label>{question.xLabel}</label>
        <input
          style={{ ...inputBox, marginBottom: "10px" }}
          type="number"
          value={xy.x}
          min={question.min}
          max={question.max}
          onChange={(e) =>
            setAnswer(question.questionId, {
              ...xy,
              x: Number(e.target.value),
            })
          }
        />

        <label>{question.yLabel}</label>
        <input
          style={inputBox}
          type="number"
          value={xy.y}
          min={question.min}
          max={question.max}
          onChange={(e) =>
            setAnswer(question.questionId, {
              ...xy,
              y: Number(e.target.value),
            })
          }
        />
      </div>
    );
  }

  return <p>Unsupported question type: {question.type}</p>;
};

export default QuestionField;
