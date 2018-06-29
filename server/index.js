/**
 * koa app
 *
 * Created by zhanghongqing on 2018/6/28.
 */

const path = require('path');                           // 基础库
const Koa = require('koa');                             // 引用koa框架
const bodyparser = require('koa-bodyparser');           // 加载bodyparser中间件
const static = require('koa-static');                   // 加载静态资源处理
const consuming = require('./middleware/consuming');    // 加载计算耗时中间件
const logger = require('./util/logger');                // 引用日志组建
const loader = require('./routeloader');                // 路由加载器
const config = require('./config/config');              // 加载配置文件


const app = new Koa();                                  // 创建koa实例化
const log = logger('app');                              // 日志

// 打一条屏显，活跃下气氛
app.use(async (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.on('error', (err, ctx) => {                         // 全局错误处理
    log.error(
        {
            title: err.toString(), stack: err.stack
        },
        'server error');
});

app.use(static(path.join(__dirname, '../public')));     // 处理静态资源
app.use(bodyparser());                                  // 使用ctx.body解析中间件
app.use(consuming);                                     // 计算耗时中间件
app.use(loader.routes()).use(loader.allowedMethods());  // 加载路由


app.listen(config.server.port);                         // 启动http服务

log.info({port: config.server.port}, 'patent v5.0 service is starting at port ' + config.server.port);