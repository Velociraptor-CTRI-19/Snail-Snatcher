// this file contains integration tests for the backend

// import in supertest
// const { it } = require('node:test');
const request = require('supertest');

const db = require('../server/models/Models');

// designate the server
const { app, server } = require('../server/server');
const dotenv = require('dotenv')
dotenv.config()

beforeAll(async () => {
  await db.query('DELETE FROM sellers;');
});

afterAll(() => {
  server.close();
});

describe('Server tests', () => {
  // describe('/', () => {
  //   describe('GET', () => {
  //     it('responds with a 200 status', async () => {
  //       const response = await request(server)
  //         .get('/')
  //       expect(response.status).toBe(200);
  //     });
  //   });
  // });

  describe('/sellers/addItems', () => {
    describe('POST', () => {
      it('responds with a status of 200 and a body of Item added', async () => {
        const response = await request(server)
          .post('/sellers/addItems')
          .send({
            item: 'bread',
            description: 'savory',
            price: '100',
          })
        // console.log('response.body: ',response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Item added'});
      });
      it('adds an item to the database', async () => {
        const response = await request(server)
          .post('/sellers/addItems')
          .send({
            item: 'cheese',
            description: 'delicious',
            price: '100',
          })
        const data = await db.query('SELECT * FROM sellers WHERE item = \'cheese\';')
        expect(data.rows.length).toBe(1);
      });
    });
  });
});

  describe('/buyers/display', () => {
    describe('GET', () => {
      it('responds with a 200 status', async () => {
        const response = await request(server)
          .get('/buyers/display')
        expect(response.status).toBe(200);
      });
      it('has a content-type of application/json', async () => {
        const response = await request(server)
          .get('/buyers/display')
        expect(response.header['content-type']).toContain('application/json');
      });
      it('has a request body of an array', async () => {
        const response = await request(server)
          .get('/buyers/display')
        expect(Array.isArray(response.body)).toBeTruthy();
      });
      it('has the right information on the response body', async () => {
        const response = await request(server)
          .get('/buyers/display')
        // console.log('response.body: ', response.body);
        expect(response.body).toEqual([
          {
            item: 'bread',
            description: 'savory',
            price: 100,
          },
          {
            item: 'cheese',
            description: 'delicious',
            price: 100,
          }
        ])
      })
    });
  });

  describe('/buyers/purchaseItem', () => {
    describe('DELETE', () => {
      // it('responds with a status of 200', async () => {
      //   const response = await request(server)
      //     .delete('/buyers/purchaseItem')
      //   expect(response.status).toBe(200);
      // });
      it('should say an item was purchased if the item exists in the database and it should respond with a status of 200', async () => {
        const response = await request(server)
          .delete('/buyers/purchaseItem')
            .send({
              item: 'cheese',
            })
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: 'cheese was purchased'});
      });
      it('should delete and item from the database', async () => {
        const data = await db.query('SELECT * FROM sellers WHERE item = \'cheese\'');
        expect(data.rows.length).toBe(0);
      });
      it('should say that it was unable to purchase an item if the item does not exist in the database', async () => {
        const response = await request(server)
        .delete('/buyers/purchaseItem')
          .send({
            item: 'diamonds',
          })
        expect(response.status).toBe(200);
        // expect(response.body).toEqual({ message: 'unable to purchase diamonds'});
      })
    });
  });
