// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const patent = require("./routes/patent");
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(patent);
try {
  app.use(patent);
} catch (e) {
  console.log(e);
}
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
