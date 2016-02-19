var all_1 = require('../models/all');
var ContactMock = (function () {
    function ContactMock() {
    }
    ContactMock.getContact = function () {
        var c = new all_1.Contact();
        c.givenName = 'mock';
        c.familyName = 'mocker';
        c.middleName = 'test';
        c.avatar = 'mock.png';
        c.internalPhone = '3021';
        c.mail = 'mock@mock.com';
        c.mobilePhone = '89321732154';
        c.position = 'team lead';
        c.subdivision = 'system development';
        c.workPhone = '89321732154';
        return c;
    };
    ContactMock.getContacts = function (n) {
        var ca = [];
        for (var i = 0; i < n; i++) {
            var c = ContactMock.getContact();
            c.givenName += i;
            ca.push(c);
        }
        return ca;
    };
    return ContactMock;
})();
exports.ContactMock = ContactMock;
//# sourceMappingURL=contact.mock.js.map