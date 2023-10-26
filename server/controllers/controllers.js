const db = require('../models/Models');

const controller = {};

controller.addItems = (req, res, next) => {
  const { item, description, price } = req.body;
  const values = [item, description, price];
  const text = 'INSERT INTO sellers (item, description, price) VALUES ($1, $2, $3);';
    // `INSERT INTO sellers (item, description, price)
    // VALUES ('${item}', '${description}', ${price});`;

  db.query(text, values)
    .then((result) => {
      next();
    })
    .catch((error) => next({
      log: 'An error occurred in controller.addItems',
      status: 500,
      message: {err: error}
    }));
};

controller.buyersDisplay = (req, res, next) => {
  
  const text = 'SELECT description, item, price FROM sellers;';

  db.query(text)
    .then((result) => {
      res.locals.dbInfo = result.rows;
      next();
    })
    .catch((err) => next({
      log: 'An error occurred in controller.buyersDisplay',
      status: 500,
      message: {err}
    }));
};

controller.purchaseItem = (req, res, next) => {
  const { item } = req.body;

  const text = 'DELETE FROM sellers WHERE item = $1;';

  const values = [item];
  db.query(text, values)
    .then((response) => {
      res.locals.message = {message: `${item} was purchased`};
      next();
    })
    .catch((err) => next({
      log: 'An error occurred.',
      status: 500,
      message: {err}
    }));
}

module.exports = controller;