// backend/controllers/resumeController.js
const pdf = require('pdf-parse');
const { analyzeResume } = require('../services/analysisService');
const pool = require('../db');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Step 1: Extract text from PDF
    const data = await pdf(req.file.buffer);

    // Step 2: Send text to Gemini for analysis
    const analysis = await analyzeResume(data.text);

    // Step 3: Save results into DB
    const query = `
      INSERT INTO resumes
      (file_name, name, email, phone, linkedin_url, portfolio_url, summary,
       work_experience, education, technical_skills, soft_skills, projects,
       certifications, resume_rating, improvement_areas, upskill_suggestions)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,
       $8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;
    `;

    const values = [
      req.file.originalname,
      analysis.name,
      analysis.email,
      analysis.phone,
      analysis.linkedin_url,
      analysis.portfolio_url,
      analysis.summary,
      JSON.stringify(analysis.work_experience),
      JSON.stringify(analysis.education),
      JSON.stringify(analysis.technical_skills),
      JSON.stringify(analysis.soft_skills),
      JSON.stringify(analysis.projects),
      JSON.stringify(analysis.certifications),
      analysis.resume_rating,
      analysis.improvement_areas,
      JSON.stringify(analysis.upskill_suggestions)
    ];

    const result = await pool.query(query, values);

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all resumes (basic list)
exports.getAllResumes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, file_name, uploaded_at, name, email, resume_rating FROM resumes ORDER BY uploaded_at DESC"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM resumes WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Resume not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
