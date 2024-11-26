import { useContext, useState } from "react";
import RecentTransaction from "./RecentTransaction";
import axios from "axios";
import { FinanceContext } from "../context/FinanceContext";

export default function Expense() {

  const{totals, userExpenses, refreshTotals } = useContext(FinanceContext);
  console.log(userExpenses)

  const[purpose, setPurpose] = useState("");
  const[amount, setAmount] = useState(0);
  const[date, setdate] = useState("");
  const[category, setCategory] = useState("");
  const[note, setNote] = useState("")

  const handleTransaction=async (e)=>{
    e.preventDefault()
    console.log(purpose, amount, date, category, note)
    try {
      const {data} =await axios.post('/api/users/expense', {
        purpose, amount, category, date, note
      });
      console.log(data);
      setPurpose("")
      setAmount(0)
      setdate("")
      setCategory("")
      setNote("")
      refreshTotals()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className=" flex md:flex-row flex-col md:w-[80%]">
        <div className=" md:w-[55%] p-5 ">
          <div className="h-40 md:w-3/4 mx-auto mt-5 rounded-xl hover:scale-105  duration-300 justify-center flex items-center shadow-xl hover:shadow-slate-800 border-[1px] border-gray-600 ">
            <h1 className="text-center text-4xl font-semibold text-white ">
              {" "}
              <span className="text-2xl">Total Expense</span> ${totals.currentMonthExpenses}
            </h1>
          </div>

          <div className=" md:w-3/4 mx-auto mt-14 h-[67%]  rounded-xl shadow-2xl hover:shadow-slate-800 hover:scale-105 duration-300 border-[1px] border-gray-600">
            <h2 className="text-center text-3xl text-white font-semibold mt-4">
              Transaction details
            </h2>
            <form onSubmit={handleTransaction} className="space-y-5 mt-8 text-slate-400">
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  placeholder="source"
                  value={purpose}
                  onChange={(e)=>setPurpose(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  type="number"
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e)=>setAmount(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  type="date"
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  placeholder="enter date"
                  value={date}
                  onChange={(e)=>setdate(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center">
                <select
                  name="category"
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  required
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  <option value="food">Food</option>
                  <option value="clothing">Clothing</option>
                  <option value="vacations">Vacations</option>
                  <option value="groceries">Groceries</option>
                  <option value="other">Other</option>
                </select>
              </div>  

              <div className="flex items-center justify-center">
                <textarea
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  placeholder="Enter note"
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                ></textarea>
              </div>

              <div className="flex items-center justify-center">
                <button type="submit" className="mb-2 border border-red-400  duration-300 hover:bg-red-400 hover:text-black rounded-lg px-3 py-2 font-bold shadow-red-300 shadow-lg hover:shadow">
                  Spend -
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className=" md:h-[776px] h-[600px] overflow-scroll rounded-lg shadow-xl md:w-[45%] p-3 space-y-5 hide-horizontal-scrollbar">
        <h2 className="text-center text-3xl font-semibold text-slate-400 ">Recent Transaction</h2>

          {
            userExpenses.map((expense)=>{
              return  <RecentTransaction key={expense._id} amount={expense.amount} date={expense.date} note={expense.note} />
              
            })
          }
          {/* <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />*/}
        </div>
      </div>
    </>
  );
}
