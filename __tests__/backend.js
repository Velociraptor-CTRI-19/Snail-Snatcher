// this file contains integration tests for the backend

// import in supertest
// const { it } = require('node:test');
const request = require('supertest');

const db = require("../server/database/Models.js");

// designate the server
const { app, server } = require('../server/server');
const dotenv = require('dotenv')
dotenv.config()

beforeAll(() => {
  db.query('DELETE FROM sellers');
});

afterAll(() => {
  server.close();
});

describe('Server tests', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with a 200 status', async () => {
        const response = await request(server)
          .get('/')
        expect(response.status).toBe(200);
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
        expect(response.body).toEqual([
          {
            item: 'iPhone 6S',
            description: 'old phone. still works',
            price: 120,
            sellers_id: 45
          },
          {
            item: 'Oxford Dress Shoes',
            description: 'Timeless oxford dress shoes for a touch of class.',
            price: 47,
            sellers_id: 48
          },
          {
            item: 'Trench Coat',
            description: 'A classic trench coat to stay stylish in any weather.',
            price: 59,
            sellers_id: 49
          },
          {
            item: 'Cordless Drill Kit',
            description: 'A powerful cordless drill kit for your home projects.',
            price: 39,
            sellers_id: 50
          },
          {
            item: 'Workbench',
            description: 'Sturdy workbench for your garage workspace.',
            price: 77,
            sellers_id: 51
          },
          { item: 'cup', description: 'small', price: 5, sellers_id: 52 },
          { item: 'bowl', description: 'big', price: 10, sellers_id: 53 }
        ])
      })
    });
  });

  describe('/buyers/purchaseItem', () => {
    describe('DELETE', () => {
      it('responds with a status of 200', async () => {
        const response = await request(server)
          .delete('/buyers/purchaseItem')
        expect(response.status).toBe(200);
      });
      it('should say an item was purchased if the item exists in the database', async () => {
        const response = await request(server)
          .delete('/buyers/purchaseItem')
            .send({
              item: 'cheese',
            })
          expect(response.body).toEqual({ message: 'cheese was purchased'});
      });
      it('should say that it was unable to purchase if the item does not exist in the database', async () => {
        const response = await request(server)
        .delete('/buyers/purchaseItem')
          .send({
            item: 'diamonds',
          })
        expect(response.status).toBe(500);
        // expect(response.body).toEqual({ message: 'unable to purchase diamonds'});
      })
    });
  });

  describe('/sellers/addItems', () => {
    describe('POST', () => {
      it('responds with a status of 200', async () => {
        const response = await request(server)
          .post('/sellers/addItems')
          .send({
            item: 'cheese',
            description: 'declicious',
            price: '100',
          })
        console.log('response.body: ',response.body);
        expect(response.status).toBe(200);
      });
      it('adds an item to the database', async () => {
        const response = await request(server)
          .post('/sellers/addItems')
          .send({
            item: 'cheese',
            description: 'declicious',
            price: '100',
          })
        expect(response.body).toEqual({message: 'Item added'});
      });
    });
  });

});
