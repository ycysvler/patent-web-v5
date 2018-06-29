/**
 * logger , 创建log实例
 *
 * Created by zhanghongqing on 2018/6/29.
 */
const bunyan = require('bunyan');                       // 引用日志组件

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