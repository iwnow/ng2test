let logger = require('../logger/log')(module);
let httpError = require('../error/httpError');


exports.post = (req, res, next) => {
    if (req.session.user) {
        logger.info(`logout ${req.session.user._id}`);
        req.session.destroy();
        return next();
    }
    next(new httpError(400));
};