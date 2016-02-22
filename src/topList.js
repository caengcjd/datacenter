

///////////////
// topList.js //
///////////////

/* ------------------------------------------------------------
 * 依赖模块
 * ------------------------------------------------------------ */


 require('./css/bootstrap.min.css');
 require('./css/animation.css');
 require('./css/base.css');
 require('./css/topList.css');

require('./js/dropdown.js');
require('./js/jquery.waypoints.min.js');
require('./js/jquery.lazyload.js');
const Handlebars = require('handlebars');
require('./js/base.js');



/* ------------------------------------------------------------
 * handlebars helpers
 * ------------------------------------------------------------ */
 Handlebars.registerHelper('arrayLength', function(value) {
   return value.length;
 });


 Handlebars.registerHelper('inc', function(value, options)
 {
     return parseInt(value) + 1;
 });



/* ------------------------------------------------------------
 * 初始化加载流程
 * ------------------------------------------------------------ */

$(function () {
    var genres, types;
    $.when( $.ajax( 'http://121.196.228.76/dc/toplist/genres' )).then(function(data) {
        genres = data;
        return $.when( $.ajax( 'http://121.196.228.76/dc/toplist/types' ));
    }).then(function (data) {
        var genre = getGenreNameFromId(genres, urlParams.genre);
        var type = getTypeNameFromType(data, urlParams.type);
        types = data;
        renderHandleBars($('#selectpicker-template'), {
            genres: genres,
            types: types,
            urlParams: {genre: genre, type: type},
        }, $('.nav-select'));

        return ajaxApps(urlParams.type, urlParams.genre);
    }).then(function (data) {
        renderHandleBars($('#app-template'), data, $('.card-list'));
        lazyloadImage($('.card-list .card img'));
    });


    // 鼠标停留在二级菜单
    $(document).on('mouseenter', '.cascade', function () {
        $(this).find('.cascade-menu').show();
    });
    $(document).on('mouseleave', '.cascade',function () {
        $(this).find('.cascade-menu').hide();
    });
})


/* ------------------------------------------------------------
 * 公共函数 / 变量
 * ------------------------------------------------------------ */
 // 获得url参数
 var urlParams = (function () {
     var search = window.location.search.slice(1);
     var querys = search.split('&');
     var urlParams = {};
     querys.forEach(function (query) {
         var arr = query.split('=');
         urlParams[arr[0]] = arr[1];
     });

     return {
         genre: urlParams.genre || 36,
         type: urlParams.type || 'topfreeapplications'
     };
 }());

// 渲染app
 function renderHandleBars(template, context, parent) {
     const appHtml = template.html();
     const appTemplate = Handlebars.compile(appHtml);
     parent.append(appTemplate(context));
 }

// 请求app数据
function ajaxApps(genere, type) {
    return $.when($.ajax('http://121.196.228.76/dc/toplist/' + type + '/' + genere));
}

// 获得指定genre的名字
function getGenreNameFromId(genres, id) {
    var result;
    id = parseInt(id);
    genres.some(function (genre) {
        if (genre.id === id) {
            result = genre;
            return true;
        }
        if (genre.children) {
            genre.children.some(function (subgenre) {
                if (subgenre.id === id) {
                    result = subgenre;
                    return true;
                }
            })
        }

        if (result) {
            return true;
        }
    });

    return result;
}

// 获得type的名字
function getTypeNameFromType(types, keyword) {
    var result;
    types.some(function (prop) {
        if (prop.type === keyword) {
            result = prop;
            return true;
        }
    })

    return result;
}

// 懒加载图片
function lazyloadImage($element) {
    $element.lazyload();
}


/* ------------------------------------------------------------
 * jQuery滚动监听
 * ------------------------------------------------------------ */

$(function () {
    $('#footer').waypoint(function(direction) {
        if (direction === 'down') {
            $('#footer').addClass('animation-slide-up');
        }
    }, {offset: '80%'});
})
