const express = require("express");
const { verifyAuth } = require("../firebase");
const router = express.Router();

// Mock AI setup (User needs to install @google/genai or similar SDK)
let genAI;
let model;
try {
  const { GoogleGenAI } = require("@google/genai");
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    model = genAI.models.get({ model: "gemini-2.5-pro" });
  }
} catch (e) {
  console.warn("Google Gen AI SDK not installed or missing API key. AI routes will operate in mock mode.");
}

// 1. AI Symptom Checker
router.post("/symptom-checker", verifyAuth, async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "Please provide symptoms to analyze" });
    }

    if (!model) {
      // Mock Response for UI Testing
      return res.json({
        analysis: "Based on the provided symptoms, this could be indicative of a mild viral infection. Please ensure you stay hydrated and rest.",
        recommended_tests: ["Complete Blood Count (CBC)", "CRP Test"],
        disclaimer: "This is a mock AI analysis and not a substitute for professional medical advice.",
      });
    }

    const prompt = `Act as an expert medical diagnostic AI. The user has reported the following symptoms: ${symptoms}. 
    Provide a brief, non-alarmist analysis of possible causes and recommend 1-3 relevant diagnostic blood/urine tests they should book. 
    Always include a strong medical disclaimer. Format as JSON: { analysis: string, recommended_tests: string[], disclaimer: string }`;

    const result = await model.generateContent({ contents: prompt });
    // In a real scenario, parse the JSON response from result.text
    res.json({ analysis: result.text });
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    res.status(500).json({ error: "Failed to analyze symptoms" });
  }
});

// 2. AI Report Summarizer
router.post("/summarize-report", verifyAuth, async (req, res) => {
  try {
    const { reportText } = req.body;

    if (!reportText) {
      return res.status(400).json({ error: "Report text is required" });
    }

    if (!model) {
      // Mock Response for UI Testing
      return res.json({
        summary: "Your report indicates that most vitals are within normal range. However, your Vitamin D levels are slightly low.",
        key_metrics: [
          { name: "Hemoglobin", status: "Normal", value: "14.2 g/dL" },
          { name: "Vitamin D", status: "Low", value: "18 ng/mL" }
        ],
        actionable_advice: "Consider spending more time in the sun or taking a Vitamin D supplement as per your doctor's advice."
      });
    }

    const prompt = `Act as a helpful medical assistant. Summarize the following lab report text for a patient in simple, easy-to-understand language. 
    Highlight key metrics that are out of range. 
    Report Text: ${reportText}`;

    const result = await model.generateContent({ contents: prompt });
    res.json({ summary: result.text });
  } catch (error) {
    console.error("Error summarizing report:", error);
    res.status(500).json({ error: "Failed to summarize report" });
  }
});

module.exports = router;
