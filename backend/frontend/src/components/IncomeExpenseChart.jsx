// frontend/src/components/IncomeExpenseChart.js
import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2"; // Use Line instead of Bar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler for Area Chart Effect
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler, // Register Filler for area charts
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(expenses);

  const [view, setView] = useState("monthly"); // 'monthly' or 'daily'
  const [viewCategory, setViewCategory] = useState("OverAll"); // 'monthly' or 'daily'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [showCategoryChart, setShowCategoryChart] = useState(false); // Toggle for category chart

  // Fetch incomes and expenses from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get("/api/users/incomes");

        if (!incomeResponse) {
          throw new Error("Failed to fetch incomes");
        }

        const incomeData = incomeResponse.data;
        console.log(incomeData);

        const expenseResponse = await axios.get("/api/users/expenses");

        if (!expenseResponse) {
          throw new Error("Failed to fetch expenses");
        }

        const expenseData = expenseResponse.data;

        const formattedIncomes = incomeData.map((income) => ({
          ...income,
          date: new Date(income.date),
        }));

        const formattedExpenses = expenseData.map((expense) => ({
          ...expense,
          date: new Date(expense.date),
        }));

        setIncomes(formattedIncomes);
        setExpenses(formattedExpenses);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Monthly Chart Data
  const monthlyData = () => {
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpense = Array(12).fill(0);

    incomes.forEach((income) => {
      const month = income.date.getMonth();
      monthlyIncome[month] += income.amount;
    });

    expenses.forEach((expense) => {
      const month = expense.date.getMonth();
      monthlyExpense[month] += expense.amount;
    });

    return {
      labels: Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("default", { month: "short" })
      ),
      datasets: [
        {
          label: "Income",
          data: monthlyIncome,
          backgroundColor: "rgba(255, 1, 225, 0.2)", // Change for area effect
          borderColor: "rgba(255, 81, 225, 1)",
          fill: true, // This enables the area chart effect
          tension: 0.4, // Smoothing the lines
        },
        {
          label: "Expense",
          data: monthlyExpense,
          backgroundColor: "rgba(99, 173, 25, 0.3)", // Change for area effect
          // borderColor: "rgba(99, 173, 25, 0.3)",
          borderColor: "rgba(29, 153, 255, .4)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Daily Chart Data for selected month
  const dailyData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const dailyIncome = Array(daysInMonth).fill(0);
    const dailyExpense = Array(daysInMonth).fill(0);

    incomes.forEach((income) => {
      const month = income.date.getMonth();
      const year = income.date.getFullYear();
      if (month === selectedMonth && year === selectedYear) {
        const day = income.date.getDate();
        dailyIncome[day - 1] += income.amount;
      }
    });

    expenses.forEach((expense) => {
      const month = expense.date.getMonth();
      const year = expense.date.getFullYear();
      if (month === selectedMonth && year === selectedYear) {
        const day = expense.date.getDate();
        dailyExpense[day - 1] += expense.amount;
      }
    });

    return {
      labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      datasets: [
        {
          label: "Income",
          data: dailyIncome,
          backgroundColor: "rgba(255, 81, 225, 0.6)",
          borderColor: "rgba(15, 81, 225, 1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Expense",
          data: dailyExpense,
          backgroundColor: "rgba(99, 153, 255, 0.4)",
          borderColor: "rgba(99, 153, 255, 1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Expense by Category Data
  const categoryData = () => {
    const categoryMap = {};
    expenses.forEach((expense) => {
      console.log(expense);
      const category = expense.category;
      if (categoryMap[category]) {
        categoryMap[category] += expense.amount;
      } else {
        categoryMap[category] = expense.amount;
      }
    });

    const categories = Object.keys(categoryMap);
    const totals = Object.values(categoryMap);

    const backgroundColors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      // Add more colors if needed
    ];

    return {
      labels: categories,
      datasets: [
        {
          label: "Expenses by Category",
          data: totals,
          backgroundColor: backgroundColors.slice(0, categories.length),
        },
      ],
    };
  };

  // Expense of selected month
  const categoryDataMonthly = () => {
    const categoryMap = {};

    expenses
      .filter((expense) => {
        // Extract the month and year from the expense date
        const expenseDate = new Date(expense.date); // Ensure `expense.date` is in a valid date format
        const expenseMonth = expenseDate.getMonth();
        const expenseYear = expenseDate.getFullYear();

        // Filter by selected month and year
        return expenseMonth === selectedMonth && expenseYear === selectedYear;
      })
      .forEach((expense) => {
        const category = expense.category;

        // Aggregate amounts by category
        if (categoryMap[category]) {
          categoryMap[category] += expense.amount;
        } else {
          categoryMap[category] = expense.amount;
        }
      });

    // Transform categoryMap into the format expected by the chart
    return {
      labels: Object.keys(categoryMap),
      datasets: [
        {
          label: "Expenses",
          data: Object.values(categoryMap),
          backgroundColor: [
            "#FF6384", // You can add more colors
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  const toggleView = () => {
    setView((prev) => (prev === "monthly" ? "daily" : "monthly"));
  };

  const toggleViewCategory = () => {
    setViewCategory((prev) => (prev === "OverAll" ? "Monthly" : "OverAll"));
  };

  const toggleCategoryChart = () => {
    // if(showCategoryChart){
    //   setShowCategoryChart(false)
    // }else{
    //   setShowCategoryChart(true)
    // }
    setShowCategoryChart((prev) => !prev);
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          view === "monthly"
            ? "Monthly Income and Expense Tracker"
            : "Daily Income and Expense Tracker",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (in $)",
        },
      },
      x: {
        title: {
          display: true,
          text: view === "monthly" ? "Months" : "Days",
        },
      },
    },
  };

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {!showCategoryChart && (
        <div
          className=" h-full"
          style={{
            width: "100%",
            height: "100%",
            padding: "20px",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        >
          {/* Toggle View Buttons */}
          <div className="flex">
            <button
              className="border-2 w-1/2 rounded-lg bg-cyan-300 hover:bg-cyan-200 duration-200 text-black font-bold"
              onClick={toggleView}
              style={{ padding: "10px 20px", marginRight: "10px" }}
            >
              Switch to {view === "monthly" ? "Daily" : "Monthly"} View
            </button>

            <button
              className="border-2 w-1/2 rounded-lg bg-cyan-300 text-black hover:bg-cyan-200  font-bold"
              onClick={toggleCategoryChart}
              style={{ padding: "10px 20px" }}
            >
              {showCategoryChart ? "Hide" : "Show"} Expenses by Category
            </button>
          </div>
          {view === "daily" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label style={{ marginRight: "10px" }}>Select Month: </label>
              <select
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                value={selectedMonth}
                style={{
                  marginRight: "20px",
                  backgroundColor: "gray",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <label style={{ marginRight: "10px" }}>Select Year: </label>
              <select
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                value={selectedYear}
                style={{
                  marginRight: "20px",
                  backgroundColor: "gray",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Area Chart for Income and Expenses */}
          <div className="h-96" style={{ marginTop: "20px" }}>
            <Line
              // height={600}

              data={view === "monthly" ? monthlyData() : dailyData()}
              options={options}
            />
          </div>
        </div>
      )}

      {/* category view */}
      {showCategoryChart && (
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        >
          {/* Toggle View Buttons */}
          <div className="flex">
            <button
              className="border-2 w-1/2 rounded-lg bg-cyan-300 text-black hover:bg-cyan-200  font-bold"
              onClick={toggleViewCategory}
              style={{ padding: "10px 20px", marginRight: "10px" }}
            >
              Switch to {viewCategory === "OverAll" ? "Monthly" : "OverAll"}{" "}
              View
            </button>

            <button
              className="border-2 w-1/2 rounded-lg bg-cyan-300 text-black hover:bg-cyan-200 font-bold"
              onClick={toggleCategoryChart}
              style={{ padding: "10px 20px" }}
            >
              {showCategoryChart ? "Hide" : "Show"} Expenses by Category
            </button>
          </div>
          {viewCategory === "Monthly" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label style={{ marginRight: "10px" }}>Select Month: </label>
              <select
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                value={selectedMonth}
                style={{
                  marginRight: "20px",
                  backgroundColor: "gray",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <label style={{ marginRight: "10px" }}>Select Year: </label>
              <select
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                value={selectedYear}
                style={{
                  marginRight: "20px",
                  backgroundColor: "gray",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className=" flex justify-center  h-[90%]">
            <div
              className=" h-72 md:h-96 mt-5 w-96 "
              // style={{ marginTop: "60px", width: "500px", height: "500px" }}
            >
              {/* <h3>Expenses by Category</h3> */}
              {console.log("Showing items by category")}
              <Pie
                data={
                  viewCategory === "OverAll"
                    ? categoryData()
                    : categoryDataMonthly()
                }
                options={{
                  maintainAspectRatio: false,
                  // responsive: true,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                    title: {
                      display: true,
                      text: "Expenses Distribution by Category",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeExpenseChart;
