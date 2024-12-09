const QuestionModel = require("./question");

const mongoose = require("../../common/database")();
const categoryListSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
  },
  questionList: {
    type: [
      {
        questionId: {
          type: mongoose.Types.ObjectId,
          ref: "Question",
          require: true,
        },
        questionName: {
          type: String,
          required: true,
        },
        hint: {
          type: String,
          required: true,
        },
      },
    ],
    require: true,
  },
});

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
  list: {
    type: [categoryListSchema],
  },
});

const QuestionListModel = mongoose.model(
  "QuestionList",
  questionListSchema,
  "question_lists"
);
module.exports = QuestionListModel;
