const QuestionListModel = require("../../models/question-list");

exports.index = async (req, res) => {
  try {
    const data = await QuestionListModel.findById("673b8583856638ffa9de95ba");
    if (data.length === 0) {
      return res.status(404).json(ERR.NOT_FOUND);
    }
    return res.status(200).json({
      data: {
        id: data.id,
        name: data.name,
        list: data.list,
      },
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};
