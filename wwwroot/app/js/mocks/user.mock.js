var UserMock = (function () {
    function UserMock() {
    }
    UserMock.Create = function () {
        return {
            Name: 'MockName',
            Login: 'mock@mock.com',
            IsAuthorized: true,
            Roles: ['mock']
        };
    };
    return UserMock;
})();
exports.UserMock = UserMock;
//# sourceMappingURL=user.mock.js.map