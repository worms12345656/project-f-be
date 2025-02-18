const QuestionModel = require("./question");

const mongoose = require("../../common/database")();

const questionListSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  questionNumber: {
    type: Number,
    require: true,
  },
  choosen: {
    type: Boolean,
    require: true,
  },
  questionListId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      require: true,
    },
  ],
});

const QuestionListModel = mongoose.model(
  "QuestionList",
  questionListSchema,
  "question_lists"
);
module.exports = QuestionListModel;
