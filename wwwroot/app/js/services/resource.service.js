var all_1 = require('../contracts/all');
var ResourceService = (function () {
    function ResourceService() {
        this._culture = all_1.Cultures.ru;
    }
    ResourceService.prototype.supportedCultures = function () {
        return [all_1.Cultures.ru, all_1.Cultures.en];
    };
    ResourceService.prototype.getResource = function () {
        return this._resx;
    };
    ResourceService.prototype.setResource = function (culture) {
        this._culture = culture;
    };
    ResourceService.prototype.getNameByEnum = function (culture) {
        var res = '';
        switch (culture) {
            case all_1.Cultures.en:
                res = 'En';
                break;
            case all_1.Cultures.ru:
                res = 'Ru';
                break;
            default:
                break;
        }
        return res;
    };
    ResourceService.prototype.getCultureByName = function (name) {
        switch (name.toLowerCase()) {
            case 'ru':
                return all_1.Cultures.ru;
                break;
            case 'en':
                return all_1.Cultures.en;
            default:
                break;
        }
    };
    return ResourceService;
})();
exports.ResourceService = ResourceService;
//# sourceMappingURL=resource.service.js.map