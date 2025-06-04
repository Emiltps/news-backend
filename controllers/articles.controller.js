const { fetchArticles } = require("../models/articles.model");

exports.getArticles = (req, res) => {
  fetchArticles().then((articles) => res.status(200).send({ articles }));
};
