# restify-routes-loader

Load routes one by one or in bulk:

```javascript
import server from 'restify';
import routeLoader from 'restify-routes-loader';

const handler = (req, res) {
  res.send(200);
}

const routes = [
  {
    name: 'indexRoute',
    path: '/',
    handlers: {
      get: handler,
      post: handler,
    },
  },
  {
    name: 'secondRoute',
    path: '/second',
    handlers: {
      get: handler,
    },
  },
];

const server = restify.createServer();
routeLoader(server).load(routes);
server.listen(3000);

export default indexRoute;
```
