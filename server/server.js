const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const db = require("./models/Models.js");
const controller = require("./controllers/controllers.js");

//handle parsing request body
app.use(express.json());
// app.use(cors()); // playing with this... https://www.npmjs.com/package/cors

//define routes -- any request that comes in goes straight to the routes
//have the request be sent to a wildcard and forward that to the index.html

// dummy route for testing purposes
// app.get('/', (req, res) => {
//   res.status(200).send();
// });

/*
 ********************************* CHANGES: Serving index.html to / route ************************************
 */
// app.use(express.static(path.join("../build")));
// app.use("/", express.static(path.join(__dirname, "../client/index.html")));

//post request to add items
app.post("/sellers/addItems", controller.addItems, (req, res) => {
  res.status(200).json({ message: "Item added" });
});

//get request to display
app.get("/buyers/display", controller.buyersDisplay, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

//delete request to purchaseItem
app.delete("/buyers/purchaseItem", controller.purchaseItem, (req, res) => {
  res.status(200).json(res.locals.message);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'An error occurred.',
    status: 500,
    message: {err: 'Watch out for those errors.'}
  };

  const newError = {
    ...defaultError,
    err
  };

  // write the error to the server's console
  console.log(newError);

  // send a response back to the client
  res.status(newError.status).json(newError.message.err);
});

const server = app.listen(PORT, () => {
  console.log(`Server up & running on port ${PORT}...`);
  console.log('NODE_ENV: ', process.env.NODE_ENV);
});


module.exports = {
  app,
  server,
};
