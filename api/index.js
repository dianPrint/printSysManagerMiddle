const  Router = require('koa-router');
const business = require('../business');
const publicServicesRouter = new Router({
    prefix: '/publicServices'
  });
  publicServicesRouter.get('/users', async (ctx)=> {
    const users = await business.user.get();
    ctx.body = users;
  })
  module.exports= publicServicesRouter