const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});
describe("app tests", () => {
  describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).toEqual(endpointsJson);
        });
    });
  });
  describe("Get /api/topics", () => {
    test("200: Responds with an object with key topic that contains an array with slug, description and topic properties ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(body.topics.length).not.toBe(0);
          body.topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
            expect(typeof topic.img_url).toBe("string");
          });
        });
    });
  });
  describe("Get /api/articles", () => {
    test("200: Responds with an object with key articles that contains an array with specified properties ", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(body.articles.length).not.toBe(0);
          body.articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(article.body).toBe(undefined);
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("string");
          });
        });
    });
    test("200: Responds with an object with the key of article and the value of an article object for given id", () => {
      return request(app)
        .get("/api/articles/8")
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(typeof body).toBe("object");
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(article.article_id).toBe(8);
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.body).toBe("string");
          expect(typeof article.article_img_url).toBe("string");
        });
    });
    test("404: Responds with error if article doesn't exist", () => {
      return request(app)
        .get("/api/articles/800")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });

    test("400: Responds with error if id is not valid", () => {
      return request(app)
        .get("/api/articles/hello")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("bad request");
        });
    });
    test("200: Responds with an object with the key of comments and the value of an array of comments for the given article_id", () => {
      return request(app)
        .get("/api/articles/13/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;

          expect(comments.length).not.toBe(0);
          comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(comment.article_id).toBe(13);
          });
        });
    });
    test("404: Responds with error if article doesn't exist", () => {
      return request(app)
        .get("/api/articles/800/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
    test("201: POST responds with posted comment and adds a comment to the article", () => {
      return request(app)
        .post("/api/articles/13/comments")
        .send({
          username: "butter_bridge",
          body: "Test comment to be posted on article 13",
        })
        .expect(201)
        .then(({ body }) => {
          const comment = body.comment;
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("article_id", 13);
          expect(comment).toHaveProperty("author", "butter_bridge");
          expect(comment).toHaveProperty(
            "body",
            "Test comment to be posted on article 13"
          );
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("votes", 0);
        });
    });
    test("201: POST responds with error 404 if article ID invalid", () => {
      return request(app)
        .post("/api/articles/130/comments")
        .send({
          username: "butter_bridge",
          body: "Test comment to be posted on article 13",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("not found");
        });
    });
  });
  describe("Get /api/users", () => {
    test("200: Responds with an object with key users that contains an array of user objects ", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(body.users.length).not.toBe(0);
          body.users.forEach((user) => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          });
        });
    });
  });
});
