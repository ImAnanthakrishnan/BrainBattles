import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: mongoose.Types.ObjectId,
      ref: "answer",
    },
    difficulty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);

export default Quiz;
