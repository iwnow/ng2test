var user_mock_1 = require('../mocks/user.mock');
var UserInfoService = (function () {
    function UserInfoService() {
    }
    UserInfoService.prototype.getUserInfo = function () {
        return user_mock_1.UserMock.Create();
    };
    return UserInfoService;
})();
exports.UserInfoService = UserInfoService;
//# sourceMappingURL=user.service.js.map