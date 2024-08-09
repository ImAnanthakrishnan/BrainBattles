import asyncHandler from "express-async-handler";
import Score from "../../models/scoreModel.js";

export const createScore = asyncHandler(async (req, res) => {
  const { level, score } = req.body;

  if (!level || !score) {
    return res.status(204).json({
      message: "Insufficient data",
    });
  }

  const existingScore = await Score.findOne({
    user: req.userId,
    difficulty: level,
  });
  
  if (existingScore) {
    if (existingScore.score < score) {
      const updatedScore = await Score.updateOne(
        { user: req.userId, difficulty: level },
        { $set: { score: score } }
      );

      if (updatedScore) {
        return res.status(200).json({
          message: "Successful",
        });
      }
    } else {
      return res.status(200).json({
        message: "No update needed, score is not higher",
      });
    }
  } else {
    const newScore = await Score.create({
      user: req.userId,
      score,
      difficulty: level,
    });

    if (newScore) {
      return res.status(200).json({
        message: "Successful",
      });
    }
  }
});

export const getScore = asyncHandler(async (req, res) => {
  const { level } = req.query;

  const scores = await Score.aggregate([
    { $match: { difficulty: level } },
    { $sort: { score: 1 } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userss",
      },
    },
    {
      $project: {
        "userss.name": 1,
        score: 1,
        difficulty: 1,
      },
    },
  ]);

  if (scores) {
    res.status(200).json({
      message: "success",
      data: scores,
    });
  }
});
