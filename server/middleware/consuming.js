/**
 * 记录一次请求的耗时情况
 *
 * Created by zhanghongqing on 2018/6/28.
 */

const bunyan = require('bunyan');       // 引用日志组件

const log = bunyan.createLogger(
    {
        name: 'time-consuming',
        streams: [
            // 输出到控制台
            {level: 'info', stream: process.stdout},
            // 循环输出到文件
            {level: 'info', path: 'server/logs/time-consuming.log',type: 'rotating-file',period: '1d',count: 3}
        ]
    });

module.exports = async function(ctx, next){
    const start = Date.now();               // 开始时间
    await next();
    const ms = Date.now() - start;          // 计算耗时

    log.info({'type':'consuming','path':ctx.path,'consuming':ms},'请求耗时：[' + ms + '] 毫秒');
};