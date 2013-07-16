var assert = require('assert');
var ServerSide = require('../j-dms').ServerSide;
var ClientSide = require('../j-dms').ClientSide;
var API = require('../j-dms').API;

var StorageModels, ModelList, ModelArg0, ModelArg1, ModelArg2, ModelArg3, ModelArg4, defaultDB, defaultOptions, defaultArg, Example0;

function stringModel(modelName, propertyName){
    var model = {};
    model[modelName] = {};
    model[modelName][propertyName] = {type: String};
    return model;
}


function arrayOfModels(listOfNames){
    var m = [];
    var name;
    while(name = listOfNames.pop()){
        m.push(stringModel(name, 'word'));
    }
    return m;
}

var setup = function(){
    ModelList = arrayOfModels(['DemoModel0','DemoModel1','DemoModel2','DemoModel3']);
    ModelArg0 = {'ArgModel0': {'word': {type: String}}};
    ModelArg1 = {'ArgModel1': {'word': {type: String}}};
    ModelArg2 = {'ArgModel2': {'word': {type: String}}};
    ModelArg3 = {'ArgModel3': {'word': {type: String}}};
    ModelArg4 = {'ArgModel4': {'word': {type: String}}};
    defaultDB = {type: 'memory'};
    defaultOptions = {lib: 'backbone'};
    defaultArg = { db: defaultDB, options: defaultOptions, models: ModelList};
    
};


describe('Initialize j-dms as a model resource provider.', function(){
    
    before(setup);
    
    describe('Server and API should accept identical configuration.', function() {
        
        it('should configure server models piece by piece', function(done){
            StorageModels = new ServerSide(defaultArg); 
            
            StorageModels.models([ModelArg0, ModelArg1]); 
            
            StorageModels.models(ModelArg2, ModelArg3, ModelArg4); 
            
            Example0 = StorageModels.define('Example0', {'title': {type: String}});
            
            //console.log(StorageModels.modelSettings());
            
            StorageModels.init();
    
            done(); 
        });
    
    
        
    
        it('should configure server models chained', function(done){
            StorageModels = (new ServerSide())
                .db(defaultDB)
                .options(defaultOptions)
                .models(ModelList)
                .init();
                
            done(function(models){
               // models.User 
                
            }); 
        });
        
        it('should configure API by providing storage', function(done){
            
            var StorageAPI = new API({options: {lib: 'backbone', rootURL: '/api', storage: StorageModels}});
            
            StorageAPI.init();
    
            // var request  = {};
            // var response = {};
            // StorageAPI.handleRequest(request, response);
            
            done(); 
            
        });
        
        it('should configure API piece by piece', function(done){
            var StorageAPI = new API({
                db: defaultDB,
                options: {lib: 'backbone', rootURL: '/api'},
                models: ModelList
            }); 
            
            StorageAPI.models([ModelArg0, ModelArg1]); 
            
            StorageAPI.models(ModelArg2, ModelArg3, ModelArg4); 
            
            Example0 = StorageAPI.define('Example0', {'title': {type: String}});
            
            StorageAPI.init();
    
            /*
                var request  = {};
                var response = {};
                StorageAPI.handleRequest(request, response);
            */
            
            done(); 
        });
        
        it('should configure API chained', function(done){
            var StorageAPI = (new API())
                .db(defaultDB)
                .options({lib: 'backbone', rootURL:'/api'})
                .models(ModelList)
                .init();
                
            /*
            var request  = {};
            var response = {};
            StorageAPI.handleRequest(request, response);
            */
        
            done(); 
        });
    });
    
    describe('Client Side should accept client configuration.', function() {
        
        it('should configure client side piece by piece', function(done) {
            var ClientModels = new ClientSide({
                models: ['ArgModel1', 'DemoModel2'],
                options: [{lib: 'backbone', rootUrl:'/api'}]
            });

            ClientModels.add('ArgModel0');
            
            ClientModels.init();
            
            done();
        });
        
        it('should configure client side chained', function(done) {
            var ClientModels = (new ClientSide())
                .models(['ArgModel1', 'DemoModel2'])
                .options({lib: 'backbone', rootUrl:'/api'})
                .init();

            ClientModels.add('ArgModel0');
            
            done();
        });
    });
    
    
});


