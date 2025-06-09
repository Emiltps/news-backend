const db = require("../db/connection");
exports.fetchArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  const validSortColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const validOrders = ["asc", "desc"];
  if (!validSortColumns.includes(sort_by) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  let queryString = `SELECT 
  article_id,
  title,
  topic,
  author,
  created_at,
  votes,
  article_img_url,
  (SELECT COUNT (*) FROM comments
  WHERE comments.article_id = articles.article_id) AS comment_count
FROM articles`;
  if (topic) {
    queryString += ` WHERE topic = $1 ORDER BY ${sort_by} ${order.toUpperCase()}`;
    return await db.query(queryString, [topic]).then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      const articles = rows;
      return articles;
    });
  }
  queryString += ` ORDER BY ${sort_by} ${order.toUpperCase()}`;
  return await db.query(queryString).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    const articles = rows;
    return articles;
  });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT * FROM articles 
    WHERE articles.article_id = $1`,
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      const articleById = rows[0];
      return articleById;
    });
};
exports.patchArticleVotesById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      const articleById = rows[0];
      return articleById;
    });
};
