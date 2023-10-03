const app = require('../app.js');
const db = require("../db/connection.js");
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const endpointsJSON = require('../endpoints.json')

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
            topics = response.body.topics
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
            expect(response.body).toEqual(endpointsJSON);
        })
    })
})

describe("GET /api/articles/:article_id", () => {
    test("returns the requested article with correct properties", () => {
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then((response) => {
            const article = response.body.article;
            expect(article.title).toBe("Eight pug gifs that remind me of mitch");
            expect(article.topic).toBe("mitch");
            expect(article.author).toBe("icellusedkars");
            expect(article.body).toBe("some gifs");
            expect(article.created_at).toBe('2020-11-03T09:12:00.000Z');
            expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
        })
    })

    test('returns 404 status code and message article does not exist when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
      });

    test('returns 400 error code and message Bad Request when given an invalid id', () => {
    return request(app)
        .get('/api/articles/not-an-article')
        .expect(400)
        .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
        });
    });
})

