// receives the server object and provides route-related utilities
const Routes = function Routes(server) {
  const methods = ['get', 'post', 'put', 'delete', 'options'];
  return Object.create({
    load(route) {
      const loadRoute = obj => Object.keys(obj).forEach((method) => {
        const { name, path, version } = obj[method];
        if (methods.indexOf(method) > -1) {
          const { handler } = obj[method];
          const routeObject = { name, path, version };
          server[method](routeObject, handler);
        }
      });

      if (Array.isArray(route)) {
        return route.forEach(r => loadRoute(r));
      }
      return loadRoute(route);
    },
  });
};

export default Routes;
