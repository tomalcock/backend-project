const topics = require('../db/data/test-data/topics.js');
const fetchTopics = require('../models/topics.models.js');

function getTopics(req,res,next) {
    fetchTopics()
    .then((response) => {
        const topicsObj = {topics: response};
        res.status(200).send(topicsObj)
    })
    .catch((err) => next(err))
}

module.exports = getTopics;