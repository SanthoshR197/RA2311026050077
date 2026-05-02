import { useState } from "react";
import Home from "./pages/Home";
import Priority from "./pages/Priority";
import { Button } from "@mui/material";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <div style={{ padding: 10 }}>
        <Button onClick={() => setPage("home")}>Home</Button>
        <Button onClick={() => setPage("priority")}>Priority</Button>
      </div>

      {page === "home" ? <Home /> : <Priority />}
    </div>
  );
}