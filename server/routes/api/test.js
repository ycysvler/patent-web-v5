module.exports = function(router){
    router.get('/hello', async(ctx)=>{
        console.log('hello');
        ctx.body = {"name":"hello"};
    });

    router.get('/world', async(ctx)=>{
        ctx.body = {"name":"world"};
    });
};