const mongoose = require("../../common/database")();
const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  hint: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
});
const QuestionModel = mongoose.model("Question", questionSchema, "questions");
module.exports = {
  QuestionModel,
  questionSchema,
};
