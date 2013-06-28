
function configure(options, onInit) {
    var options = options || {};
    Object.defineProperty(this, '_options', {configurable: false, enumerable: false, value: options, writable: true});
    Object.defineProperty(this, '_data', {configurable: false, enumerable: false, value: {}, writable: true});
    Object.defineProperty(this, '_initializationCallbacks', {configurable: false, enumerable: false, value: [], writable: true});
    if (this.onInit) {
        this.onInit(onInit);
    } else {
        addOnInit.call(this, onInit);
    }
    return this;
}

function injectContainers(obj, containers) {
    if (containers instanceof Array) {
        for (var i = 0; i < containers.length; i++) {
            if (!obj[containers[i]]) {
                obj[containers[i]] = {};
            }
        }
    }
}

function injectPrototypes(con, bonus) {
    Object.defineProperty(con.prototype, 'onInit', {enumerable: false});
    if (bonus) {
       if (bonus instanceof Array) {
            for (var i = 0; i < bonus.length; i++) {
                Object.defineProperty(con.prototype, bonus[i], {configurable: false, enumerable: false, value: Function, writable: true});
            }
       } else if (bonus instanceof Object) {
           for (var i in bonus) {
                Object.defineProperty(con.prototype, i, {configurable: false, enumerable: false, value: bonus[i], writable: true});
            }
       }
    } 
    con.prototype.onInit = addOnInit;
    return con;
}

function addOnInit(cbs) {
    if(cbs instanceof Array) {
        for(var c = 0; c < cbs.length; c++) {
            if (typeof cb == 'Function' ) {
                this._initializationCallbacks.push(onInit);
            }
        }
    } else if (typeof onInit == 'Function' ) {
        this._initializationCallbacks.push(onInit);
    }
}


exports.configure = configure;
exports.inject = injectPrototypes;
exports.containers = injectContainers;
