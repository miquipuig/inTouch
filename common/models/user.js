// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(User) {
var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;

//User.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});

if (!(User.settings.realmRequired || User.settings.realmDelimiter)) {
  User.validatesUniquenessOf('email', {message: 'Email already exists'});
  User.validatesUniquenessOf('username', {message: 'User already exists'});
}
};
