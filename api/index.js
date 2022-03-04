const express = require("express");
const cors = require("cors");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: "https://agency-web31.herokuapp.com"
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3001;

require("./routes/tours.routes.js")(app);
require("./routes/categories.routes")(app);
require("./routes/guides.routes")(app);

app.listen(port, () => {
  console.log("running on port 3001");
})

//agency-backend31