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

function fetchArticles(userQuery) {
    const validSortBys = {
        title: "title",
        topic: "topic",
        author: "author",
        created_at: "created_at",
        votes: "votes",
        comment_count: "comment_count"
    }

    const validOrders = {
        ascending: "ASC",
        descending: "DESC"
    }

  if(userQuery.topic === undefined && userQuery.sort_by === undefined) {
    return db
    .query(`SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)
    .then(response => {
        return response.rows;
    })
} if(userQuery.topic !== undefined && userQuery.sort_by === undefined) {
    return checkTopicExists(userQuery.topic)
    .then(() => {
        return db
        .query(`SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        HAVING articles.topic = $1
        ;`,
        [userQuery.topic])   
    })
    .then((response) => {
        if(response.rows.length === 0) {
            return Promise.reject({status:200, msg: "topic exists but no articles found"})
        }
        return response.rows;
    })
} if(!(userQuery.sort_by in validSortBys)) {
    return Promise.reject({status:400, message: "invalid sort by query"})
} else{
    let query = `SELECT articles.article_id,articles.author,articles.title,articles.topic,articles.created_at,articles.votes,articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY ${validSortBys[userQuery.sort_by]}`
    
    if(userQuery.direction in validOrders) {
        query += ` ${validOrders[userQuery.direction]};`;
    }

    if(userQuery.direction === undefined || !(userQuery.direction in validOrders)){
        query += ` DESC;`
    }
    return db.query(query)
    .then((response) => {
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

function insertArticle({author,title,body,topic,article_img_url}) {
    console.log('in model')
    return db
    .query(
        `SELECT * FROM users WHERE users.name = $1;`,
        [author]
    )
    .then((response) => {
        const username = response.rows[0].username;
        return db
    .query(
    `INSERT INTO articles (title, topic, author, body, article_img_URL) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
    [title,topic,username,body,article_img_url]
    )
    })
    .then((result) => {
        const newArticle = result.rows[0];
        newArticle.comment_count = 0; 
        return newArticle;
    })
}

function isUserValid(author){
    console.log('in username function')
    return db
    .query(
        `SELECT * FROM users WHERE name = $1;`,
        [author]
    )
    .then((response) => {
        if(response.rows.length === 0) {
            return 'false'
        }
        return 'true';
    })
}

module.exports = {fetchArticleByID, fetchArticles, updateArticles, insertArticle, isUserValid};

