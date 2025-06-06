const express = require("express");
const app = express();
const { getEndpoints } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesById,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");

const { getCommentsByArticleId , postCommentsByArticleId } = require("./controllers/comments.controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId)

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
