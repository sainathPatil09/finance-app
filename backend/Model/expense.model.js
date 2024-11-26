import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purpose: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
    enum: ["food", "clothing", "vacations", "groceries", "other"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  note:{
    type:String,
    require:true,
  }
},{timestamps:true});

export const expenseModel = new mongoose.model("ExpenseM", expenseSchema);
