

///////////////
// topList.js //
///////////////

/* ------------------------------------------------------------
 * 依赖模块
 * ------------------------------------------------------------ */


 require('./css/bootstrap.min.css');
 require('./css/animation.css');
 require('./css/base.css');
 require('./css/bootstrap-select.css');
 require('./css/topList.css');

require('./js/dropdown.js');
require('./js/bootstrap-select.js');
require('./js/jquery.waypoints.min.js');
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
 * monmon function
 * ------------------------------------------------------------ */


/* ------------------------------------------------------------
 * 加载app列表
 * ------------------------------------------------------------ */

// $(function () {
//     var appName = getAppName();
//     $('#appName').html(appName);
//     $.when( $.ajax( 'http://121.196.228.76/dc/search/' + appName))
//     .then(function( data, textStatus, jqXHR ) {
//       console.log(data);
//       const source = $('#app-template').html();
//       const source2 = $('#word-template').html();
//       const source3 = $('#title-template').html();
//       const template = Handlebars.compile(source);
//       const template2 = Handlebars.compile(source2);
//       const template3 = Handlebars.compile(source3);
//       $('.card-list').html(template(data.rank));
//       $('.word-table').html(template2(data.word));
//       $('.title').html(template3(data));
//       scrollSpyCards();
//     });
// })

/* ------------------------------------------------------------
 * 初始化select
 * ------------------------------------------------------------ */

$(function () {
    $('.selectpicker').selectpicker({
      style: 'btn-default',
      width: '100px'
    });
})
/* ------------------------------------------------------------
 * jQuery滚动监听
 * ------------------------------------------------------------ */

function scrollSpyCards() {
    $('.card').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).addClass('animation-slide-up');
        }
    }, {offset: '80%'});
    $('#footer').waypoint(function(direction) {
        if (direction === 'down') {
            $('#footer').addClass('animation-slide-up');
        }
    }, {offset: '80%'});
}
