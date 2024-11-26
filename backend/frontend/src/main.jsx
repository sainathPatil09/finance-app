import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import FinanceProvider from "./context/FinanceContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FinanceProvider>
      <AuthProvider>
        <div className="absolute top-0 z-[-2] h-fit w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <App />
        </div>

        {/* <div class="relative h-full w-full bg-slate-950">
          <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
            {" "}
          </div>
          <App />
        </div> */}
        {/* login and signup

<div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

</div> */}
      </AuthProvider>
    </FinanceProvider>
  </BrowserRouter>
);
