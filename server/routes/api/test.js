module.exports = function(router){
    router.get('/hello', async(ctx)=>{
        console.log('hello');
        ctx.body = {"name":"hello"};
    });

    router.post('/world', async(ctx)=>{
        console.log(ctx.request.body, typeof ctx.request.body);
    });
};