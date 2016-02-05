var user_service_1 = require('./user.service');
/**
 * Сервис провайдер приложения
 */
var ServiceLocator = (function () {
    function ServiceLocator() {
        this._locator = new DefaultServiceLocator();
    }
    ServiceLocator.prototype.getService = function (srvName) {
        return this._locator.getService(srvName);
    };
    return ServiceLocator;
})();
exports.ServiceLocator = ServiceLocator;
var DefaultServiceLocator = (function () {
    function DefaultServiceLocator() {
    }
    DefaultServiceLocator.prototype.getService = function (typeName) {
        switch (typeName) {
            case 'IUserInfoService':
                return new user_service_1.UserInfoService();
                break;
            default:
                throw "class [" + typeName + "] is not implemented!";
        }
    };
    return DefaultServiceLocator;
})();
//# sourceMappingURL=locator.service.js.map