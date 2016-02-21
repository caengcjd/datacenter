

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

$(function () {
    // $.when( $.ajax( 'http://121.196.228.76/dc/search/' ))
    // .then(function( data, textStatus, jqXHR ) {
    // });


    function renderAppsByPage(data) {
        const appHtml = $('#app-template').html();
        const appTemplate = Handlebars.compile(appHtml);
        $('.card-list').append(appTemplate(data));
    }

})

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

$(function () {
    $('#footer').waypoint(function(direction) {
        if (direction === 'down') {
            $('#footer').addClass('animation-slide-up');
        }
    }, {offset: '80%'});
})
