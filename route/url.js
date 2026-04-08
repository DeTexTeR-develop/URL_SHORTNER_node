const express = require('express');
const router = express.Router();
const {createUniqueShortId , getURl, getAnalytics} = require('../controller/url')
router.post("/", createUniqueShortId);
router.get("/:id", getURl);
router.get("/analytics/:id", getAnalytics);

module.exports = router;