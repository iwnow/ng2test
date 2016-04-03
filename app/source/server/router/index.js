let checkAuth = require('../pipe/checkAuth');

module.exports = (app) => {
    
    app.post('/api/login', require('./login').post);

    app.post('/api/register', require('./register').post);
    
    app.post('/api/logout', require('./logout').post);
    
    app.get('/api/test', checkAuth, require('./test').get);
    
}