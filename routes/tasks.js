//this is where you will be createing the diffrent tasks
//they are tasks like get put delete update
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://xxxxxxxx:xxxxxx@bla bla bla bla bla', ['bla bla bla'])

//get all tasks
router.get('/tasks', function (req, res, next) {
    //res.send('TASK API');
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
});

//get a single task
router.get('/tasks/:id', function (req, res, next) {
    db.tasks.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
});

//save Task or Create a Task
router.post('/tasks', function (req, res, next) {
    let task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.task.save(task, function (err, task) {

            if (err) {
                res.send(err);
            }
            res.json(tasks);

        });
    }

});


//Delete data
router.delete('/tasks/:id', function (req, res, next) {
    db.tasks.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    })
});
//Update task
router.put('/tasks/:id', function (req, res, next) {
    let task = req.body;
    let updTask = {};
    if (task.isDone) {
        updTask.isDone = task.isDone;
    }
    if (task.isDone) {
        updTask.title = task.title;
    }
    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });

    } else {

        db.tasks.put({
            _id: mongojs.ObjectId(req.params.id)
        }, updTask, {}, function (err, tasks) {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        })

    }

});


module.exports = router;
