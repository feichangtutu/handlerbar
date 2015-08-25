var a = 1;
var currentIndex = 0;
$(document).on("touchmove", function (a) {
    a.preventDefault()
}),
$.fn.pageSlider = function () {
    for (var b = this, c = {length: b.length},
     d = {
        next: function () {

            if (currentIndex + 1 < c.length) {
                var a = b[currentIndex];
                $(a).removeClass("slidedown in").addClass("slidedown out reverse");
                currentIndex++;
                $(b[currentIndex - 1]).trigger("leave");
                $(b[currentIndex]).trigger("enter");
            }
        },
        prev: function () {
            if (currentIndex > 0) {
                var a = b[currentIndex - 1];
                $(a).removeClass("slidedown out reverse").addClass("slidedown in");
                currentIndex--;
                $(b[currentIndex + 1]).trigger("leave");
                $(b[currentIndex]).trigger("enter");
            }
        }
    },
    e = c.length - 1; e >= 0; e--)$(b[e]).css("z-index", a + c.length - e);
    b.css("visibility", "visible");
    //b.on("swipeDown", function () {
    //    d.prev()
    //});
    //TODO bug 快速触动点到上一页面 100%逃出 解决方法:效果开始后注销事件
    //$(b[0]).on("swipeUp", function () {
    //    d.next()
    //});
    //$(b[1]).on("swipeUp", function () {
    //    d.next()
    //}).on("swipeDown", function () {
    //    d.prev()
    //});
    //$(b[2]).on("swipeUp", function () {
    //    d.next()
    //}).on("swipeDown", function () {
    //    d.prev()
    //});
    //$(b[3]).on("swipeUp", function () {
    //    d.next()
    //}).on("swipeDown", function () {
    //    d.prev()
    //});
    //$(b[4]).on("swipeUp", function () {
    //    d.next()
    //}).on("swipeDown", function () {
    //    d.prev()
    //});
    //$(b[5]).on("swipeDown", function () {
    //    d.prev()
    //});


    return this;
}