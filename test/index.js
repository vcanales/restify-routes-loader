import tape from 'tape';
import routeLoader from '../src';

tape('routeLoader', (test) => {
  const fakeServer = function fakeServer() {
    return {
      count: 0,
      getRoute: {},
      postRoute: {},
      get(obj) {
        this.getRoute = obj;
        this.count += 1;
      },
      post(obj) {
        this.postRoute = obj;
        this.count += 1;
      },
    };
  };
  const singleRouteServer = fakeServer();
  const multipleRouteServer = fakeServer();

  const handler = (req, res) => {
    res.send(200);
  };

  const route = {
    get: {
      name: 'index',
      path: '/',
      handler,
    },
    post: {
      name: 'another',
      path: '/',
      handler,
    },
  };
  const routes = [
    route,
    {
      get: {
        name: 'secondRoute',
        path: '/second',
        handler,
      },
    },
  ];

  routeLoader(singleRouteServer).load(route);

  test.equals(singleRouteServer.getRoute.name,
    route.get.name, 'should set single route name');
  test.equals(singleRouteServer.getRoute.path,
    route.get.path, 'should set single route path');

  routeLoader(multipleRouteServer).load(routes);

  test.equals(multipleRouteServer.getRoute.name,
    routes[1].get.name, 'get route should be the latest defined');

  const count = Object.keys(route).length + 1;
  test.equals(multipleRouteServer.count, count,
    'should run once per defined method');

  test.end();
});
