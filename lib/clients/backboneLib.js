var Backbone = require('backbone');

// Draft of backbone syncing to jdb.
// Needs even triggers added.
// Does not use a global instance registry thing (yet).

Backbone.sync = function(method, model, options) {
    
    switch (method) {
        
        case 'create':
            var attrs = (options.attrs || model.toJSON(options));
            
            model._db.create(attrs, function(err, p) {
                if (err) {
                    
                } else {
                    model._instance = p;
                    // ...
                });
            }
            
        break;
        
        case 'read':
        
            if (model.id) {
                model._db.find(id, function(err, p) {
                    if (err || p.deleted) {
                        
                    } else {
                        model._instance = p;
                        // ...
                    }
                });
            }
        
        break;
        
        case: 'patch':
        case 'update':
        
            var attrs = (options.attrs || model.toJSON(options));
            for(var a in attrs){
                model._instance[a] = attrs[a];
                model.save(function(err, p) {
                    if (err) {
                        
                    } else {
                        model._instance = p;
                        // ...
                    }
                });
            }
        
        break;
        
        case 'delete':
        
            model._instance.deleted = true;
            model.save(function(err, p) {
                if (err) {
                    
                } else {
                    model._instance = p;
                    // ...
                }
            });
            
        
        break;
        
        
    }
    
}


function splice(models) {
    var Models = {};
    
    for(var modelName in models) {
        Models[modelName] = Backbone.Model.extend();
        Object.defineProperty(Models[modelName], '_type', {configurable: false, enumerable: false, value: modelName, writable: false});
        Object.defineProperty(Models[modelName], '_db', {configurable: false, enumerable: false, value: models[modelName], writable: false});
        Object.defineProperty(Models[modelName], '_instance', {configurable: false, enumerable: false, value: false, writable: true});
    }
    
    return Models;
}


exports.Backbone = Backbone;
exports.splice =  splice;
