var assert = require('assert');
var JDMS = require('../j-dms').JDMS;


var storage;

describe('Initialize j-dms as a model resource provider.', function(){
    
    
    it('should accept configuration.', function(done) {
        storage = new JDMS({
            db: {
                type: 'memory'
            },
            api: {
                version: 0.1,
                url_root: '/api'
            },
            modelType: 'backbone'
        }); 
        
        storage.define('Demo', {'title': {type: String}});
        
        assert.ok(typeof storage == 'object');
        
        assert.ok(typeof storage.ServerModels == 'undefined');
        assert.ok(typeof storage.ClientModels == 'undefined');
        assert.ok(typeof storage.API == 'undefined');
        
        storage.init();

        assert.ok(typeof storage.ServerModels == 'function');
        assert.ok(typeof storage.ClientModels == 'function');
        assert.ok(typeof storage.API == 'function');
        
        done(); 
    });
    
    
    it('should accept chained configuration.', function(done) {
        
        storage = new JDMS().modelType('backbone').db({type: 'memory'}).api({url_root: '/api', version: 0.1}).define('Demo', {'title': {type: String}}).init();
        
        assert.ok(typeof storage == 'object');
        assert.ok(typeof storage.ServerModels == 'function');
        assert.ok(typeof storage.ClientModels == 'function');
        assert.ok(typeof storage.API == 'function');

        done();
    });
    
    it('should provide ServerModels', function(done) {
        var models = storage.ServerModels();
        assert.ok(typeof models == 'object');
        assert.ok(models.Demo);
        done();
    });
    
    it('should provide ClientModels', function(done) {
        var models = storage.ClientModels();
        assert.ok(typeof models == 'object');
        assert.ok(models.Demo);
        done();
    });
    
});

