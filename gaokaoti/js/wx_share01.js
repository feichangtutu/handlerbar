document.addEventListener('WeixinJSBridgeReady', function() {

    var shareUrl = "http://go.sohu.com/2015/h5/0625/index.html";
    var sharePic = 'http://go.sohu.com/2015/h5/0625/images/share.png';
    var shareTitle;
    var shareText = '爸妈邦量身定制妈妈高考题';
    if(!!zongfen){
        if(zongfen<=60){
            shareTitle = "我在妈妈高考中得到了"+zongfen+"分，属于菜鸟妈妈，你也来试试！";
        }else if(zongfen>=60&&zongfen<80){
            shareTitle = "我在妈妈高考中得到了"+zongfen+"分，属于新手妈妈，你也来试试！";
        }else if(zongfen>=80&&zongfen<90){
            shareTitle = "我在妈妈高考中得到了"+zongfen+"分，你也来试试！";
        }else if(zongfen>=90&&zongfen<=100){
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