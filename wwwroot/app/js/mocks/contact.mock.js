var all_1 = require('../models/all');
var ContactMock = (function () {
    function ContactMock() {
    }
    ContactMock.getContact = function () {
        ContactMock._seq++;
        var c = new all_1.Contact();
        c.id = ContactMock._seq;
        c.givenName = 'mock';
        c.familyName = 'mocker';
        c.middleName = 'test';
        c.avatar = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png';
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
        var mp = 89321732154, ip = 3021;
        for (var i = 0; i < n; i++) {
            var c = ContactMock.getContact();
            c.givenName += i;
            c.internalPhone = (mp + i).toString();
            c.mobilePhone = (ip + i * i).toString();
            ca.push(c);
        }
        return ca;
    };
    ContactMock._seq = 0;
    return ContactMock;
})();
exports.ContactMock = ContactMock;
//# sourceMappingURL=contact.mock.js.map