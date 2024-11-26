import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import ChatWindow from "./ChatWindow";

export default function Hero() {
  const { totals } = useContext(FinanceContext);
  console.log(totals);
  return (
    <>
      <ChatWindow/>
    </>
  );
}
