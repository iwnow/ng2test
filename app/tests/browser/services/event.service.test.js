"use strict";
require('reflect-metadata');
require('mocha');
var chai = require('chai');
var expect = chai.expect;
var all_1 = require('../../../source/browser/ts/services/all');
describe('Browser event service test:', function () {
    var _service = new all_1.EventService();
    before(function () {
        _service = new all_1.EventService();
    });
    describe('Data push to event service by any object -> subscriber handle the data by key', function () {
        it("push obj {a:4, b:'test'} with key 'test', subscriber subs the event with key 'test' and get obj {a:4, b:'test'}", function (done) {
            var key = 'test';
            var getData;
            var pushData = {
                a: 4,
                b: 'test'
            };
            _service.subscribe(key, function (data) {
                getData = data;
                expect(getData.a).to.equals(pushData.a);
                expect(getData.b).to.equals(pushData.b);
                done();
            });
            _service.emit({
                key: key,
                data: pushData
            });
        });
    });
});
