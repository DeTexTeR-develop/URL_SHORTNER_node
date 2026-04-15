const express = require('express');
const router = express.Router();
const {createUniqueShortId , getURl, getAnalytics} = require('../controller/url');

const {authMiddleware} = require('../middleware/auth');
router.post("/", authMiddleware, createUniqueShortId);
router.get("/:id", authMiddleware, getURl);
router.get("/analytics/:id", authMiddleware, getAnalytics);

module.exports = router;