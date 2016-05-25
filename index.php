<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="baidu-site-verification" content="73dMqCk7kD" />
    <title>web网址导航-haoweb</title>
    <meta content="telephone=no" name="format-detection">
    <meta name="keywords" content="web网址大全,web上网导航,web网址导航,php,前端开发,nodejs">
    <meta name="description" content="收集web学习资源,php,前端开发,nodejs,学习手册,常用网址收录">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <link rel="apple-touch-icon-precomposed" href="">
    <link href="/haoweb/static/css/index.css" type="text/css" rel="stylesheet">
    <base target="_blank"/>
</head>
<body>
<!-- html -->
    <header class="cn head">
        <h1><img class="logo" src="/haoweb/static/img/logo.png" alt=""></h1>
    </header>
    <nav class="nav">
        <a href="https://github.com/jnlong" class="nav-link">my github</a>
        <a href="http://blog.sina.com.cn/u/2637630142" class="nav-link">my blog</a>
        <a href="http://n.haoweb.top/huodong/list.html" class="nav-link">H5活动</a>
    </nav>
    </div>
    <div id="cardWap">
        <div class="loading" id="loading">正在加载中...</div>
    </div>
    <form class="hd_search hide" id="search" name="search" action="http://m.baidu.com/s" method="get">
        <div class="sh_main_wp">
            <span class="sh_logo"></span>
            <input class="sh_ipt" type="text" value="" autocomplete="off" autocorrect="off" maxlength="64" id="kw" name="word" placeholder="搜索关键词">
            <button class="sh_bt" type="submit" id="searchBt"><span>百度一下</span></button>
        </div>
        <input type="hidden" value="www_colorful" name="ref" id="ref">
        <input type="hidden" value="111041" name="st" id="st">
        <input type="hidden" value="iphone" name="tn">
        <input type="hidden" name="from" value="381a_cp_ik" id="sugFrom">
        <input type="hidden" value="c" name="https">
    </form>
    <div class="cn sitetitle">收集web学习资源,php、前端开发、nodejs等常用网址收录</div>
    <div class="cn bdsharebuttonbox hide">
        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
        <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
        <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
        <a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧"></a>
        <a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣"></a>
        <a href="#" class="bds_mshare" data-cmd="mshare" title="一键分享"></a>
        <a class="bds_count" data-cmd="count"></a>
    </div>
    <footer class="ft">
        <div class="ft_cf">
            <a href="mailto:zxl8310@163.com?subject=haoweb-推荐网址&body=分类：网址：">网址收录</a>&nbsp;&nbsp;&nbsp;<a href="mailto:zxl8310@163.com?subject=haoweb-改进意见&body=hi,我有一个好的建议推荐给您。">改进建议</a>
        </div>
        <p class="ft_cp">Copyright © www.haoweb.top</p>
        <p class="ft_cp">QQ: 308910520&nbsp;&nbsp;京ICP备15066452号-1</p>
    </footer>
<!-- html -->
<!-- js模板 -->
    <script type="text/tpl" id="fenleiTpl">
        <#tablen = tab.length;#>
        <div class="cn_card fenlei">
            <div class="cn_hd">
                <h2 class="title"><#=title#></h2>
                <#if(tablen>0){#><span class="btnexpand"></span><#}#>
                <span class="des"><#=des#></span>
                <ul class="cn_nav">
                    <#tab.forEach(function(a){#>
                        <li><#=a.title#></li>
                    <#});#>
                </ul>
            </div>
            <div class="cn_bd">
            <div class="cn_touch" style="width: <#=tablen#>00%;">
                <#tab.forEach(function(a){#>
                    <div class="cn_tab" style="width: <#=100/tablen#>%;">
                    <#a.list.forEach(function(wap){#>
                            <div class="fl_show cn_fl cn_fl_4">
                            <#wap.forEach(function(link, key){#>
                                <#if(link.url ==''){#>
                                    <#link.url='javascript:void(0)';#>
                                <#}#>
                                <#if(link.title !=''){#>
                                    <#if(key==4){#>
                                        <span class="btnexpand"></span>
                                        </div>
                                        <div class="fl_hide cn_fl cn_fl_4">
                                    <#}#>
                                    <a href="<#=link.url#>"><#=link.title#></a>
                                <#}#>
                            <#});#>
                            </div>
                    <#});#>
                    </div>
                <#});#>
            </div>
            </div>
        </div>
    </script>
    <script type="text/tpl" id="mzTpl">
        <div class="cn_card cn_mz">
            <div class="cn_hd">
                <h2 class="title"><#=title#></h2>
                <span class="btnexpand"></span>
                <span class="des"><#=des#></span>
            </div>
            <div class="cn_bd cn_fl cn_fl_4">
                <#list.forEach(function(link, key){#>
                    <#if(link.title !='' ){#>
                        <a href="<#=link.url#>" target="_blank"><#=link.title#></a>
                    <#}#>
                <#});#>
            </div>
        </div>
    </script>
    <script type="text/tpl" id="colorblockTpl">
        <div class="cn cpmWap">
            <iframe src="http://m.hao123.com/?z=2&union=1&m=mini&type=7&t=" <#=(new Date()).getTime()#> style="min-width:100%" align="center,center" marginwidth="0" marginheight="0" height="
                <#=height#>px" scrolling="no" frameborder="0" allowtransparency="true">
            </iframe>
        </div>
    </script>
    <script type="text/tpl" id="newsTpl">        
        <div class="cn_card cn_news">
            <div class="cn_hd">
                <h2 class="title"><#=title#></h2>
                <span class="btnexpand"></span>
                <span class="des"><#=des#></span>
            </div>
            <ul class="cn_bd">
            <#list.forEach(function(link, key){#>
                <li>
                    <a class="link" href="<#=link.url#>">
                        <#if (!!link.title){#>
                            <h3><#=link.title#></h3>
                        <#}#>
                        <#if (!!link.des){#>
                            <div class="summary">
                                <#if (!!link.imgurl){#>
                                    <img src="<#=link.imgurl#>"/>
                                <#}#>
                                <p class="summary-con"><#=link.des#></p>
                            </div>
                        <#}#>
                    </a>
                </li>
            <#});#>
            </ul>
        </div>
    </script>
<!-- js模板 -->
<!-- js资源 -->
    <script src="/haoweb/static/js/zepto.min.js"></script>
    <script src="/haoweb/static/js/index.js"></script>
    <script>
        (function(){
            var bp = document.createElement('script');
            bp.src = '//push.zhanzhang.baidu.com/push.js';
            var s = document.getElementsByTagName("script")[2];
            s.parentNode.insertBefore(bp, s);
        })();
    </script>
    <script>
        // window._bd_share_config = {
        //     "common": {
        //         "bdSnsKey": {},
        //         "bdText": "程序猿的福利来了，haoweb.top收集常用网址，还支持自定义添加网址，专为手机用户定制！",
        //         "bdMini": "1",
        //         "bdMiniList": false,
        //         "bdPic": "",
        //         "bdStyle": "2",
        //         "bdSize": "16"
        //     },
        //     "share": {}
        // };
        // with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
    </script>
    <script type="text/javascript">
        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cspan id='cnzz_stat_icon_1256861936'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol 
            + "s4.cnzz.com/z_stat.php%3Fid%3D1256861936%26show%3Dpic2' type='text/javascript'%3E%3C/script%3E"));
    </script>
<!-- js资源 -->
</body>
</html>
