const express = require("express");
const app = express();
const { getEndpoints } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
