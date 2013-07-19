var Splicer = require("../lib/clients/backboneSplicer.js");

var Schema = require("jugglingdb").Schema;

var assert = require('assert')
var db = new Schema('memory');
var dbModels = {};

var model;
var Models;
var user;
var user2;

dbModels.User = db.define('User', {
    name:         String,
    bio:          Schema.Text,
    approved:     Boolean,
    joinedAt:     Date,
    age:          Number
});

describe('Using JDB to back a Backbone Model', function() {
    
    it('Should make model instances', function(done) {
        
        Models = Splicer.splice(dbModels);

        user = new Models.User();
        user.set({name: 'Ted', bio: 'Ted eats chicken.'});
        
        assert.equal(user.get('name'), 'Ted');
        assert.equal(user.get('bio'), 'Ted eats chicken.');
        
        done();
    })
    
    it('Should save the model', function(done) {
        
        // This will still save the whole thing since there's no patch option, I guess?
        user.save({}, { success: function () {
            assert.equal(true, true); // Just checking it fires.
            done();
        }});
        
    });
    
    
    it('Should have materialized the model to JDB', function(done) {
    
        dbModels.User.findOne({where: {name: 'Ted'}}, function (err, p) {
            assert.equal(p.name, 'Ted');
            assert.equal(p.bio, 'Ted eats chicken.');
            done();
        });
    
    });
    
    it('Should be retrievable from the Backbone model', function(done) {

        user2 = new Models.User();
        user2.set({id: 1});
        user2.fetch({success: function(model, response, options) {
            assert.equal(model.get('name'), 'Ted');
            assert.equal(model.get('bio'), 'Ted eats chicken.');
            done();
        }}); 

    });
    
});
