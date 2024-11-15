const mongoose = require("../../common/database")();
const questionResultSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: "Question",
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  summary: {
    type: String,
    require: true,
  },
});
// const QuestionResultModel = mongoose.model(
//   "QuestionResults",
//   questionResultSchema,
//   "questionResults"
// );
module.exports = {
  // QuestionResultModel,
  questionResultSchema,
};
