require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const projects = [
  {
    id: 1,
    title: "Agri Doctor",
    description: "AI Plant Disease Detection System",
  },
  {
    id: 2,
    title: "Vehicle Information Management System",
    description: "Cab and Service Management Platform",
  },
  {
    id: 3,
    title: "Limited Battery System",
    description: "Rechargeable Battery Solution",
  },
];

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Export for Vercel
module.exports = app;

// Local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
