var BBlib = require("../lib/clients/backboneLib.js");

var Schema = require("jugglingdb").Schema;

var db = new Schema('memory');

var dbModels = {};

var model;

dbModels.User = db.define('User', {
    name:         String,
    bio:          Schema.Text,
    approved:     Boolean,
    joinedAt:     Date,
    age:          Number
});

var Models = BBlib.splice(dbModels);

var user = new Models.User();

user.set({name: 'Ted', bio: 'Ted eats chicken.'});

// This will still save the whole thing since there's no patch option, I guess?
user.save({}, { success: function () {
    console.log('callback');
}});

dbModels.User.findOne({where: {name: 'Ted'}}, function (err, p) {
    console.log('Found after save!');
    console.log(err);
    console.log(p);
});
