import { useContext } from "react";
import IncomeExpenseChart from "./IncomeExpenseChart";
import { FinanceContext } from "../context/FinanceContext";

export default function Dashboard() {
    
  const { totals } = useContext(FinanceContext);
  console.log(totals);
  return (
    <>
      <div className="md:w-[80%] overflow-scroll p-5  border-green-600 md:h-screen h-screen hide-horizontal-scrollbar">
        <div className="flex md:flex-row gap-3 flex-col justify-evenly mt-4">
          {/* <div className="border w-[25%] h-44 rounded-3xl bg-blue-500 text-white"> */}
          <div className="md:w-[25%] flex flex-col rounded-3xl overflow-hidden shadow-lg p-3 bg-gradient-to-r from-teal-400  to-violet-300 text-white font-semibold space-y-14">
            <div>
              <span className="text-lg">current month income</span>
              <br />
              <span className="text-3xl">${totals.currentMonthIncome}</span>
            </div>
            <div className="flex justify-between text-lg ">
              <span>1234 XXXX XXXX</span>
              <span> 09/34</span>
            </div>
          </div>
          <div className="md:w-[25%] rounded-3xl overflow-hidden shadow-lg p-3 bg-gradient-to-r from-pink-400  to-yellow-300 text-white font-semibold space-y-14">
            <div>
              <span className="text-lg">current month expense</span>
              <br />
              <span className="text-3xl">${totals.currentMonthExpenses}</span>
            </div>
            <div className="flex justify-between text-lg ">
              <span className="text-lg ">1234 XXXX XXXX</span>
              <span> 09/34</span>
            </div>
          </div>
          {/* <div className="w-[25%] rounded-3xl overflow-hidden shadow-lg p-3 bg-gradient-to-r from-fuchsia-300  to-slate-500 text-white font-semibold space-y-14">
            <div>
              <span className="text-lg">current month income</span>
              <br />
              <span className="text-3xl">${totals.currentMonthNetBalance}</span>
            </div>
            <div className="flex justify-between text-lg ">
              <span className="text-lg ">1234 XXXX XXXX</span>
              <span> 09/34</span>
            </div>
          </div> */}
        </div>
        

        <div className="md:h-[70%] h-[55%]  flex mt-4 bg-stone-100 rounded-lg ">
          {/* <div className="w-full border border-violet-700"><IncomeExpenseChart/></div> */}
          <IncomeExpenseChart />
          {/* <div className="border w-1/3 ">recent</div> */}
        </div>
      </div>
    </>
  );
}



















// // frontend/src/components/IncomeExpenseChart.js
// import React, { useState, useEffect } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement, // For Pie charts
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement, // Register ArcElement for Pie charts
//   Title,
//   Tooltip,
//   Legend
// );

// const IncomeExpenseChart = () => {
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [view, setView] = useState("monthly"); // 'monthly' or 'daily'
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const [showCategoryChart, setShowCategoryChart] = useState(false); // Toggle for category chart

//   // Fetch incomes and expenses from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch incomes
//         // const incomeResponse = await fetch('/api/incomes', {
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //     // Include authorization headers if needed
//         //     // 'Authorization': `Bearer ${token}`,
//         //   },
//         // });

//         const incomeResponse = await axios.get("/api/users/incomes");

//         if (!incomeResponse) {
//           throw new Error("Failed to fetch incomes");
//         }

//         const incomeData = incomeResponse.data;
//         console.log(incomeData);

//         // Fetch expenses
//         // const expenseResponse = await fetch('/api/expenses', {
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //     // 'Authorization': `Bearer ${token}`,
//         //   },
//         // });

//         const expenseResponse = await axios.get("/api/users/expenses");

//         if (!expenseResponse) {
//           throw new Error("Failed to fetch expenses");
//         }

//         const expenseData = expenseResponse.data;

//         // Convert date strings to Date objects
//         const formattedIncomes = incomeData.map((income) => ({
//           ...income,
//           date: new Date(income.date),
//         }));

//         const formattedExpenses = expenseData.map((expense) => ({
//           ...expense,
//           date: new Date(expense.date),
//         }));

//         setIncomes(formattedIncomes);
//         setExpenses(formattedExpenses);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Monthly Chart Data
//   const monthlyData = () => {
//     const monthlyIncome = Array(12).fill(0);
//     const monthlyExpense = Array(12).fill(0);

//     incomes.forEach((income) => {
//       const month = income.date.getMonth();
//       monthlyIncome[month] += income.amount;
//     });

//     expenses.forEach((expense) => {
//       const month = expense.date.getMonth();
//       monthlyExpense[month] += expense.amount;
//     });

//     return {
//       labels: Array.from({ length: 12 }, (_, i) =>
//         new Date(0, i).toLocaleString("default", { month: "long" })
//       ),
//       datasets: [
//         {
//           label: "Income",
//           data: monthlyIncome,
//           backgroundColor: 'rgba(255, 81, 225, 0.9)',
//           borderRadius:'50',
//           borderSkipped: false,
//         },
//         {
//           label: "Expense",
//           data: monthlyExpense,
//           backgroundColor: 'rgba(99, 153, 255, 0.74)',
//           borderRadius: 5,  
//           borderSkipped: false,
//         },
//       ],
//     };
//   };

//   // Daily Chart Data for selected month
//   const dailyData = () => {
//     const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//     const dailyIncome = Array(daysInMonth).fill(0);
//     const dailyExpense = Array(daysInMonth).fill(0);

//     incomes.forEach((income) => {
//       const month = income.date.getMonth();
//       const year = income.date.getFullYear();
//       if (month === selectedMonth && year === selectedYear) {
//         const day = income.date.getDate();
//         dailyIncome[day - 1] += income.amount;
//       }
//     });

//     expenses.forEach((expense) => {
//       const month = expense.date.getMonth();
//       const year = expense.date.getFullYear();
//       if (month === selectedMonth && year === selectedYear) {
//         const day = expense.date.getDate();
//         dailyExpense[day - 1] += expense.amount;
//       }
//     });

//     return {
//       labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
//       datasets: [
//         {
//           label: "Income",
//           data: dailyIncome,
//           backgroundColor: 'rgba(255, 81, 225, 0.9)',
//           borderRadius:'50',
//           borderSkipped: false,
//         },
//         {
//           label: "Expense",
//           data: dailyExpense,
//           backgroundColor: 'rgba(99, 153, 255, 0.74)',
//           borderRadius: 5,  
//           borderSkipped: false,
          
//         },
//       ],
//     };
//   };

//   // Expense by Category Data
//   const categoryData = () => {
//     const categoryMap = {};
//     expenses.forEach((expense) => {
//       const category = expense.category;
//       if (categoryMap[category]) {
//         categoryMap[category] += expense.amount;
//       } else {
//         categoryMap[category] = expense.amount;
//       }
//     });

//     const categories = Object.keys(categoryMap);
//     const totals = Object.values(categoryMap);

//     const backgroundColors = [
//       'rgba(255, 99, 132, 0.6)',
//       'rgba(54, 162, 235, 0.6)',
//       'rgba(255, 206, 86, 0.6)',
//       'rgba(75, 192, 192, 0.6)',
//       'rgba(153, 102, 255, 0.6)',
//       'rgba(255, 159, 64, 0.6)',
//       // Add more colors if needed
//     ];

//     return {
//       labels: categories,
//       datasets: [
//         {
//           label: 'Expenses by Category',
//           data: totals,
//           backgroundColor: backgroundColors.slice(0, categories.length),
//         },
//       ],
//     };
//   };

//   const toggleView = () => {
//     setView((prev) => (prev === "monthly" ? "daily" : "monthly"));
//   };

//   const toggleCategoryChart = () => {
//     setShowCategoryChart((prev) => !prev);
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         color:"white",
//         font:{
//           size:24,
//         },
//         text:
//           view === "monthly"
//             ? "Monthly Income and Expense Tracker"
//             : "Daily Income and Expense Tracker",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Amount (in $)",
//           color:"white",
//           font:{
//             size:20,
//           },
//         },
//         ticks:{
//           color:"white",
//           font:"bold"
  
//         },
//         grid: {
//           color: 'rgba(139, 137, 137, 0.48)', // Change the color of x-axis grid lines here
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: view === "monthly" ? "Months" : "Days",
//           color:"white",
//           font:{
//             size:20,
//           },
//         },
//         ticks:{
//           color:"white",
//           font:"bold"

//         },
//         grid: {
//           color: 'rgba(255, 99, 132, 0.2)', // Change the color of x-axis grid lines here
//         },
//       },
//     },
//   };

//   if (loading) {
//     return <div>Loading chart data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div
//       style={{
//         // border:'2px solid red',
//         // height:'70%',
//         width: "100%",
//         // maxWidth: "950px",
        
//         // backgroundColor: "#f0f0f0",
//         // backgroundColor:"gray",
//         color:'white',
//         padding: "20px",
//         borderRadius: "8px",
//         margin: "0 auto",
//       }}
//     >
//       {/* <h2>Income and Expense Tracker</h2> */}

//       {/* Month and Year Selection for Daily View */}
//       <div className="flex">
        
//       {/* Toggle View Buttons */}
//       <button
//         onClick={toggleView}
//         style={{
//           padding: "10px 20px",
//           marginRight: "10px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Switch to {view === "monthly" ? "Daily" : "Monthly"} View
//       </button>

//       <button
//         onClick={toggleCategoryChart}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: showCategoryChart ? "#dc3545" : "#28a745",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         {showCategoryChart ? "Hide" : "Show"} Expenses by Category
//       </button> 

//       {view === "daily" && (
//         <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
//           <label style={{ marginRight: "10px" }}>Select Month: </label>
//           <select
//             onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//             value={selectedMonth}
//             style={{ marginRight: "20px", backgroundColor:"gray", borderRadius:"5px", padding:"3px" }}
//           >
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i} value={i}>
//                 {new Date(0, i).toLocaleString("default", { month: "long" })}
//               </option>
//             ))}
//           </select>
//           <label style={{ marginRight: "10px" }}>Select Year: </label>
//           <select
//             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//             value={selectedYear}
//             style={{ marginRight: "20px", backgroundColor:"gray", borderRadius:"5px", padding:"3px" }}
//           >
//             {Array.from({ length: 5 }, (_, i) => (
//               <option key={i} value={new Date().getFullYear() - i}>
//                 {new Date().getFullYear() - i}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}


     
//       </div>
//       {/* Bar Chart for Income and Expenses */}
//       <div style={{ marginTop: "20px", width: "99%", height:"89%", display:'flex', justifyContent:'center' }}>
//         <Bar
//           style={{ width: "80%" }}
//           data={view === "monthly" ? monthlyData() : dailyData()}
//           options={options}
//         />
//       </div>

//       {/* Pie Chart for Expenses by Category */}
//       {showCategoryChart && (
//         <div style={{ marginTop: '60px' }}>
//           <h3>Expenses by Category</h3>
//           <Pie
//             data={categoryData()}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'right',
//                 },
//                 title: {
//                   display: true,
//                   text: 'Expenses Distribution by Category',
//                 },
//               },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default IncomeExpenseChart;

