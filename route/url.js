const express = require('express');
const router = express.Router();
const {createUniqueShortId , getURl} = require('../controller/url')
router.post("/", createUniqueShortId);
router.get("/:id", getURl);

module.exports = router;