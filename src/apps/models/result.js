const mongoose = require("../../common/database")();

const questionResultSchema = new mongoose.Schema({
  _id: false,
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

const resultSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    require: true,
  },
  isPass: {
    type: Boolean,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  resultList: {
    type: [questionResultSchema],
    require: true,
  },
});
const ResultModel = mongoose.model("Result", resultSchema, "results");
module.exports = ResultModel;
