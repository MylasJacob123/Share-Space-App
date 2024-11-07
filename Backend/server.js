require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();

const dbRoutes = require("./routes/db");
const authRoutes = require("./routes/auth")

app.use(cors());
app.use(express.json());
const PORT = 3001;

app.use("/auth", authRoutes); 
app.use("/api", dbRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
