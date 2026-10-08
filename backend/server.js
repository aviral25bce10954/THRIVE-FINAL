const express = require("express");
const cors = require("cors");
const pool = require("./db");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const resourceRoutes = require("./resourceRoutes");
const supportRoutes = require("./supportRoutes");
const checkinRoutes = require("./checkinRoutes");

const { initResources } = require("./resourceSchema");
const { initSupport } = require("./supportSchema");
const { initCheckinSessions } = require("./checkinSchemas");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/checkins", checkinRoutes);

initResources();
initSupport();
initCheckinSessions();

app.get("/", (req, res) => {
  res.send("THRIVE backend is running!");
});

app.get("/api/test-db", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed"
    });
  }
});

app.listen(PORT, () => {
  console.log(`THRIVE backend running on port ${PORT}`);
});