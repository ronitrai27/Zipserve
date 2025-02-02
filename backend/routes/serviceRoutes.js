// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// GET /api/suggest-professional?service=pipe%20leakage
router.get("/suggestProfessional", serviceController.suggestProfessional);

module.exports = router;
