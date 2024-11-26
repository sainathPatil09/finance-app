import { expenseModel } from "../Model/expense.model.js";

export const createExpense = async (req, res) => {
  try {
    const { purpose, amount, category, date, note } = req.body;

    if (!purpose || !amount || !category || !date || !note) {
      return res.status(400).json({ message: "Please fill required filed" });
    }

    const newExpense = new expenseModel({
      user: req.user.id,
      purpose,
      amount,
      category,
      date,
      note,
    });

    const saveExpense = await newExpense.save();

    res.status(201).json({
      success: true,
      data: saveExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error in createExpense controller"});
  }
};


export const getUserExpenses= async (req, res)=>{
  try {
    const userId = req.user.id;
    // console.log(userId)

    const expense = await expenseModel.find({user : userId}).sort({ date: 1 });
    // console.log(incomes)
    res.json(expense)
  } catch (error) {
    console.error("Error fetching user expense:", error);
    res.status(500).json({ error: "Error fetching user expense" });
  }

  // console.log("Fetching userIncomes")
}
