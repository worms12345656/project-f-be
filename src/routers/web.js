const express = require("express");
const router = express.Router();
const QuestionController = require("../apps/controllers/apis/question");
const AuthController = require("../apps/controllers/apis/auth");
const ResultController = require("../apps/controllers/apis/result");

router.get("/questions", QuestionController.index);
router.get("/questions/:id", QuestionController.show);
router.post("/signin", AuthController.signin);
router.post("/refresh", AuthController.refresh);
router.post("/result/save", ResultController.save);

module.exports = router;
