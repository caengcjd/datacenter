(function ($) {
    function RotateHeads() {
        this.number = 0;
        this.index = 1;
        this.target = null;
        this.height = 0;
    }

    var isIE = (function (){
        return ("ActiveXObject" in window);
    })();

    RotateHeads.prototype = {
        _attachPlugin: function (target, options) {
            var target = this.target = $(target); //匹配的对象
            var pages = target.find('.page');
            var box = target.children('.box');
            var height = this.height = pages.height(); //每一页的高
            var number = this.number = pages.length;
            var _instance = this;
            var counter = 0;
            var scale = this.scale = (3500 - height / 2) / 3500; //视距（屏幕后的视点到屏幕的距离）减去translatez除视距,求出3dbox的缩放比例
            if (!isIE) {
                target.css('transform', 'scale(' + scale + ',' + scale + ')');
            }
            options.forEach(function (value, index) {
                var img = $('<img class="header-img" />');
                img.attr('src', value);
                pages
                    .slice(index, index + 1)
                    .css('background-image', 'url(' + img.attr('src') + ')');

                img.load(function() {
                    counter ++;
                    if (counter === number) {
                        if (isIE) {
                            box.css('transform', 'translateY(0)');

                            pages.slice(0, 1)
                            .css('transform', 'translateY(0)')
                            .addClass('active')
                            .css('opacity', 1);
                            pages.slice(1, 2)
                            .css('transform', 'translateY(100%)')
                            .css('opacity', 1);
                        } else {
                            box.css('transform', 'perspective(3500px) rotateX(0)');
                            pages.slice(0, 1)
                            .css('transform', ' rotateX(0deg) translateZ(' + height / 2 + 'px)')
                            .addClass('active')
                            .css('opacity', 1);
                            pages.slice(1, 2)
                            .css('transform', ' rotateX(-90deg) translateZ(' + height / 2 + 'px)')
                            .css('opacity', 1);
                        }

                        _instance._addTimer();
                    }
                });
            })
        },


        _addTimer: function () {
            var _instance = this;
            var pre, now, next;

            window.setInterval(function () {
                if (_instance.index < _instance.number - 1) {
                    pre = _instance.index - 1;
                    now = _instance.index;
                    next = _instance.index + 1;
                    _instance.index ++;
                } else if (_instance.index === _instance.number - 1) {
                    pre = _instance.index - 1;
                    now = _instance.index;
                    next = 0;
                    _instance.index = _instance.number;
                } else if (_instance.index === _instance.number) {
                    pre = _instance.number - 1;
                    now = 0;
                    next = 1;
                    _instance.index = 1;
                }

                _instance._rotateHead(pre, now, next);
            }, 6500);
        },


        _setTransition: function(target) {
            target.css('transition', 'all 1.5s ease-out');
        },


        _clearTransition: function(target) {
            target.css('transition', 'none');
        },

        _rotateHead: function (pre, now, next) {
            var pages = this.target.find('.page');
            var rotate, prePage, nextPage;
            var box = this.target.children('.box');
            var _instance = this;
            prePage = pages.slice(pre, pre + 1).removeClass('active');
            nowPage = pages.slice(now, now + 1).addClass('active');
            nextPage = pages.slice(next, next + 1);
            this._setTransition(box);

            if (isIE) {
                box.css('transform', 'translateY(-100%)');
            } else {
                box.css('transform', 'perspective(3500px) rotateX(90deg)');
            }

            box.one('transitionend', function() {
                _instance._clearTransition(box);
                pages.css('opacity', 0);
                prePage.css('opacity', 1);
                nowPage.css('opacity', 1);
                nextPage.css('opacity', 1);

                if (isIE) {
                    box.css('transform', 'translateY(0)');
                    prePage.css('transform', 'translateY(-100%)');
                    nowPage.css('transform', 'translateY(0)');
                    nextPage.css('transform', 'translateY(100%)');
                } else {
                    box.css('transform', 'perspective(3500px) rotateX(0deg)');
                    prePage.css('transform', 'rotateX(90deg) translateZ(' + _instance.height / 2 + 'px)');
                    nowPage.css('transform', 'rotateX(0deg) translateZ(' + _instance.height / 2 + 'px)');
                    nextPage.css('transform', 'rotateX(-90deg) translateZ(' + _instance.height / 2 + 'px)');
                }

            });
        }

    }



    $.extend($.fn, {
        rotateHeads: function (options) {
            return this.each(function () {
                plugin._attachPlugin(this, options || {});
            });
        }
    })


    var plugin = new RotateHeads();
}(jQuery));
