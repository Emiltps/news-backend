const db = require("../db/connection");
exports.fetchArticles = () => {
  return db
    .query(
      `SELECT 
  article_id,
  title,
  topic,
  author,
  created_at,
  votes,
  article_img_url,
  (SELECT COUNT (*) FROM comments
  WHERE comments.article_id = articles.article_id) AS comment_count
FROM articles
ORDER BY created_at`
    )
    .then(({ rows }) => {
      const articles = rows;
      return articles;
    });
};
