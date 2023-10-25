// this file contains integration tests for the backend

// import in supertest
// const { it } = require('node:test');
const request = require('supertest');

// designate the server
const server = require('../server/server');



describe('Server tests', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with a 200 status', () => {
        return request(server)
          .get('/')
          .expect(200);
      });
    });
  });

  describe('/buyers/display', () => {
    describe('GET', () => {
      it('responds with a 200 status', () => {
        return request(server)
          .get('/buyers/display')
          .expect(200);
      });
    });
  });
});




// describe('sum function', () => {
//   it('adds numbers together', () => {
//     const sum = (a, b) => {
//       return a + b;
//     };
//     expect(sum(1, 2)).toEqual(3);
//   });
// })
