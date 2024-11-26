import { incomeModel } from "../Model/income.model.js";
import { expenseModel } from "../Model/expense.model.js";
import mongoose from "mongoose";

export const totalExpenseBalance = async (req, res) => {

  const getStartOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };


  try {
    const userId = req.user.id
    const objectId = new mongoose.Types.ObjectId(userId);

    const totalIncomeAgg = await incomeModel.aggregate([
      { $match: { user: objectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Aggregate total expenses
    const totalExpenseAgg = await expenseModel.aggregate([
      { $match: { user: objectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = totalExpenseAgg[0]?.total || 0;

    // Calculate net balance
    const netBalance = totalIncome - totalExpenses;

    // console.log(netBalance);


    // Get start of the current month
    const startOfMonth = getStartOfCurrentMonth();

    // Aggregate current month income
    const currentMonthIncomeAgg = await incomeModel.aggregate([
      { $match: { 
        user:new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const currentMonthIncome = currentMonthIncomeAgg[0]?.total || 0;

    // Aggregate current month expenses
    const currentMonthExpenseAgg = await expenseModel.aggregate([
      { $match: {
        user:new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const currentMonthExpenses = currentMonthExpenseAgg[0]?.total || 0;

    // Calculate current month net balance
    const currentMonthNetBalance = currentMonthIncome - currentMonthExpenses;


    res.json({
      totalIncome,
      totalExpenses,
      netBalance,
      currentMonthIncome,
      currentMonthExpenses,
      currentMonthNetBalance
    });


  } catch (error) {
    console.error("Error fetching totals:", error);
    res.status(500).json({ error: "Error in totalController " });
  }
};
