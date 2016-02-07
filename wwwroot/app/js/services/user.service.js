var user_mock_1 = require('../mocks/user.mock');
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.getUserInfo = function () {
        return user_mock_1.UserMock.Create();
    };
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map