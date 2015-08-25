document.addEventListener('WeixinJSBridgeReady', function() {

    var shareUrl = "http://go.sohu.com/2015/h5/06**/index.html";
    var sharePic = 'http://go.sohu.com/2015/h5/06**/images/share.png';
    var shareTitle = '妈妈高考';
    var shareText = '爸妈邦量身定制妈妈高考题';

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