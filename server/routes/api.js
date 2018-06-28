const Router = require('koa-router');

module.exports = function(rootRouter){
    let router = new Router();
    router.get('/hello', async(ctx)=>{
        console.log('hello');
        ctx.body = {"name":"hello"};
    });

    router.get('/world', async(ctx)=>{
        ctx.body = {"name":"world"};
    });

    rootRouter.use('/api', router.routes(), router.allowedMethods());
};
