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
        var srv;
        if (!typeName)
            throw "Parameter [typeName] must not be empty!";
        switch (typeName) {
            case 'IUserService':
                srv = new user_service_1.UserService();
                return srv;
                break;
            default:
                throw "class [" + typeName + "] is not implemented!";
        }
    };
    return DefaultServiceLocator;
})();
//# sourceMappingURL=locator.service.js.map