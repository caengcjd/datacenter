/////////////
// base.js //
/////////////



/* ------------------------------------------------------------
 * 公共依赖模块 ／ 公共函数
 * ------------------------------------------------------------ */
// function footerIsOverView() {
//     var clientHeight = window.innerHeight || document.documentElement.clientHeight;
//     var footerOffset = $('#footer').offset().top;
//     return footerOffset > clientHeight - $('#footer').height();
// }


/* ------------------------------------------------------------
 * google analytics
 * ------------------------------------------------------------ */
 require('autotrack');
 window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
 ga('create', 'UA-74094643-1', 'auto');
 ga('require', 'autotrack');
 ga('send', 'pageview');


/* ------------------------------------------------------------
 *	加载footer / 初始化footer
 * ------------------------------------------------------------ */
var footer = require('../tpl/footer.html');
$(function() {
    $('#footer').html(footer);
})

/* ------------------------------------------------------------
 *	加载navbar
 * ------------------------------------------------------------ */

var navbar = require('../tpl/navbar.html');
$(function() {
    $('#navbar').html(navbar);
})


/* ------------------------------------------------------------
 *  导航 下拉触发
 * ------------------------------------------------------------ */

$(function() {
    $(document).on('mouseenter', '.navbar .dropdown', function() {
        $(this).find('.dropdown-toggle').dropdown('toggle');
    })
    $(document).on('mouseleave', '.navbar .dropdown', function() {
        $(this).find('.dropdown-toggle').dropdown('toggle');
    })
})

/* ------------------------------------------------------------
 * 返回顶部
 * ------------------------------------------------------------ */
smoothScroll('.go-header', '#header');

function smoothScroll(btn, target) {
    var animationTime = 500;
    $(document).on('click', btn, function() {
        var position = $(target).offset().top;
        $('html, body').animate({
            scrollTop: position
        }, animationTime);
    })
}
