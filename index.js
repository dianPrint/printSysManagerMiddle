
const Koa = require('koa');
const app = new Koa();
const apiRouters = require('./api');
// response


app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      err.status = err.statusCode || err.status || 500;
      throw err;
    }
  });

app.use(apiRouters.routes());

app.listen(3000);
// const client = new Client({
//     user: 'guhao',
//     host: '127.0.0.1',
//     database: 'public_services',
//     password: 'guhao',
//     port: 5432,
// })

// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
