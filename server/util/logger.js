/**
 * logger , 创建log实例
 * 日志循环写，每天1个最多3个
 *
 * Created by zhanghongqing on 2018/6/29.
 */
const bunyan = require('bunyan');                       // 引用日志组件


/**
 * 获取log实例
 * @param  {string}     name    日志名称，同时用于日志文件名
 * @return {object}             日志对象
 */
module.exports = function(name){
    const log = bunyan.createLogger(
        {
            name: name,
            streams: [
                // 输出到控制台
                {level: 'info', stream: process.stdout},
                // 循环输出到文件
                {level: 'info', path: 'server/logs/'+name+'.log',type: 'rotating-file',period: '1d',count: 3}
            ]
        });

    return log;
};