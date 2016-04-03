let httpError = require('../error/httpError');

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    next(new httpError(401));
}