let logger = require('../logger/log')(module);
let httpError = require('../error/httpError');
let User = require('../db/models/user');
let async = require('async');

const ecode = new Map()
            .set(0, 'Ok')
            .set(-1, 'User already exist')
            .set(-2, 'Company already exist');

exports.post = (req, res, next) => {
    logger.info(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let companies = req.body.companies;
    
    let throwError = (status) => {
        return next(new httpError(status || 400));
    };
    
    if (!email || !password || !(companies && (companies.length > 0)))
        return throwError();
    
    let companyName = companies[0].name;
    //check email already exist
    async.waterfall([
        (cb) => User.findOne({email: email}, cb),
        (user, cb) => {
            if (user)
                return cb({ecode:-1});
            User.findOne({company: companyName}, cb);
        },
        (user, cb) => {
            if (user)
                return cb({ecode:-2});
            let u = new User({
                email: email,
                password: password,
                company: companyName
            });
            u.save(cb);
        }
    ], (err, user) => {        
        if (err) {
            if (err.ecode)
                return res.json(err);
            return next(err);
        }
        res.json({
            email: user.email,
            companies: [user.company]
        });
    });
   
};