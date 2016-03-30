
let httpError = require('../error/httpError');
let logger = require('../logger/log')(module);
let User = require('../db/models/user');

module.exports = (app) => {
    
    app.post('/api/login', function (req, res, next) {
        logger.info(req.body);
        res.status(200).send({
            result: 'ok',
            action: 'login'
        });
        next();
    });

    app.post('/api/register', function (req, res, next) {
        logger.info(req.body);
        res.status(200).send({
            result: 'ok',
            action: 'register'
        });
        next();
    });


    app.get('/users', (req, res, next) => {
        User.find({}, function(err, users) {
            if (err) return next(err);
            res.json(users);
        });
    });

    app.get('/users/:id', (req, res, next) => {
        User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) return next(new httpError(404));
        res.json(user); 
        });
    });
    
}