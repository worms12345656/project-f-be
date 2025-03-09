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

    const unchosen = await QuestionListModel.find({
      choosen: false,
    });

    const questionList = await QuestionModel.find({
      _id: {
        $in: data.questionListId,
      },
    });

    console.log(unchosen);

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
        unchosenList: unchosen.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      },
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.unchosen = async (req, res) => {
  try {
    const data = await QuestionListModel.find({
      choosen: false,
    });
    if (data.length === 0) {
      return res.status(404).json(ERR.NOT_FOUND);
    }

    return res.status(200).json({
      data: data.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.onchoose = async (req, res) => {
  const id = req.body.id;
  try {
    const choosen = await QuestionListModel.find({
      choosen: true,
    });
    await QuestionListModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          choosen: true,
        },
      }
    );
    await QuestionListModel.updateMany(
      {
        _id: choosen[0]._id,
      },
      {
        $set: {
          choosen: false,
        },
      }
    );
    return res.status(204).json();
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};
