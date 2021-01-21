const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Databse
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Api is runnnin");
});

app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
