

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
const Handlebars = require('handlebars');
require('./js/base.js');
const echarts = require('echarts');
require('echarts/chart/line.js');

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

/* ------------------------------------------------------------
 * 初始化Tooltip
 * ------------------------------------------------------------ */
 $(function () {
      $('[data-toggle="tooltip"]').tooltip({
          container: 'body',
      });
 })


/* ------------------------------------------------------------
 * 加载app
 * ------------------------------------------------------------ */

$(function () {
    var appID = getAppID();
    if (!appID) return false;
    $.when($.ajax('http://121.196.228.76/dc/search/' + appID))
        .then(function ( data, textStatus, jqXHR ) {
            var source = $('#app-intro-template').html();
            var source2 = $('#app-detail-template').html();

            var template = Handlebars.compile(source);
            var template2 = Handlebars.compile(source2);

            $('#app－intro').append(template(data.app));
            $('#appDetail').append(template2(data.app));
        });
})

/* ------------------------------------------------------------
 * ECharts
 * ------------------------------------------------------------ */

$(function () {
    var options = {
        title: '近7日在“daily”的搜索结果中排名趋势',
        type: 'line',
        xAxisList: [12, 13, 14, 15, 16, 17, 18, 19],
        yAxisList: [6, 11, 16, 21]
    };



    function loadEchart(dom, options) {
        var myChart = echarts.init(dom);

        const option = {
            title: {
                text: options.title,
                x: 'center',
            },
            tooltip: {
                show: true,
                formatter: function (obj) {
                    return '排名:' + obj.value;
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: options.xAxisList,
                    name: '日期',
                    axisLabel: {
                        show: true,
                        'interval': 0,
                        formatter: function (text) {
                            return text + '日';
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '排名',
                    axisLabel: {
                    },
                },
            ],
            series: [
                {
                    name: '排名趋势',
                    type: options.type,
                    data: options.yAxisList,
                    smooth:true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor : 'rgb(243, 187, 30)'
                            }
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'},
                        ],
                        effect: true,
                        itemStyle: {
                            normal: {
                                label: {
                                    formatter: function (obj) {
                                        return obj.value + '';
                                    },
                                },
                            },
                        },
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    formatter: function (obj) {
                                        return obj.value + '';
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        };

        myChart.setOption(option);
    }

    loadEchart($('#chart-1')[0], options);

})
