let http = require('http');


class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message || http.STATUS_CODES[status] || 'Error';
        this.name = 'HttpError';
    }
}

module.exports = HttpError;