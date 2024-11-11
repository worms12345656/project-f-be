const { ERR } = require("../../lib/error");
const handleException = require("../../lib/exception");
const QuestionModel = require("../../models/question");

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

exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await QuestionModel.findById(id);
    if (!data) {
      return res.status(400).json({
        message: "Question Id don't exist!",
      });
    }
    return res.status(200).json({
      status: "200",
      data,
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};
