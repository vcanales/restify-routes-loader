'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// receives the server object and provides route-related utilities
var Routes = function Routes(server) {
  var methods = ['get', 'post', 'put', 'delete', 'options'];
  return Object.create({
    load: function load(route) {
      var loadRoute = function loadRoute(r) {
        var name = r.name,
            path = r.path,
            version = r.version,
            handlers = r.handlers;

        Object.keys(handlers).forEach(function (method) {
          if (methods.indexOf(method) > -1) {
            var handler = handlers[method];
            var routeObject = { name: name, path: path, version: version };
            server[method](routeObject, handler);
          }
        });
      };

      if (Array.isArray(route)) {
        return route.forEach(function (r) {
          return loadRoute(r);
        });
      }
      return loadRoute(route);
    }
  });
};

exports.default = Routes;