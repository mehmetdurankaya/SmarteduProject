const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Index Sayfası");
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
