const express = require("express");
const router = express.Router();
const QuestionController = require("../apps/controllers/apis/question");
const AuthController = require("../apps/controllers/apis/auth");
const ResultController = require("../apps/controllers/apis/result");

router.get("/questions", QuestionController.index);
router.get("/questions/:id", QuestionController.show);
router.post("/questions/:id/update", QuestionController.update);
router.post("/questions/:id/delete", QuestionController.remove);
router.post("/questions/:id/copy", QuestionController.copy);
router.post("/signin", AuthController.signin);
router.post("/refresh", AuthController.refresh);
router.get("/results", ResultController.index);
router.post("/results/save", ResultController.save);

module.exports = router;
