import { incomeModel } from "../Model/income.model.js";

export const createIncome = async (req, res) => {
  try {
    const { source, amount, date, note } = req.body;

    if (!source || !amount || !date || !note) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newIncome = new incomeModel({
      user: req.user.id,
      source,
      amount,
      date,
      note,
    });

    const savedIncome = await newIncome.save();
    res.status(201).json({
      success: true,
      data: savedIncome,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Error in createIncome controller"})
  }
};


export const getUserIncomes= async (req, res)=>{
  try {
    const userId = req.user.id;
    // console.log(userId)

    const incomes = await incomeModel.find({user : userId}).sort({ date: 1 });
    // console.log(incomes)
    res.json(incomes)
  } catch (error) {
    console.error("Error fetching user incomes:", error);
    res.status(500).json({ error: "Error fetching user incomes" });
  }

  // console.log("Fetching userIncomes")
}
