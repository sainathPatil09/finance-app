import { useContext, useState } from "react";
import RecentTransaction from "./RecentTransaction";
import axios from "axios";
import { FinanceContext } from "../context/FinanceContext";

export default function Income() {

  const{totals, userIncomes, refreshTotals } = useContext(FinanceContext);
  console.log(totals)
  console.log(userIncomes)

  const[source, setSource] = useState("");
  const[amount, setAmount] = useState(0);
  const[date, setdate] = useState("");
  const[note, setNote] = useState("")

  const handleTransaction=async (e)=>{
    e.preventDefault()
    console.log(source, amount, date, note)
    try {
      const {data} =await axios.post('/api/users/income', {
        source, amount, date, note
      });
      console.log(data);
      refreshTotals()
      setSource("")
      setAmount(0)
      setdate("")
      setNote("")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className=" flex h-fit md:w-[80%] flex-col md:flex-row">
       

        <div className=" md:w-[55%] p-5 ">
          <div className="h-40 md:w-3/4 mx-auto mt-5 rounded-xl hover:scale-105  duration-300 justify-center flex items-center shadow-xl hover:shadow-slate-800 border-[1px] border-gray-600 ">
            <h1 className="text-center text-4xl font-semibold text-white ">
              {" "}
              <span className="text-2xl">Total Bal</span> ${totals.currentMonthIncome}
            </h1>
          </div>

          <div className="md:w-3/4 mx-auto mt-16 h-[65%] p-2 rounded-xl shadow-2xl hover:shadow-slate-800 hover:scale-105 duration-300 border-[1px] border-gray-600">
            <h2 className="text-center text-3xl text-white font-semibold mt-5">
              Transaction details
            </h2>
            <form onSubmit={handleTransaction} className="space-y-5 mt-8 text-slate-400" action="">
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  placeholder="source"
                  value={source}
                  onChange={(e)=>setSource(e.target.value)}

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
                  placeholder="Enter date"
                  value={date}
                  onChange={(e)=>setdate(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <textarea
                  className="bg-transparent border p-2 rounded-lg w-1/2"
                  name=""
                  id=""
                  placeholder="Enter note"
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                ></textarea>
              </div>

              <div className="flex items-center justify-center">
                <button type="submit" className="border border-green-400  duration-300 hover:bg-green-400 hover:text-black rounded-lg px-3 py-2 font-bold shadow-green-300 shadow-lg hover:shadow">
                  ADD +
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="md:h-[776px] h-[600px] overflow-scroll rounded-lg shadow-xl md:w-[45%] p-3 space-y-5 hide-horizontal-scrollbar">
          <h2 className="text-center text-3xl font-semibold text-slate-400 ">
            Recent Transaction
          </h2>

          {
            userIncomes.map((income)=>{
              console.log(income)
              return  <RecentTransaction key={income._id} amount={income.amount} date={income.date} note={income.note} id={income._id}/>

          })
          }
          {/* <RecentTransaction />
          <RecentTransaction />
          <RecentTransaction />
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
