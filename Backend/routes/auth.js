const express = require("express");
const router = express.Router();
const { signUp, resetPassword, signIn } = require("../controllers/auth");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/reset-password", resetPassword);

module.exports = router;
