/////////////
// base.js //
/////////////



/* ------------------------------------------------------------
 * 公共依赖模块 ／ 公共函数
 * ------------------------------------------------------------ */

var Handlebars = require('handlebars');


/* ------------------------------------------------------------
 * google analytics
 * ------------------------------------------------------------ */
// require('autotrack');
// window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
// ga('create', 'UA-74094643-1', 'auto');
// ga('require', 'autotrack');
// ga('send', 'pageview');



/* ------------------------------------------------------------
 * handlebars helpers
 * ------------------------------------------------------------ */
Handlebars.registerHelper('autocomplete', function(value, options) {
    var keyword = options.data.root.word;
    var regex = new RegExp(keyword);
    var content = value.replace(regex, '<strong>$&</strong>');
    return new Handlebars.SafeString(content);
});



/* ------------------------------------------------------------
 *	加载公共模版
 * ------------------------------------------------------------ */
var footer = require('../tpl/footer.html');
var navbar = require('../tpl/navbar.html');
var autocomplete = require('../tpl/autoComplete.html');
$(function() {
    $('#footer').html(footer);
    $('#navbar').html(navbar);
    $('body').append(autocomplete);
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
 * 搜索自动补全
 * ------------------------------------------------------------ */

$(function() {
    var isAutoComplete = false;
    $('.search-input').on('input', function() {
        var self = $(this);
        var searchTxt = self.val();
        $.when($.ajax('http://121.196.228.76/dc/search/suggestion/' + searchTxt))
            .then(function(data) {
                if (data) {
                    isAutoComplete = true;
                    var autocompleteHtml = $('#autocomplete-template').html();
                    var autocompleteTemplate = Handlebars.compile(autocompleteHtml);
                    $('.autocomplete-suggestions').html(autocompleteTemplate(data));
                    $('.autocomplete-suggestions').show();
                    setAutocompletePosition(self);
                    listenResize(self);
                }
            });
    })

    $(window).on('click.autocomplete', function () {
        if (!isAutoComplete) return;
        isAutoComplete = false;
        $('.autocomplete-suggestions').hide().html('');
        removeListenResize();
    })


    function removeListenResize() {
        $(window).off('resize.autocomplete');
    }

    function listenResize(self) {
        $(window).on('resize.autocomplete', function () {
            setAutocompletePosition(self);
        })
    }

    function setAutocompletePosition(self) {
        var rect = {
            width: self.outerWidth(),
            top: self.offset().top + self.outerHeight(),
            left: self.offset().left
        };

        $('.autocomplete-suggestions').css(rect);
    }
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
