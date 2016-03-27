'use strict';
let logger = require('../../logger/log')(module);
let crypto = require('crypto');
let mongoose = require('../link');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashPass: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

let sha1 = 'sha1';

userSchema.methods.cryptPassword = function (pass) {
    return crypto.createHmac(sha1, this.salt).update(pass).digest('hex');
};

let setPassword = function(pass) {
    this._plainPass = pass;
    this.salt = Math.random() + '';
    this.hashPass = this.cryptPassword(pass);
};
let getPassword = function() { return this._plainPass; };

userSchema.virtual('password')
    .set(setPassword)
    .get(getPassword);
    
userSchema.methods.checkPassword = function(pass) {
    return this.cryptPassword(pass) == this.hashPass;
};


module.exports = mongoose.model('User', userSchema);
