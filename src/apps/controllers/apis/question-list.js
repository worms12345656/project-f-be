const { QuestionModel } = require("../../models/question");
const QuestionListModel = require("../../models/question-list");

exports.index = async (req, res) => {
  try {
    const data = await QuestionListModel.find({});
    if (data.length === 0) {
      return res.status(404).json(ERR.NOT_FOUND);
    }

    const questionList = [
      ...data.map((data) => ({
        id: data.id,
        name: data.name,
        level: data.level,
        choosen: data.choosen,
        questionNumber: data.questionNumber,
      })),
    ];

    return res.status(200).json({
      data: questionList,
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.interview = async (req, res) => {
  try {
    const data = await QuestionListModel.findOne({
      choosen: true,
    });
    if (data.length === 0) {
      return res.status(404).json(ERR.NOT_FOUND);
    }

    const questionList = await QuestionModel.find({
      _id: {
        $in: data.questionListId,
      },
    });

    return res.status(200).json({
      data: {
        id: data.id,
        name: data.name,
        questionList: questionList.map((item) => ({
          id: item.id,
          name: item.name,
          level: item.level,
          hint: item.hint,
          category: item.category,
        })),
      },
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};
