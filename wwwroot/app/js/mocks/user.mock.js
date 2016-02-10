var user_1 = require('../models/user');
var UserMock = (function () {
    function UserMock() {
    }
    UserMock.Create = function () {
        return new user_1.User('mock@mock.com', 'q', 'mockLogin', 'mock', 'mock mock', 'q', '', null, true, ['mock']);
    };
    return UserMock;
})();
exports.UserMock = UserMock;
//# sourceMappingURL=user.mock.js.map