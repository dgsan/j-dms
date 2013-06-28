var Configure = require("./Configure.js")

function API() {
    Configure.configure.call(this, arguments[0] || null, arguments[1] || null);
    Configure.containers(this._options, ['serverSide', 'options']);
    return this;
};

Configure.inject(API, ['options', 'db', 'init', 'models', 'define']); // Non-enumerable prototype methods/calls.

API.prototype.models = function() { 
    
    return this;
};

API.prototype.options = function() {

    return this;
};

API.prototype.db = function() {
    
    return this;
};

API.prototype.define = function(name, properties) {
    
    return this;
}


API.prototype.init = function() {
    
}

exports.API = API;

