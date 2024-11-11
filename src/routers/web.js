const express = require("express");
const router = express.Router();
const QuestionController = require("../apps/controllers/apis/question");
const AuthController = require("../apps/controllers/apis/auth");

router.get("/questions", QuestionController.index);
router.get("/questions/:id", QuestionController.show);
router.post("/signin", AuthController.signin);
router.post("/refresh", AuthController.refresh);

module.exports = router;
