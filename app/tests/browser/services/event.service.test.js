"use strict";
var settings_1 = require('../../settings');
var all_1 = require('../../../source/browser/ts/services/all');
describe('Сервис сообщений между компонентами внутри браузера:', function () {
    var _service = new all_1.EventService();
    before(function () {
        _service = new all_1.EventService();
    });
    describe('Источник отправляет данные в сервис сообщений с заданным ключом -> подписчик по данному ключу получает данные через callback', function () {
        it("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043C \u043E\u0431\u044A\u0435\u043A\u0442 {a:4, b:'test'} \u0441 \u043A\u043B\u044E\u0447\u043E\u043C 'test', \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A \u043F\u043E\u0434\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u0441\u0435\u0440\u0432\u0438\u0441\u0435 \u043D\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0441 \u043A\u043B\u044E\u0447\u043E\u043C 'test' \u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043E\u0431\u044A\u0435\u043A\u0442 {a:4, b:'test'}", function (done) {
            var key = 'test';
            var getData;
            var pushData = {
                a: 4,
                b: 'test'
            };
            _service.subscribe(key, function (data) {
                getData = data;
                settings_1.expect(getData.a).to.equals(pushData.a);
                settings_1.expect(getData.b).to.equals(pushData.b);
                done();
            });
            _service.emit({
                key: key,
                data: pushData
            });
        });
    });
});
