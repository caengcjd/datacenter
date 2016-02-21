

///////////////
// index.js //
///////////////

/* ------------------------------------------------------------
 * 依赖模块
 * ------------------------------------------------------------ */


 require('./css/bootstrap.min.css');
 require('./css/animation.css');
 require('./css/base.css');
 require('./css/index.css');

require('./js/dropdown.js');
require('./js/jquery.waypoints.min.js');
require('./js/base.js');


$(function () {
    $('#navbar-input').hide();
    setHeaderHeight();
    $(window).on('resize', function () {
        setHeaderHeight();
    })
})

function setHeaderHeight() {
    var width = $(window).width();
    if (width <= 1200) {
        width = 1200;
    }
    $('#header').height(width / 1.816585366);
}
