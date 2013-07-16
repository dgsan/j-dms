var Configure = require("./Configure.js");

function ServerSide() {
    Configure.configure.call(this, arguments[0] || null, arguments[1] || null);
    Object.defineProperty(this, '_ready', {configurable: false, enumerable: false, value: null, writable: true});
    Configure.containers(this._options, ['models', 'options', 'db']);
    Configure.containers(this._tools, ['db']);
    return this;
};

Configure.inject(ServerSide, ['options', 'db', 'init', 'models', 'define']); // Non-enumerable prototype methods/calls.

ServerSide.prototype.models = function() { 
    if (arguments.length > 0) {
        LoadPrePrepModels.apply(this, arguments);
        if (this._ready === true) {
            this.redefineAndMigrate();
        } else if (this._ready === null) {
            return this;
        } else {
            // @todo: defer - On ready, ...
        }
    }
    return this;
};

ServerSide.prototype.options = function() {
    if (arguments[0]) {
        for (var i in arguments[0]) {
            this._options.options[i] = arguments[0][i];
        }
    }
    return this;
}

ServerSide.prototype.db = function() {
    if (arguments[0]) {
        for (var i in arguments[0]) {
            this._options.db[i] = arguments[0][i];
        }
    }
    return this;
}

ServerSide.prototype.define = function(name, properties) {
    var settingsObj = {};
    settingsObj[name] = properties;
    return this.models(settingsObj);
}

ServerSide.prototype.init = function(db) {
    
}

function redefineAndMigrate() {
    
    
}


function LoadPrePrepModels() {
    switch(arguments.length) {
        case 0:
        break;
        case 1:
            if (arguments[0] instanceof Array) {
                var modelOpts = arguments[0];
                for (var i = 0; i <  modelOpts.length; i++) {
                    for (var n in modelOpts[i]) {
                        this._options.models[n] = modelOpts[i];
                    }
                }
                break;
            }
        default:
            for (var i = 0; i < arguments.length; i++) {
                for (var n in arguments[i]) {
                    this._options.models[n] = arguments[i];
                }
            }
        break;
    }
}


exports.ServerSide = ServerSide;
