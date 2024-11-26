import Dashboard from "../components/Dashboard.jsx";
import Expense from "../components/Expense.jsx";
import Hero from "../components/Hero.jsx";
import Income from "../components/Income.jsx";
import SideBar from "./SideBar.jsx";
import { useState } from "react";

export default function Home() {
  const [component, setComponent] = useState("Hero")
  return (
    <>
      <div className="md:flex">
        <SideBar component={component} setComponent={setComponent} />

          {
            component === "Income" ? (<Income/>) :
             component === "Expense" ? (<Expense/>) :
              component === "Dashboard" ? (<Dashboard/>) :
                <Hero/>
          }
        {/* <Income /> */}
        {/* <Expense/> */}
        {/* <Hero/> */}
      </div>
    </>
  );
}
