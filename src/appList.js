

///////////////
// appList.js //
///////////////

/* ------------------------------------------------------------
 * 依赖模块
 * ------------------------------------------------------------ */


 require('./css/bootstrap.min.css');
 require('./css/animation.css');
 require('./css/base.css');
 require('./css/appList.css');

require('./js/dropdown.js');
require('./js/tooltip.js');
require('./js/jquery.waypoints.min.js');
const Handlebars = require('handlebars');
require('./js/base.js');


/* ------------------------------------------------------------
 * handlebars helpers
 * ------------------------------------------------------------ */
 Handlebars.registerHelper('arrayLength', function(value) {
   return value ? value.length : 0;
 });


 Handlebars.registerHelper('inc', function(value, options)
 {
     return parseInt(value) + 1;
 });


/* ------------------------------------------------------------
 * monmon function
 * ------------------------------------------------------------ */

function getAppName() {
    var search = window.location.search.slice(1);
    var querys = search.split('&');
    var urlParams = {};
    querys.forEach(function (query) {
        var arr = query.split('=');
        urlParams[arr[0]] = arr[1];
    });
    return urlParams.app;
}


/* ------------------------------------------------------------
 * 加载app列表
 * ------------------------------------------------------------ */

$(function () {
    var appName = getAppName();
    var pager = 1;
    $('#appName').html(appName);
    $.when( $.ajax( 'http://121.196.228.76/dc/search/' + appName))
    .then(function( data, textStatus, jqXHR ) {
      console.log(data);
      const source = $('#app-template').html();
      const source2 = $('#word-template').html();
      const source3 = $('#title-template').html();
      const template = Handlebars.compile(source);
      const template2 = Handlebars.compile(source2);
      const template3 = Handlebars.compile(source3);
      console.log();
      $('.card-list').append(template(data.rank));
      $('.word-table').html(template2(data.word));
      $('.title').html(template3(data));
      scrollSpyCards();
      pager ++;
    });


    $('.next-page').on('click', loadAppList);

    function loadAppList() {
        $.when( $.ajax( 'http://121.196.228.76/dc/search/' + appName + '/' + pager))
        .then(function( data, textStatus, jqXHR ) {
          const source = $('#app-template').html();
          const template = Handlebars.compile(source);
          $('.card-list').append(template(data.rank));
          scrollSpyCards();
          pager ++;
        });
    }


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
    $('.next-page').waypoint(function(direction) {
        if (direction === 'down') {
            $('.next-page').addClass('animation-slide-up');
        }
    }, {offset: '100%'});
    $('#footer').waypoint(function(direction) {
        if (direction === 'down') {
            $('#footer').addClass('animation-slide-up');
        }
    }, {offset: '100%'});
}
