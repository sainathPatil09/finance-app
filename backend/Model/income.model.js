import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    source: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    note: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const incomeModel = mongoose.model("IncomeM", incomeSchema);
