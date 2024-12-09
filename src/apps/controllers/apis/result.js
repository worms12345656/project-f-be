const ResultModel = require("../../models/result");

exports.index = async (req, res) => {
  // try {
  console.log("get question");
  const data = await ResultModel.find();
  if (data.length === 0) {
    return res.status(404).json(ERR.NOT_FOUND);
  }
  return res.status(200).json({
    status: "200",
    data: [
      ...data.map((item) => ({
        id: item.id,
        candidateName: item.candidateName,
        point:
          item.resultList.reduce((total, item) => (item.rating += total), 0) /
          item.resultList.length,
        result: item.isPass ? "pass" : "fail",
      })),
    ],
  });
  // } catch (e) {
  //   return res.status("500").json({
  //     message: e,
  //   });
  // }
};

exports.save = async (req, res) => {
  const input = {
    candidateName: req.body.candidateName,
    note: req.body.note,
    isPass: req.body.isPass,
    categories: [...req.body.category],
  };

  try {
    const resultList = [];

    input.categories.forEach((category) => {
      category.forEach(async (item) => {
        console.log(item);
        resultList.push({
          questionId: item.questionId,
          rating: item.rating,
          summary: item.summary,
        });
      });
    });

    const result = await ResultModel.create({
      candidateName: input.candidateName,
      note: input.note,
      isPass: input.isPass,
      resultList,
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

exports.get = async (req, res) => {
  const input = {
    candidateName: req.body.candidateName,
    note: req.body.note,
    isPass: req.body.isPass,
    categories: [...req.body.category],
  };

  try {
    const resultList = [];

    input.categories.forEach((category) => {
      category.forEach(async (item) => {
        console.log(item);
        resultList.push({
          questionId: item.questionId,
          rating: item.rating,
          summary: item.summary,
        });
      });
    });

    const result = await ResultModel.create({
      candidateName: input.candidateName,
      note: input.note,
      isPass: input.isPass,
      resultList,
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
