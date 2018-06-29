/**
 * koa app
 *
 * Created by zhanghongqing on 2018/6/28.
 */
const Koa = require('koa');                             // 引用koa框架
const consuming = require('./middleware/consuming');    // 加载计算耗时中间件
const logger = require('./common/logger');              // 引用日志组建
const loader = require('./routeloader');                // 路由加载器


const app = new Koa();                                  // 创建koa实例化
const log = logger('app');                              // 日志

app.use(consuming);                                     // 计算耗时中间件
app.use(loader.routes()).use(loader.allowedMethods());  // 加载路由


let port = 3000;
app.listen(port);                                       // 启动http服务

log.info({port:port},'patent v5.0 service is starting at port 3000');