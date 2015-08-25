/**
 *删除数组指定下标或指定对象
 */
Array.prototype.remove=function(obj){
    for(var i =0;i <this.length;i++){
        var temp = this[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <this.length;j++){
                this[j]=this[j+1];
            }
            this.length = this.length-1;
        }
    }
}
//TODO 页面替换图片 调整布局
//TODO 文案 分享图片替换
$(function(){
    var zongfen = 0;
    var wrongnum = 0;
    var questioncount = 0;
    var wronglib = new Array();
    //TODO 启动+通用配置模块
    var b = $(".slide-page").pageSlider();


    //TODO 单页面控制模块
    var slidePage = $(".slide-page");

    $(slidePage[21]).on("enter", function () {
        $("#score").text(zongfen);
        $("#errorNumber").text(wrongnum);
        var resolveTemplate = Handlebars.compile($("#resolve-template").html());
        $("#resolve").html(resolveTemplate(requestData));
    }).on("leave",function(){
        //$(this).find(".slogan01").removeClass("sloganFadeRight");
        //$(this).find(".slogan02").removeClass("sloganFadeDown");
        //$(this).find(".slogan03").removeClass("sloganFadeLeft");
    })

    //TODO 一般click事件模块
    $("#resolveBtn").on("click",function(){
        $("#titleResult").remove();
        $(this).remove();
        var resolveTemplate = Handlebars.compile($("#resolve-template").html());
        $("#resolve").html(resolveTemplate(requestData));
    });
    $("#testButton").on("click",function(){
        handlenext(1,2,false);
    });
    $("#submit").on("click",function(){
        if(questioncount<20){
            alert("最后一题放弃了吗？")
            return;
        }
        //handlenext(21,22,false);
        var urlData = {
            scorepackage:{
                zongfen:zongfen,
                wrongnum:wrongnum
            },
            wronglib:wronglib
        };
        //var urlData = {
        //    scorepackage:{
        //        zongfen:zongfen,
        //        wrongnum:wrongnum
        //    },
        //    requestData:requestData
        //};
        var datastr = encode64(JSON.stringify(urlData));
        location.href = "score.html?requestData="+datastr;

    });
    $(".backBtn").on("click",function(){
        var $curBtn = $(this);
        var curClass = $curBtn.parent().parent().attr("class");
        var curPage = parseInt(curClass.substring(curClass.indexOf("step")+4,(curClass.indexOf("step")+6)));
        handlenext(curPage,curPage-1,false);
    });
    //答题逻辑-正确的题目类名为cq 其他的一概为错误 正确的向下页翻 错误的弹出对话框
    $(".txt>ul>li").on("click",function(){
        var $curli = $(this);
        $curli.parent().find("li").removeClass("chosen");
        $curli.addClass("chosen");
        var curClass = $curli.parent().parent().parent().parent().attr("class");
        var curClassLength = curClass.length;
        var curTitle = $curli.parent().parent().attr("index");
        var curPage = parseInt(curClass.substring(curClass.indexOf("step")+4,(curClass.indexOf("step")+6)));
        var curQuestion = requestData.question_bank[curTitle];
        if(!!$curli.attr("class")&&$curli.attr("class").indexOf("cq")!=-1){
            if(zongfen<100&&!curQuestion.result)zongfen = zongfen+5;
            curQuestion.result = true;
            wronglib.push(curTitle);
        }else{
            if(zongfen>0&&curQuestion.result)zongfen = zongfen-5;
            curQuestion.result = false;
            if(wronglib.length>0)wronglib.remove(curTitle);
            wrongnum = wrongnum+1;
        }
        if(curTitle!=19){
            handlenext(curPage,curPage+1,false);
        }
        if(!curQuestion.isAnswer){
            questioncount = questioncount+1
            curQuestion.isAnswer = true;
        };

    });
    //分享到微博
    var shareToWB = function(shareTitle,shareUrl,sharePic){
        window.open('http://www.jiathis.com/send/?webid=tsina&url=' + shareUrl + '&title=' + encodeURIComponent(shareTitle) +  '&pic=' + sharePic,"_blank");
        aftershare();
    }
    //页面手动跳转
    var handlenext = function(targetPageIndex,nextpage,isCut) {
        var pages = $(".slide-page");
        var targetPageIndex = targetPageIndex;
        for(var i=0;i<targetPageIndex;i++){
            $(pages[i]).addClass("slidedown out reverse");
        }
        var nextPageStr = nextpage.toString();
        nextpage.toString().length==2?nextPageStr:nextPageStr = "0"+ nextPageStr;
        $(".step"+nextPageStr).removeClass("slidedown out reverse").addClass("active").trigger("enter");
        currentIndex = targetPageIndex;
        if(isCut)currentIndex--
    }

    var getImgUrl = function(src) {
        var img = new Image();
        img.src = src;
        return img.src;
    }

    function aftershare(){
        //$("#shadeCanvas").hide();
        $("#sharehelp").hide();
        choujiang();
        canvasSwitch = true;
    }
    document.addEventListener('WeixinJSBridgeReady', function() {

        var shareUrl = "http://go.sohu.com/2015/h5/0625/index.html";
        var sharePic = 'http://go.sohu.com/2015/h5/0625/images/share.png';
        var shareTitle;
        var shareText = '爸妈邦量身定制妈妈高考题';
        if(!!zongfen){
            if(zongfen<=60){
                shareTitle = "我在妈妈高考中得到了"+zongfen+"分，属于菜鸟妈妈，你也来试试！";
            }else if(zongfen>60&&zongfen<=80){
                shareTitle = "我在妈妈高考中得到了"+zongfen+"分，属于新手妈妈，你也来试试！";
            }else if(zongfen>80&&zongfen<=90){
                shareTitle = "我在妈妈高考中得到了"+zongfen+"分，你也来试试！";
            }else if(zongfen>90&&zongfen<=100){
                shareTitle = "我在妈妈高考中得到了"+zongfen+"分，你也来试试！";
            }
        }else{
            shareTitle = '妈妈高考';
        }

        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": sharePic,
                "img_width": "120",
                "img_height": "120",
                "link": shareUrl,
                "desc": shareText,
                "title": shareTitle
            }, function(res) {

            })
        });

        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": sharePic,
                "img_width": "120",
                "img_height": "120",
                "link": shareUrl,
                "desc": shareText,
                "title": shareTitle
            }, function(res) {

            });
        });

        // 分享到微博;
        WeixinJSBridge.on('menu:share:weibo', function(argv) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content": shareText + ' ' + shareUrl ,
                "url": shareUrl
            }, function(res) {

            });
        });
    }, false);
})


