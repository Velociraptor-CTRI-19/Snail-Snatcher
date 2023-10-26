const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const db = require("./models/Models.js");

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
app.post("/sellers/addItems", (req, res) => {
  const { item, description, price } = req.body;
  // console.log('req.body', req.body);
  // console.log("got into sellers/addItems");

  const text = `
    INSERT INTO sellers (item, description, price)
    VALUES ('${item}', '${description}', ${price});
    `;

  db.query(text)
    .then((result) => {
      // console.log("Item: ", result);
      res.status(200).json({ message: "Item added" });
    })
    .catch((error) => {
      console.error("Error with adding item in server.js", error);
      res.status(500).json({ error: "Server error" });
    });
});

//get request to display
app.get("/buyers/display", (req, res) => {
  // console.log("entered buyers/display");
  const text = `
    SELECT description, item, price FROM sellers;
    `;

  db.query(text)
    .then((result) => {
      // console.log("Result: ", result);
      // console.log("Result of rows: ", result.rows);
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error when retrieving data from database" });
    });
});

//delete request to purchaseItem
app.delete("/buyers/purchaseItem", (req, res) => {
  console.log("entered buyers/purchaseItem");
  const { item } = req.body;
  // console.log("item: ", item);

  const text = `
        DELETE FROM sellers
        WHERE item = $1;
    `;

  const values = [item];
  db.query(text, values)
    .then((response) => {
      // console.log('.then ~ response:', response);
      res.status(200).json({ message: `${item} was purchased` });
    })
    .catch((err) => {
      res.status(500).json({ message: `unable to purchase ${item}`})
    });
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
