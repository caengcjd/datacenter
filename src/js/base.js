/////////////
// base.js //
/////////////



/* ------------------------------------------------------------
 * 公共依赖模块 ／ 公共函数
 * ------------------------------------------------------------ */
require('autotrack');
// function footerIsOverView() {
//     var clientHeight = window.innerHeight || document.documentElement.clientHeight;
//     var footerOffset = $('#footer').offset().top;
//     return footerOffset > clientHeight - $('#footer').height();
// }


/* ------------------------------------------------------------
 * google analytics
 * ------------------------------------------------------------ */
$(function() {
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] ||
            function() {
                (i[r].q = i[r].q || []).push(arguments)
            },
            i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'http//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-74094643-1', 'auto');
    ga('require', 'autotrack');
    ga('send', 'pageview');
})


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
