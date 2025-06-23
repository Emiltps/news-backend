const express = require("express");
const app = express();
const cors = require("cors");
const { getEndpoints } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticlesById,
  updateArticleVotesById,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");

const {
  getCommentsByArticleId,
  postCommentsByArticleId,
  deleteCommentsbyCommentId,
} = require("./controllers/comments.controller");

app.use(cors());

// const ejs = require("ejs");
// app.set("view engine", "ejs");
// app.set("views", "views");
// app.get("/", (request, response) => {
//   response.render("index");
// });

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", updateArticleVotesById);

app.delete("/api/comments/:comment_id", deleteCommentsbyCommentId);

app.use("/", express.static("public", { index: "index.html" }));

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
