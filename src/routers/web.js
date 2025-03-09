const express = require("express");
const router = express.Router();
const QuestionController = require("../apps/controllers/apis/question");
const AuthController = require("../apps/controllers/apis/auth");
const ResultController = require("../apps/controllers/apis/result");
const QuestionListController = require("../apps/controllers/apis/question-list");

router.get("/questions", QuestionController.index);
router.get("/questions/:id", QuestionController.show);
router.post("/questions/add", QuestionController.add);
router.post("/questions/:id/update", QuestionController.update);
router.post("/questions/:id/delete", QuestionController.remove);
router.post("/questions/:id/copy", QuestionController.copy);
router.get("/questions-list", QuestionListController.index);
router.get("/questions-list/unchosen", QuestionListController.unchosen);
router.post("/questions-list/onchoose", QuestionListController.onchoose);
router.get("/interview", QuestionListController.interview);
router.post("/signin", AuthController.signin);
router.post("/refresh", AuthController.refresh);
router.get("/results", ResultController.index);
router.get("/results/:id", ResultController.get);
router.post("/results/save", ResultController.save);

module.exports = router;
