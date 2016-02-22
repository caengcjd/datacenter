

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
 require('./js/base.js');

var Handlebars = require('handlebars');
var pager = 1;
var pagerOffset = 20;

/* ------------------------------------------------------------
 * handlebars helpers
 * ------------------------------------------------------------ */
 Handlebars.registerHelper('arrayLength', function(value) {
   return value ? value.length : 0;
 });


 Handlebars.registerHelper('appIndex', function(value, options)
 {
     return (pager - 1) * pagerOffset + (parseInt(value) + 1);
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
    var isLoaded = true;
    $('#appName').html(appName);
    $.when( $.ajax( 'http://121.196.228.76/dc/search/' + appName))
    .then(function( data, textStatus, jqXHR ) {
      console.log(data);
      if (data.type === 'app') {
          window.location.href = './appDetail.html?id=' + appName;
      }

      const appHtml = $('#app-template').html();
      const appsHtml = $('#apps-template').html();
      const suggestionHtml = $('#suggestion-template').html();
      const source2 = $('#word-template').html();
      const source3 = $('#title-template').html();
      const appTemplate = Handlebars.compile(appHtml);
      const appsTemplate = Handlebars.compile(appsHtml);
      const suggestionTemplate = Handlebars.compile(suggestionHtml);
      const template2 = Handlebars.compile(source2);
      const template3 = Handlebars.compile(source3);
      $('#cardList').append(appsTemplate(data.rank));
      $('.card-list').append(appTemplate(data.rank));
      $('.word-table').html(template2(data.word));
      $('#suggestions').html(suggestionTemplate(data.word));
      $('.title').html(template3(data));
      scrollSpyCards();
    });


    $(document).on('click', '.next-page', loadAppList);
    function loadAppList() {
        if (!isLoaded) return;
        isLoaded = false;
        pager ++;
        $.when( $.ajax( 'http://121.196.228.76/dc/search/' + appName + '/' + pager))
        .then(function( data, textStatus, jqXHR ) {
            const source = $('#app-template').html();
            const template = Handlebars.compile(source);
            $('.card-list').append(template(data.rank));
            scrollSpyCards();
            isLoaded = true;
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
