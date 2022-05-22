const express = require("express");
const { loginWithEmailPassword } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", loginWithEmailPassword);

module.exports = router;
