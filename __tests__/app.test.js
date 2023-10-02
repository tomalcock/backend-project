const app = require('../app.js');
const db = require("../db/connection.js");
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe("GET /api/healthcheck", () => {
    test("returns 200 status code", () => {
      return request(app).get("/api/healthcheck").expect(200);
    });
  });

describe("GET /api/topics", () => {
    test("return array of topic objects with properties slug and description", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
            const topics = response.body;
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true);
                expect(topic.hasOwnProperty('description')).toBe(true);
            })
        })
    })

    test("returns 404 Not Found if path is not a route", () => {
        return request(app)
        .get('/api/topicssss')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('path not found')
        })
    })
})

describe("GET /api", () => {
    test('returns an object describing all the available endpoints on the API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            console.log(response.body)
            expect(typeof response.body).toBe('object')
            expect(response.body.hasOwnProperty('GET /api')).toBe(true)
            expect(response.body.hasOwnProperty('GET /api/topics')).toBe(true)
            expect(response.body.hasOwnProperty('GET /api/articles')).toBe(true)
        })
    })
})
