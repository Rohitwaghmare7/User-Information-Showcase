const express = require("express");
const cors = require("cors");
const infoRouter = require("./routes/info");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", infoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Express API");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
