const Result = require("../../models/question");
const QuestionResultModel = require("../../models/question_results");
const ResultModel = require("../../models/result");

exports.index = async (req, res) => {
  try {
    console.log("get question");
    const data = await QuestionModel.find();
    if (data.length === 0) {
      return res.status(404).json(ERR.NOT_FOUND);
    }
    return res.status(200).json({
      status: "200",
      data: [
        ...data.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          level: item.level,
        })),
      ],
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.save = async (req, res) => {
  const input = {
    candidateName: req.body.candidateName,
    note: req.body.note,
    isPass: req.body.isPass,
    categories: [...req.body.category],
  };

  try {
    const result = await ResultModel.create({
      candidateName: input.candidateName,
      note: input.note,
      isPass: input.isPass,
    });

    input.categories.forEach((category) => {
      category.forEach(async (item) => {
        console.log(item);
        await QuestionResultModel.create({
          resultId: result.id,
          questionId: item.questionId,
          rating: item.rating,
          summary: item.summary,
        });
      });
    });
    return res.status(200).json("OK");
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
  //   console.log("result", result);
  //   try {
  //     const data = await QuestionModel.findById(id);
  //     if (!data) {
  //       return res.status(400).json({
  //         message: "Question Id don't exist!",
  //       });
  //     }
  //     return res.status(200).json({
  //       status: "200",
  //       data,
  //     });
  //   } catch (e) {
  //     return res.status("500").json({
  //       message: e,
  //     });
  //   }
};
