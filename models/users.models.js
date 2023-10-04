const db = require('../db/connection.js');
const format = require('pg-format');


function fetchUsers() {
    return db.query('SELECT * FROM users')
    .then((response) => {
        return response.rows;
    })
}


module.exports = fetchUsers;