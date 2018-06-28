/**
 * 加载指定文件夹下的router
 *
 * copy from yanggang by zhanghongqing on 2018/6/28.
 */
const fs = require('fs');
const path = require('path');
const bunyan = require('bunyan');                       // 引用日志组件
const Router = require('koa-router');                   // 引用路由模块

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



const loader = function (loadPath) {
    var walk = function(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) results = results.concat(walk(file));
            else results.push(file);
        });
        return results;
    };
    var files =  walk(loadPath);

    for (var i in files){
        var file = path.resolve(loadPath , files[i]);

        if (fs.statSync(file).isFile() &&
            path.extname(file).toLowerCase() == '.js' &&
            path.basename(file).substr(0,1) != '.'){
            try {
                require(file)(router);
            } catch(e) {
                throw new Error("Error when loading route file "+file);
            }
        }
    }
    return router;
};

module.exports = Router;