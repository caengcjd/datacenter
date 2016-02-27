const echarts = require('echarts');
require('echarts/chart/line.js');

module.exports = function loadEchart(dom, options) {
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
                    // formatter: function (text) {
                    //     return text + '日';
                    // },
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
