var JDMS = function JDMS() {

};
JDMS.prototype.db = function() {
    return this;
};
JDMS.prototype.api = function() {
    return this;
};
JDMS.prototype.modelType = function() {
    return this;
};
JDMS.prototype.define = function() {
    return this;
};

JDMS.prototype.init = function(cb) {
    syncModels(this);
    this.ServerModels = function(){ return initServerModels(this) };
    this.ClientModels = function(){ return initClientModels(this) };
    this.API = function(){ return initAPIHandler(this) };
    if(cb){
        cb(this);
    }
    return this;
};

function initAPIHandler(jdms){
    return function processRequest(request, session){
        return {};
    };
}

function initClientModels(jdms) {
    return {Demo: function Demo(){}};
}

function initServerModels(jdms) {
    return {Demo: function Demo(){}};
}

function syncModels(jdms) {
    
}

exports.JDMS = JDMS;
