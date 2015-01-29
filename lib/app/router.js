var methods = ['get', 'post', 'put', 'patch', 'delete', 'connect', 'options', 'trace', 'copy', 'lock', 'mkcol', 'move', 'propfind', 'proppatch', 'unlock', 'report', 'mkactivity', 'checkout', 'merge'];
var pathToRegx = require('path-to-regexp');

function Router() {
    this.routes = {};
}

//add a route rull to routes
Router.prototype.add = function(method, route, handler) {

    var regx;

    if (typeof handler !== 'function') {
        throw ('handler must be a function')
    };

    if (!this.routes[method]) {
        this.routes[method] = [];
    };

	var keys = [];
    regx = pathToRegx(route,keys);
    this.routes[method].push({
        'regx': regx,
        'handler': handler,
        'keys':keys
    })

}

//match route with the routes
Router.prototype.match = function(method, url) {
    var routes = this.routes,route;
    var result = {
    	"params":undefined,
    	"handler":undefined
    }
    if (!routes[method]) {
        return null
    } else {
        routes = this.routes[method];
        result.params = {};
        for (var i = 0; i < routes.length; i++) {
        	route = routes[i];
            var re = route.regx.exec(url);
        	if (re) {
                var keys = route.regx.keys;
                for (var j = 0 ; j < keys.length ; j++){
                    result.params[keys[j].name] = re[j+1];
                }
                result.handler = route.handler;
                break;
            };
        };
    }

    return result;
}

//add handler of urls of the method
function createMethodHandler(method) {
    method = method.toUpperCase();
    return function() {
        for (var i = 0; i < arguments.length - 1; i++) {
            this.add(method, arguments[i], arguments[arguments.length - 1]);
        };
    }
}

//add prototype method
methods.forEach(function(method, index) {
    Router.prototype[method] = createMethodHandler(method);
})

//expose the router
module.exports = function(cb) {

    var router = new Router();

    if (typeof cb === 'function') {
        cb(router);
    };

    return function (req,res,next) {

        var result = router.match(req.method, req.url);

        if (result && result.handler) {
            req.route = result.route;
            req.params = result.params;
            result.handler(req, res, next);
        } else {
            req.route = undefined;
            req.params = {};
            next();
        }
    }
}
