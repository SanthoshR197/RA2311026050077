const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// 🔴 PASTE YOUR ACCESS TOKEN HERE
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcjQxNTdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwODE0MSwiaWF0IjoxNzc3NzA3MjQxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYWY1M2FiNTItZmUxZi00MjQxLTgzNDMtNmM0ZTZiMWIzMTc0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FudGhvc2ggciIsInN1YiI6IjY2M2EzODEwLTRhYzEtNDUyNi1iNDcyLWMwOGFmOWI1ZTg0NiJ9LCJlbWFpbCI6InNyNDE1N0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6InNhbnRob3NoIHIiLCJyb2xsTm8iOiJyYTIzMTEwMjYwNTAwNzciLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI2NjNhMzgxMC00YWMxLTQ1MjYtYjQ3Mi1jMDhhZjliNWU4NDYiLCJjbGllbnRTZWNyZXQiOiJqRU13RWhXc2JOU1B1YUR6In0.uFMzAeKed-PQSAVZviNIPnDz5LceCa_J4KZeWDSVvQ8";


// ✅ Logging function (reusable middleware-style)
const log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    console.log("Log failed:", err.response?.data || err.message);
  }
};


// ✅ Root route (just to check server)
app.get("/", (req, res) => {
  res.send("Backend is running");
});


// ✅ Notifications route with logging integrated
app.get("/notifications", async (req, res) => {
  try {
    await log("backend", "info", "route", "Incoming request for notifications");

    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    await log("backend", "info", "service", "Notifications fetched successfully");

    res.json(response.data);

  } catch (err) {
    await log("backend", "error", "route", "Failed to fetch notifications");

    console.log("ERROR:", err.response?.data || err.message);

    res.status(500).json(err.response?.data || err.message);
  }
});


// ✅ Logs route (optional but useful for testing)
app.post("/logs", async (req, res) => {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.log("LOG ERROR:", err.response?.data || err.message);

    res.status(500).json(err.response?.data || err.message);
  }
});


// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});