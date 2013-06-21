var assert = require('assert');
var ServerSide = require('../j-dms').ServerSide;
var ClientSide = require('../j-dms').ClientSide;
var API = require('../j-dms').API;


var StorageModels;

describe('Initialize j-dms as a model resource provider.', function(){
    
    
    describe('Server and API should accept identical configuration.', function() {
        
        it('should configure server models piece by piece', function(done){
            StorageModels = new ServerSide({
                db: {
                    type: 'memory'
                },
                options: {lib: 'backbone'},
                models: [{'Fake': {'text': {type: String}}}]
            }); 
            
            StorageModels.models([{'Example1': {'name': {type: String}}}, 
                                  {'Example2': {'name': {type: String}}}]); 
            
            StorageModels.models({'Example1': {'name': {type: String}}}, 
                                    {'Example2': {'name': {type: String}}},
                                    {'Example3': {'name': {type: String}}}); 
            
            StorageModels.define('Demo', {'title': {type: String}});
            
            assert.ok(typeof StorageModels == 'object');
            
            StorageModels.init();
    
            assert.ok(StorageModels.Demo);
            
            done(); 
        });
    
        it('should configure server models chained', function(done){
            StorageModels = (new ServerSide())
                .db({
                    type: 'memory'
                })
                .options({lib: 'backbone'})
                .models([{'Example1': {'name': {type: String}}}, 
                        {'Example2': {'name': {type: String}}}])
                .init();
                
            assert.ok(StorageModels.Example1);
        
            done(); 
        });
        
        it('should configure API by providing storage', function(done){
            
            var StorageAPI = new API({options: {lib: 'backbone', rootURL: '/api', storage: StorageModels}});
            
            StorageAPI.init();
    
            var request  = {};
            var response = {};
            StorageAPI.handleRequest(request, response);
            
            done(); 
            
        });
        
        it('should configure API piece by piece', function(done){
            var StorageAPI = new API({
                db: {
                    type: 'memory'
                },
                options: {lib: 'backbone', rootURL: '/api'},
                models: [{'Fake': {'text': {type: String}}}]
            }); 
            
            StorageAPI.models([{'Example1': {'name': {type: String}}}, 
                                  {'Example2': {'name': {type: String}}}]); 
            
            StorageAPI.models({'Example1': {'name': {type: String}}}, 
                                    {'Example2': {'name': {type: String}}},
                                    {'Example3': {'name': {type: String}}}); 
            
            StorageAPI.define('Demo', {'title': {type: String}});
            
            assert.ok(typeof StorageAPI == 'object');
            
            StorageAPI.init();
    
            var request  = {};
            var response = {};
            StorageAPI.handleRequest(request, response);
            
            done(); 
        });
        
        it('should configure API chained', function(done){
            var StorageAPI = (new API())
                .db({
                    type: 'memory'
                })
                .options({lib: 'backbone', rootURL:'/api'})
                .models([{'Example1': {'name': {type: String}}}, 
                        {'Example2': {'name': {type: String}}}])
                .init();
                
            assert.ok(typeof StorageAPI == 'object');
            
            var request  = {};
            var response = {};
            StorageAPI.handleRequest(request, response);
        
            done(); 
        });
    });
    
    describe('Client Side should accept client configuration.', function() {
        it('should configure client side chained', function(done) {
            var SyncModels = (new ClientSide())
                .models(['Demo', 'Example'])
                .options({lib: 'backbone', rootUrl:'/api'})
                .init()

            assert.ok(SyncModels.Demo);
            
            SyncModels.add('Fake');
            
            assert.ok(SyncModels.Fake);
            
            done();
        });
    });
});

