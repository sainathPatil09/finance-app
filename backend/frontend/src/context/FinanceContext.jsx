import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FinanceContext = createContext();

const FinanceProvider = ({ children }) => {
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    currentMonthIncome: 0,
    currentMonthExpenses: 0,
    currentMonthNetBalance: 0,
  });

  const[userIncomes, setUserIncomes] = useState([]);
  const[userExpenses, setUserExpenses] = useState([]);

  const fetchTotals = async () => {
    try {
      const response = await axios.get("/api/finance/totals");

      setTotals(response.data);
    } catch (error) {
      console.log("Error fetching totals:", error);
    }
  };


  const fetchUsersIncomes = async ()=>{
      try {
        const response = await axios.get('/api/users/incomes');
        
        console.log(response.data)
        setUserIncomes(response.data);
        
      } catch (error) {
        console.log("Error in fetchUsersIncomes:", error);
      }
  }


  const fetchUsersExpenses = async ()=>{
      try {
        const response = await axios.get('/api/users/expenses');
        
        console.log(response.data)
        setUserExpenses(response.data);

      } catch (error) {
        console.log("Error in fetchUsersIncomes:", error);
      }
  }









  useEffect(() => {
    fetchTotals();
    fetchUsersIncomes();
    fetchUsersExpenses();
  }, []);
  
  const refreshTotals = () => {
    fetchTotals();
    fetchUsersIncomes();
    fetchUsersExpenses();
  };

  return (
    <FinanceContext.Provider value={{ totals, userIncomes, userExpenses, refreshTotals }}>
      {children}
    </FinanceContext.Provider>
  );
};


export default FinanceProvider;
