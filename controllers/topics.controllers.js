const fetchTopics = require('../models/topics.models.js');

function getTopics(req,res,next) {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
    .catch((err) => next(err))
}

module.exports = getTopics;