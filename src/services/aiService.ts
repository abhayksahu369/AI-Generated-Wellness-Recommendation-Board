// src/services/aiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import type{ WellnessProfile, WellnessTip } from "../context/WellnessContext";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ Missing VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateTips(profile: WellnessProfile): Promise<WellnessTip[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Generate 5 short beginner-friendly wellness tips.

User:
Age: ${profile.age}
Gender: ${profile.gender}
Goal: ${profile.goal.replace("_", " ")}

Format each tip on ONE line:

emoji | title (max 5 words) | 1 sentence summary
`;

  const result = await model.generateContent(prompt);

  const output = result.response.text().trim();

  return output.split("\n").map((line, i) => {
    const parts = line.split("|").map(v => v.trim());
    return {
      id: String(i + 1),
      icon: parts[0] ?? "✨",
      title: parts[1] ?? "Tip",
      summary: parts[2] ?? "",
    };
  });
}

export async function generateTipDetail(
  tip: WellnessTip,
  profile: WellnessProfile
): Promise<{ detail: string; steps: string[] }> {

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Write an explanation and steps for this tip:

${tip.icon} ${tip.title}
Summary: ${tip.summary}

User goal: ${profile.goal.replace("_", " ")}

Return format:

Explanation: (2 sentences)
Steps:
1. step
2. step
3. step
4. step
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const lines = text.split("\n");
  const detail = lines.find(l => l.toLowerCase().startsWith("explanation:"))?.replace("Explanation:", "").trim()
    || lines[0];

  const steps = lines
    .filter(l => /^\d\./.test(l))
    .map(s => s.replace(/^\d+\.\s*/, ""));

  return { detail, steps };
}
