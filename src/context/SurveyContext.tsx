import React, { createContext, useContext, useState } from 'react';

// This defines the structure of how we’ll store answers
type AnswerMap = {
  [questionId: string]: any; // Example: "q1": 5, "q2": "yes", "q3": {x:2, y:4}
};

// The context will hold two things:
// 1. answers (the stored values)
// 2. setAnswer() (a function to update them)
interface SurveyContextType {
  answers: AnswerMap;
  setAnswer: (questionId: string, value: any) => void;
}

// Create the context (empty initially)
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

// Provider = special wrapper that gives data to all components inside it
export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});

  // This function updates the state when a user changes an answer
  const setAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <SurveyContext.Provider value={{ answers, setAnswer }}>
      {children}
    </SurveyContext.Provider>
  );
};

// This is a small helper function to easily use the context
export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) throw new Error('useSurvey must be used inside SurveyProvider');
  return context;
};
