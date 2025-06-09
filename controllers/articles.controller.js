const {
  fetchArticles,
  fetchArticleById,
  patchArticleVotesById,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => res.status(200).send({ articles }))
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((articleById) => res.status(200).send({ article: articleById }))
    .catch((err) => {
      next(err);
    });
};

exports.updateArticleVotesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVotesById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
