const db = require('../db/connection.js')
const format = require('pg-format');
const { checkTopicExists } = require('./topics.models.js');



function fetchArticleByID(article_id) {
    return db
    .query(`SELECT articles.article_id,articles.body,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    HAVING articles.article_id = $1;`,
    [article_id])
    .then((result) => {

        if(result.rows.length ===0) {
            return Promise.reject({status:404, msg: "article does not exist"})
        }
        else {
            return result.rows[0];
        } 
    })
}

function fetchArticles(topic) {
    if(topic === undefined) {
    return db
    .query(`SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)
    .then(response => {
        return response.rows;
    })
} else {
    return checkTopicExists(topic)
    .then(() => {
        return db
        .query(`SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        HAVING articles.topic = $1
        ;`,
        [topic])   
    })
    .then((response) => {
        if(response.rows.length === 0) {
            return Promise.reject({status:200, msg: "topic exists but no articles found"})
        }
        return response.rows;
    })
   
}
}

function updateArticles(article_id,newVotes) {
    return db
    .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
    [newVotes,article_id])
    .then((response) => {
        if(response.rows.length === 0) {
            return Promise.reject({status:404, msg: "article does not exist"})
        }
        const updatedArticle = response.rows[0];
        return updatedArticle;
    })

}

module.exports = {fetchArticleByID, fetchArticles, updateArticles};
