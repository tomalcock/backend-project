const app = require('../app.js');
const db = require("../db/connection.js");
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const endpointsJSON = require('../endpoints.json');
const articles = require('../db/data/test-data/articles.js');

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe.only("GET /api/topics", () => {
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

describe.only("GET /api", () => {
    test('returns an object describing all the available endpoints on the API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(endpointsJSON);
        })
    })
})

describe.only("GET /api/articles/:article_id", () => {
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

describe.only("GET /api/articles", () => {
    test("return array of articles, with the correct properties AND no property body", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
            const articles = response.body.articles
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(article.hasOwnProperty('author')).toBe(true);
                expect(article.hasOwnProperty('title')).toBe(true);
                expect(article.hasOwnProperty('article_id')).toBe(true);
                expect(article.hasOwnProperty('topic')).toBe(true);
                expect(article.hasOwnProperty('created_at')).toBe(true);
                expect(article.hasOwnProperty('votes')).toBe(true);
                expect(article.hasOwnProperty('article_img_url')).toBe(true);
                expect(article.hasOwnProperty('comment_count')).toBe(true);
                expect(article.hasOwnProperty('body')).toBe(false);
            })
            expect(articles[0]['article_id']).toBe(3);
            expect(articles[0]['author']).toBe('icellusedkars');
            expect(articles[0]['title']).toBe('Eight pug gifs that remind me of mitch');
            expect(articles[0]['topic']).toBe('mitch');
            expect(articles[0]['created_at']).toBe('2020-11-03T09:12:00.000Z');
            expect(articles[0]['votes']).toBe(0);
            expect(articles[0]['article_img_url']).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
            expect(articles[0]['comment_count']).toBe('2');
            
        })
    })

    test("returns the articles in descending order", () => {
        return request(app)
        .get("/api/articles")
        .then((response) => {
            const articles = response.body.articles
            expect(articles).toBeSortedBy('created_at',{descending:true})
        })
    })

    test("returns 404 Not Found if path is not a route", () => {
        return request(app)
        .get('/api/articlessss')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('path not found')
        })
    })
})

describe.only("POST /api/articles/:article_id/comments", () => {
    test('inserts a new comment to the db and sends back the new comment', () => {
        const newComment = {
            username: 'butter_bridge',
            body: "this is a test"
        }
        return request(app)
        .post('/api/articles/3/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            const newComm = response.body.comment
            expect(newComm.author).toBe('butter_bridge');
            expect(newComm.body).toBe('this is a test');
            expect(newComm.article_id).toBe(3);
            expect(newComm.votes).toBe(0);
            expect(newComm.hasOwnProperty('created_at')).toBe(true);
        })
    })

    test('responds with a 404 code and error message when provided with a bad article_id (no article with specified id)', () => {
        const newComment = {
            username: 'butter_bridge',
            body: "this is a test"
        }
        return request(app)
          .post('/api/articles/999/comments')
          .send(newComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('not found');
          });
      });

      test('responds with a 400 code and error message when provided with an incorrect body', () => {
        const newComment = {
            username: 'butter_bridge',
            bodyyyy: "this is a test"
        }
        return request(app)
          .post('/api/articles/3/comments')
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
      });

      test('responds with a 400 code and error message when provided with an invalid article id', () => {
        const newComment = {
            username: 'butter_bridge',
            body: "this is a test"
        }
        return request(app)
          .post('/api/articles/hello/comments')
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
      });

      test('responds with a 404 code and error message when provided with a username that is not found', () => {
        const newComment = {
            username: 'Tom',
            body: "this is a test"
        }
        return request(app)
          .post('/api/articles/3/comments')
          .send(newComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('username not found');
          });
      });
})

describe.only("GET /api/articles/:article_id/comments", () => {
    test('returns array of comments for the queried article id with correct properties AND created_at in descending order', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then((response) => {
            const comments = response.body.comments;
            expect(comments[1]['comment_id']).toBe(10);
            expect(comments[1]['body']).toBe('git push origin master');
            expect(comments[1]['article_id']).toBe(3);
            expect(comments[1]['author']).toBe('icellusedkars');
            expect(comments[1]['votes']).toBe(0);
            expect(comments[1]['created_at']).toBe('2020-06-20T07:24:00.000Z');
            expect(comments[0]['comment_id']).toBe(11);
            expect(comments[0]['body']).toBe('Ambidextrous marsupial');
            expect(comments[0]['article_id']).toBe(3);
            expect(comments[0]['author']).toBe('icellusedkars');
            expect(comments[0]['votes']).toBe(0);
            expect(comments[0]['created_at']).toBe('2020-09-19T23:10:00.000Z');
        })
    })

    test('returns 404 status code and message article does not exist when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999/comments')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
      });

    test('returns 400 error code and message Bad Request when given an invalid id', () => {
    return request(app)
        .get('/api/articles/not-an-article/comments')
        .expect(400)
        .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
        });
    });

})

describe.only("GET /api/articles topic query", () => {
    test("query filters articles by a specific topic", () => {
        return request(app)
        .get("/api/articles?topic=cats")
        .then((response) => {
            const articles = response.body.articles
            expect(articles.length).toBe(1)
            articles.forEach((article) => {
                expect(article.topic).toBe('cats')
            })
        })
    })

    test("responds with a 404 not found with topic specified does not exist", () => {
        return request(app)
        .get("/api/articles?topic=hello")
        .then((response) => {
            expect(response.body.msg).toBe('topic does not exist');
            })
        })

    test("responds with a 200 found topic but no articles relating to that topic", () => {
        return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then((response) => {
            expect(response.body.msg).toBe('topic exists but no articles found');
            })
        })
})
    
describe.only("GET /api/users", () => {
    test("return array of user objects with properties username, name and avater_url", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
            users = response.body.users
            expect(users.length).toBe(4)
            users.forEach((user) => {
                expect(user.hasOwnProperty('username')).toBe(true);
                expect(user.hasOwnProperty('name')).toBe(true);
                expect(user.hasOwnProperty('avatar_url')).toBe(true);
            })
        })
    })
    
    test("returns 404 Not Found if path is not a route", () => {
        return request(app)
        .get('/api/userssss')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('path not found')
        })
    })
})

describe("DELETE /api/comments/:comment_id", () => {
    test("deletes the specified comment and sends no body back", () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204)
    })

    test('responds with an 404 status and error message when given a non-existent id', () => {
        return request(app)
          .delete('/api/comments/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('comment does not exist');
          });
    });
    
    test('responds with an 400 status and error message when given an invalid id', () => {
        return request(app)
          .delete('/api/comments/not-a-comment')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
          });
      });
})

describe.only("PATCH /api/articles/:article_id", () => {
    test('updates votes of a specified article and responds with updated article', () => {
        const newVotes = {
            inc_votes: 50
        }
        return request(app)
        .patch('/api/articles/3')
        .send(newVotes)
        .expect(200)
        .then((response) => {
            const updatedArt = response.body.updatedArticle;
            expect(updatedArt.title).toBe("Eight pug gifs that remind me of mitch");
            expect(updatedArt.topic).toBe("mitch");
            expect(updatedArt.author).toBe("icellusedkars");
            expect(updatedArt.body).toBe("some gifs");
            expect(updatedArt.created_at).toBe("2020-11-03T09:12:00.000Z");
            expect(updatedArt.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
            expect(updatedArt.votes).toBe(50);
        })
    })

    test('responds with a 404 code and error message when provided with a bad article_id (no article with specified id)', () => {
        const newVotes = {
            inc_votes: 50
        }
        return request(app)
          .patch('/api/articles/999')
          .send(newVotes)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
      });

    test('responds with a 400 code and error message when provided with a bad article_id (article_id is invalid)', () => {
    const newVotes = {
        inc_votes: 50
    }
    return request(app)
        .patch('/api/articles/hello')
        .send(newVotes)
        .expect(400)
        .then((response) => {
        expect(response.body.msg).toBe('Bad Request');
        });
    });

    test('responds with a 400 code and error message when provided with a body that does not include new votes', () => {
    const newVotes = {
        
    }
        return request(app)
            .patch('/api/articles/3')
            .send(newVotes)
            .expect(400)
            .then((response) => {
            expect(response.body.msg).toBe('must include new votes');
        });
    });

    test('responds with a 400 code and error message when provided with a body that includes votes BUT its not a number', () => {
        const newVotes = {
            inc_votes: 'hello'
        }
            return request(app)
                .patch('/api/articles/3')
                .send(newVotes)
                .expect(400)
                .then((response) => {
                expect(response.body.msg).toBe('must include new votes');
            });
        });

})

describe.only("GET /api/articles/:article_id comment count", () => {
    test("returns the requested article with correct properties, including comment count", () => {
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
            expect(article.comment_count).toBe('2');
        })
    })
})

describe.only("GET /api/articles sortby and order query", () => {
    test("returns sorted by title alphabetical if passed title query and ascending", () => {
        return request(app)
        .get("/api/articles?sort_by=title&direction=ascending")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy('title')
    })
    })

    test("returns sorted by topic alphabetical if passed topic query and ascending", () => {
        return request(app)
        .get("/api/articles?sort_by=topic&direction=ascending")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy('topic')
    })
    })

    test("returns sorted by author alphabetical if passed author query and ascending", () => {
        return request(app)
        .get("/api/articles?sort_by=author&direction=ascending")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy('author')
    })
    })

    test("returns sorted by created_at ascending if passed created_at query and ascending", () => {
        return request(app)
        .get("/api/articles?sort_by=created_at&direction=ascending")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy('created_at')
    })
    })

    test("returns sorted by votes ascending if passed votes query and ascending", () => {
        return request(app)
        .get("/api/articles?sort_by=votes&direction=ascending")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy('votes')
    })
    })

    test("returns sorted by comment count ascending if passed comment count query and ascending", () => {
        return request(app)
        .get("/api/articles?sort_by=comment_count&direction=ascending")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy(+'comment_count')
    })
    })

    test("returns sorted by comment count descending if passed comment count query but no order by", () => {
        return request(app)
        .get("/api/articles?sort_by=comment_count")
        .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy(+'comment_count',{descending:true})
    })
    })

    test("returns error code 400 and invalid sortby query if sort_by does not exist", () => {
        return request(app)
        .get("/api/articles?sort_by=topicccccc")
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('invalid sort by query');
        });
    })

    test("returns the query in default position (descending) if order_by does not exist", () => {
        return request(app)
        .get("/api/articles?sort_by=comment_count&direction=ascendingggg")
        .expect(200)
        .then((response) => {
            const articles = response.body.articles;
            expect(articles).toBeSortedBy(+'comment_count',{descending:true})
        });
    })

    test("returns error code 400 and sort by message if both sort by and order by are invalid", () => {
        return request(app)
        .get("/api/articles?sort_by=topiccccc&direction=ascendingggg")
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('invalid sort by query');
        });
    })
});

