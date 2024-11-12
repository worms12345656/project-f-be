const mongoose = require("../../common/database")();
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
});
const ResultModel = mongoose.model("Result", resultSchema, "results");
module.exports = ResultModel;
