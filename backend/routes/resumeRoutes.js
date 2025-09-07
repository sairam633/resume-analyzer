// backend/routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const resumeController = require('../controllers/resumeController');

// Store file in memory (not on disk)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.get('/', resumeController.getAllResumes);
router.get('/:id', resumeController.getResumeById);


module.exports = router;
