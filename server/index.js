/**
 * koa app
 *
 * Created by zhanghongqing on 2018/6/28.
 */
const Koa = require('koa');                             // 引用koa框架
const bunyan = require('bunyan');                       // 引用日志组件
const Router = require('koa-router');                   // 引用路由模块

const load_api_router = require('./routes/api.js');

const consuming = require('./middleware/consuming');    // 加载计算耗时中间件

const log = bunyan.createLogger(
    {
        name: 'app',
        streams: [
            // 输出到控制台
            {level: 'info', stream: process.stdout},
            // 循环输出到文件
            {level: 'info', path: 'server/logs/app.log',type: 'rotating-file',period: '1d',count: 3}
        ]
    });

const app = new Koa();                                  // 创建 koa 实例化
app.use(consuming);                     // 计算耗时中间件

let router = new Router();
// 装载API路由
load_api_router(router);
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


let port = 3000;
app.listen(port);                       // 启动http服务
log.info({port:port},'patent v5.0 service is starting at port 3000');