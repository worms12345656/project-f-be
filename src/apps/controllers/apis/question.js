const { Long } = require("mongodb");
const { ERR } = require("../../lib/error");
const handleException = require("../../lib/exception");
const { QuestionModel } = require("../../models/question");

exports.index = async (req, res) => {
  try {
    const data = await QuestionModel.find();
    if (data.length === 0) {
      return res.status(404).json(ERR.NOT_FOUND);
    }
    return res.status(200).json({
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
      data,
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const input = {
      name: req.body.name,
      category: req.body.category,
      level: req.body.level,
      hint: req.body.hint,
    };
    const data = await QuestionModel.updateOne(
      {
        _id: id,
      },
      {
        $set: input,
      }
    );
    if (!data) {
      return res.status(400).json({
        message: "Question Id don't exist!",
      });
    }
    return res.status(201).json({
      data,
      status: 201,
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const newQuestion = new QuestionModel({
      category: req.body.category,
      hint: req.body.hint,
      level: req.body.level,
      name: req.body.name,
    });
    const data = await newQuestion.save();
    return res.status(201).json({
      data,
      status: 201,
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.copy = async (req, res) => {
  const id = req.params.id;
  try {
    const input = await QuestionModel.findById(id);
    if (!input) {
      return res.status(400).json({
        message: "Question Id don't exist!",
      });
    }
    const newQuestion = new QuestionModel({
      category: input.category,
      hint: input.hint,
      level: input.level,
      name: input.name,
    });
    const data = await newQuestion.save();
    return res.status(201).json({
      status: "201",
      data,
    });
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await QuestionModel.deleteOne({
      _id: id,
    });
    if (!data.deletedCount) {
      return res.status(400).json({
        message: "Question Id don't exist!",
      });
    }
    res.status(204).send();
  } catch (e) {
    return res.status("500").json({
      message: e,
    });
  }
};
