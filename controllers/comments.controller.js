const {
  fetchCommentsByArticleId,
  createCommentsByArticleId,
  removeCommentsByCommentId,
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
exports.deleteCommentsbyCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentsByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
