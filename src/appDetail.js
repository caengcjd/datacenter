

///////////////
// appDetail.js //
///////////////

/* ------------------------------------------------------------
 * 依赖模块
 * ------------------------------------------------------------ */


 require('./css/bootstrap.min.css');
 require('./css/animation.css');
 require('./css/base.css');
 require('./css/appDetail.css');

require('./js/tab.js');
require('./js/tooltip.js');
require('./js/jquery.waypoints.min.js');
var Handlebars = require('handlebars');
require('./js/base.js');
var loadEchart = require('./js/loadEchart.js');

/* ------------------------------------------------------------
 * handlebars helpers
 * ------------------------------------------------------------ */


 Handlebars.registerHelper('inc', function(value, options)
 {
     return parseInt(value) + 1;
 });

Handlebars.registerHelper('date', function (value, options) {
    return convertDate(value, 'YYYY-MM-DD');
});

Handlebars.registerHelper('file', function (value, options) {
    return countFileSize(value);
});

Handlebars.registerHelper('description', function (value, options) {
   return new Handlebars.SafeString('<li><span>' + value.replace(/(\n)+/g, '<li><span>'));
});

 /* ------------------------------------------------------------
  * monmon function
  * ------------------------------------------------------------ */

 function getAppID() {
     var search = window.location.search.slice(1);
     var querys = search.split('&');
     var urlParams = {};
     querys.forEach(function (query) {
         var arr = query.split('=');
         urlParams[arr[0]] = arr[1];
     });
     return urlParams.id || null;
 }

 /* 文件大小转换为MB GB KB格式 */
 function countFileSize(size) {
 	var fsize = parseFloat(size, 2);
 	var fileSizeString;
 	if (fsize < 1024) {
 		fileSizeString = fsize.toFixed(2) + "B";
 	} else if (fsize < 1048576) {
 		fileSizeString = (fsize / 1024).toFixed(2) + "KB";
 	} else if (fsize < 1073741824) {
 		fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
 	} else if (fsize < 1024 * 1024 * 1024) {
 		fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
 	} else {
 		fileSizeString = "0B";
 	}
 	return fileSizeString;
 }

 function convertDate(timestamp, formate) {
     var date  = new Date(timestamp);
     var	year  = date.getFullYear(),
         month = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours(),
         minute= date.getMinutes(),
         second= date.getSeconds();


     return dateStr = formate
          .replace(/Y+/, year)
          .replace(/M+/, month)
          .replace(/D+/, day)
          .replace(/h+/, hour)
          .replace(/m+/, minute)
          .replace(/s+/, second);
 }


 function showEchart(dom, appid, word) {
    if (dom.html()) {
        ajaxGetasoHistory(appid, word)
            .then(formateasoHistory)
            .then(function(data) {
                data.type = 'line';
                data.title = '近7日在“daily”的搜索结果中排名趋势';
                loadEchart(dom[0], data);
            });
    }
}

/* 渲染模版 */
 function renderHandleBars(template, context, parent) {
     const appHtml = template.html();
     const appTemplate = Handlebars.compile(appHtml);
     parent.append(appTemplate(context));
 }

 /* tooltop提示框 */
  function initToolTop() {
      $('[data-toggle="tooltip"]').tooltip({
          container: 'body',
      });
  }

/* ------------------------------------------------------------
 * 加载app
 * ------------------------------------------------------------ */

$(function () {
    var appID = getAppID();
    if (!appID) return false;
    ajaxGetasoInfo(appID)
        .then(function ( data, textStatus, jqXHR ) {
            renderHandleBars($('#app-intro-template'), data.app, $('#app-intro'));
            renderHandleBars($('#app-detail-template'), data.app, $('#appDetail'));
            return ajaxGetasoPassword(appID);
            // showEchart($('#chart-1'), 414478124, 'weibo微博');
        })
        .then(function functionName(data) {
            renderHandleBars($('#app-keywords-template'), data.appRanks, $('#appKeywords-tbody'));
            initToolTop();
        });
})


/* ------------------------------------------------------------
 * ajax请求
 * ------------------------------------------------------------ */

/* 获取一个App详情 */
function ajaxGetasoInfo(appid) {
    return $.when($.ajax('http://121.196.228.76/dc/search/' + appid));
}

/* 获得app关键词列表 */
function ajaxGetasoPassword(appid) {
    return $.when($.ajax('http://121.196.228.76/dc/app/appasoword/' + appid));
}

/* 获取一个App对应的关键词的历史数据 */
function ajaxGetasoHistory(appid, word) {
    return $.when($.ajax('http://121.196.228.76/dc/app/appasohistory/' + appid + '?word=' + word));
}
/* 格式化历史数据 */
function formateasoHistory(data) {
    var result = {};
    result.xAxisList = data.sort(function(a,b){
        return a.x * 1 > b.x * 1;
    }).map(function (value) {
        return convertDate(value.x, 'YYYY-MM-DD');
    });
    result.yAxisList = data.map(function (value) {
        return value.y;
    })

    return result;
}
