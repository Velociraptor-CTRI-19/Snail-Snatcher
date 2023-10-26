const db = require('../models/Models');

const controller = {};

controller.addItems = (req, res, next) => {
  const { item, description, price } = req.body;
  const values = [item, description, price];
  const text = 'INSERT INTO sellers (item, description, price) VALUES ($1, $2, $3);';

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
      // console.log('.then ~ response:', response);
      if (response.rowCount === 0) {
        res.locals.deleted = false;
        res.locals.message = `unable to purchase ${item}`;
      }
      // write logic so that different responses are given depending on whether something was deleted or not
      else {
        res.locals.deleted = true;
        res.locals.message = `${item} was purchased`;
      }

      next();
    })
    .catch((err) => next({
      log: 'An error occurred.',
      status: 500,
      message: {err}
    }));
}

module.exports = controller;