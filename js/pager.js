/*
* 基于jQuery的pager分页插件
* @requires jQuery v1.2.6 or later
* 版本 0.0.1
* 1. 可定制css
* 2. 可通过buttonNum参数，指定显示多少个按钮(推荐奇数个)
* @ppc
* ---------->CSS<-----------
* #pager
* .pager-container
* .pager-message
* .pager-message-num
* .pager-list
* .pager-number
* .pager-current

* .pager-first
* .pager-last
* .pager-next
* .pager-previous

* .pager-disable
*/

var CLASS_CONTAINER = 'pager-container';
var CLASS_MESSAGE = 'pager-message';
var CLASS_MESSAGE_NUM = 'pager-message-num';
var CLASS_LIST = 'pager-list';
var CLASS_NUMBER = 'pager-number';
var CLASS_CURRENT = 'pager-current';
var CLASS_FIRST = 'pager-first';
var CLASS_LAST = 'pager-last';
var CLASS_NEXT = 'pager-next';
var CLASS_PREV = 'pager-previous';
var CLASS_DISABLE = 'pager-disable';

(function($) {
    $.fn.pager = function(options) {
        var options = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {
            // 先清空原元素
            $(this).empty();
            $(this).addClass(CLASS_CONTAINER);
            $(this).append(renderMessage(
                options.pageNum,
                options.pageCount,
                options.pageSize,
                options.recordCount
            ));
            $(this).append(renderPagerList(
                options.pageNum,
                options.pageCount,
                options.callBack,
                options
            ));
        });
    }

    // 渲染message
    function renderMessage(pageNum, pageCount, pageSize, recordCount) {
        var $message = $('<div class=' + CLASS_MESSAGE + '></div>');
        var $messageInfo = '共<i class=' + CLASS_MESSAGE_NUM + '>'
            + recordCount + '</i>'
            + '条记录，当前显示第&nbsp;' + '<i class='
            + CLASS_MESSAGE_NUM + '>' + pageNum
            + '</i>' + '&nbsp;页';

        $message.append($messageInfo);
        return $message;
    }

    // 渲染pagerList
    function renderPagerList(pageNum, pageCount, callBack, options) {
        // 列表
        var $pagerList = $('<ul class=' + CLASS_LIST + '></ul>');
        /* ----> 特殊按钮 <---- */
        // first
        var firstEnable = pageNum <= 1 ? false : true;
        $pagerList.append(renderButton(CLASS_FIRST, options.firstText, 1, callBack, firstEnable));
        // prev
        var prevEnable = firstEnable;
        $pagerList.append(renderButton(CLASS_PREV, options.prevText, pageNum - 1, callBack, prevEnable));

        /* ----> 数字按钮 <---- */
        var startNum = 1;
        var endNum = options.buttonNum;
        var midNum = parseInt(endNum / 2);


        if (pageNum > midNum) {
            startNum = pageNum - midNum;
            endNum = pageNum + midNum;
        }

        if (endNum > pageCount) {
            startNum = pageCount - (options.buttonNum - 1);
            endNum = pageCount;
        }

        if (startNum < 1) {
            startNum = 1;
        }

        for (var page = startNum; page <= endNum; page++) {
            var enable = page == pageNum ? false : true;
            var btnClass = enable ? CLASS_NUMBER : CLASS_CURRENT;
            var button = renderButton(btnClass, page, page, callBack, enable);
            $pagerList.append(button);
        }

        // next
        var nextEnable = pageNum >= pageCount ? false : true;
        $pagerList.append(renderButton(CLASS_NEXT, options.nextText, pageNum + 1, callBack, nextEnable));
        // last
        var lastEnable = nextEnable;
        $pagerList.append(renderButton(CLASS_LAST, options.lastText, pageCount, callBack, lastEnable));

        return $pagerList;
    }

    // 渲染按钮
    function renderButton(buttonClass, buttonText, pageNum, callBack, enable) {
        var enable = enable == false ? false : true;
        var $button = $('<li class=' + buttonClass + '></li>');

        var $buttonContent = $('<a href="javascript:;"><span>' + buttonText + '</span></a>');
        $button.append($buttonContent);

        if (!enable) {
            $button.addClass(CLASS_DISABLE);
        } else {
            $button.click(function() {
                callBack(pageNum);
            });
        }
        return $button;
    }


    // 默认参数
    $.fn.pager.defaults = {
        buttonNum: 5,
        pageNum: 1,
        pageCount: 1,
        recordCount: 0,
        nextText: '',
        prevText: '',
        firstText: '首页',
        lastText: '尾页'
    };

})(jQuery);





