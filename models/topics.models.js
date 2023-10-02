const db = require('../db/connection.js');
const format = require('pg-format');

function fetchTopics() {
    return db.query('SELECT * FROM topics')
    .then((response) => {
        return response.rows;
    })
}

module.exports = fetchTopics;