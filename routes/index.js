const {models} = require("../models");

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/credits', (req, res, next) => {
  res.render('credits');
});

// Author page.
router.get('/quizzes', (req, res, next) => {
  models.quiz.findAll()
.then(quizzes => {
        res.render('quizzes', {quizzes});
    })
.catch(error => next(error));
});
module.exports = router;
