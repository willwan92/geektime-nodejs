const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get("/favicon.ico", (req, res) => {
  res.status(200);
});

module.exports = app;
