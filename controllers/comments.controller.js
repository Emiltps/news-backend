const {
  fetchCommentsByArticleId,
  createCommentsByArticleId,
} = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  createCommentsByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
