import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import "./main.css";
import axios from "axios";

  axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <CssBaseline />
       <div className="absolute  text-white top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

      <App />
       </div>
    </BrowserRouter>
  </>
);
