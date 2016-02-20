var fs = require('fs'),
    stat = fs.stat,
    path = require('path');

var src = path.resolve('./src/images');
var dist = path.resolve('./dist/images');

fs.mkdir( dist, function(){
    copyDir(src, dist);
});

function copyDir(src, dist) {
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }

        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dist = dist + '/' + path,
                readable, writable;

            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }

                if (st.isFile()) {
                    readable = fs.createReadStream( _src );
                    writable = fs.createWriteStream( _dist );
                    readable.pipe( writable );
                }
                else if( st.isDirectory() ){
                     exists( _src, _dist, copyDir );
                }

            })
        })

    })
}

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback && callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback && callback( src, dst );
            });
        }
    });
};
