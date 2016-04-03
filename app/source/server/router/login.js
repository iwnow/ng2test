let logger = require('../logger/log')(module);
let httpError = require('../error/httpError');
let User = require('../db/models/user');


exports.post = (req, res, next) => {
    logger.info(req.session.user);
    let email = req.body.email;
    let password = req.body.password;
    
    User.authorize(email, password, (err, user) => {
        if (err) {
            if (err.name == 'AuthError') {
                return next(new httpError(403, err.message));
            }
            return next(err);
        }
        
        req.session.user = user;
        res.send({
            email: user.email,
            companies: [user.company],
            created: user.created
        });
    });
   
};