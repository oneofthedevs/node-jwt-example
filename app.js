// Dependicies
const app = require("express")();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Listening to 3000");
});

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
