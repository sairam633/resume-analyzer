// backend/services/analysisService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function analyzeResume(resumeText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an expert technical recruiter and career coach.
Analyze the following resume text and return ONLY a JSON object.
❌ Do NOT include explanations, comments, or markdown.
❌ Do NOT wrap the response in \`\`\`json or any other formatting.
✅ Only output valid JSON.

If some fields are missing in the resume, use null for strings or [] for arrays.

Resume Text:
"""
${resumeText}
"""

Expected JSON structure:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": ["string"],
  "certifications": ["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // DEBUG: log raw response (you can comment this out later)
  console.log("Gemini raw response:\n", text);

  // Extract JSON block even if Gemini adds extra text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Gemini did not return JSON");
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", text);
    throw new Error("Invalid response from Gemini");
  }
}

module.exports = { analyzeResume };
