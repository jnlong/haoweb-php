"use strict";
(function(){
    $.tpl = (function(){
        var cache = {},
            tmpl = function tmpl(str, data){
                var fn = !/\W/.test(str) ?
                    cache[str] = cache[str] ||
                        tmpl(document.getElementById(str).innerHTML) :
                    new Function("obj",
                            "var p=[],print=function(){p.push.apply(p,arguments);};" +
                            "with(obj){p.push('" + str
                            .replace(/[\r\t\n]/g, " ")
                            .split("<#").join("\t")
                            .replace(/((^|#>)[^\t]*)'/g, "$1\r")
                            .replace(/\t=(.*?)#>/g, "',$1,'")
                            .split("\t").join("');")
                            .split("#>").join("p.push('")
                            .split("\r").join("\\'")
                            + "');}return p.join('');");
                return data ? fn( data ) : fn;
            };
        return tmpl
    })();
    $.fenlei = function(){
        var $fenlei = $('.fenlei');
        var cls = 'fl_zk';
        $fenlei.find('.fl_show .btnexpand').click(function(){
            var $this = $(this);
            var $flHide = $this.parents('.fl_show').next('.fl_hide');
            if($this.hasClass(cls)){
                $flHide.hide();
                $this.removeClass(cls);
            }
            else{
                $flHide.show();
                $this.addClass(cls);
            }
        });
    }
    $.card = function(){
        var $hdFlod = $('.cn_card .cn_hd .btnexpand');
        var clsName = 'fold';
        $hdFlod.click(function(){
            $(this).parent().toggleClass(clsName);
        });
        $('.cn_nav li').click(function(){
            var $hd = $(this).parents('.cn_hd');
            if($hd.hasClass(clsName)){
                $hd.removeClass(clsName);
            }
        })
    }
    $.cardTab = function(cg){
        var me = this;
        me.NavTag = cg.navTag || "li";
        me.NavCur = cg.NavCur || "cn_nav_cur";
        me.$navWp = $(cg.nav);
        me.$nav = me.$navWp.find(me.NavTag);
        me.$con = $(cg.con);
        me.NavCount = me.$nav.length;
        if(me.NavCount < 2) return;
        me.navClick = cg.navClick || false;
        me.random = cg.random || false;
        me.index = me.random ? Math.floor(Math.random()*4) : 0;
        me.singleWidth =me.NavCount===3? 33.333334 : 100/me.NavCount;
        me.Speed = .3;
        me._init();
    };
    $.cardTab.prototype = {
        _init : function(){
            var me = this,
                $con = me.$con,
                index = me.index,
                dataIndex = me.$navWp.attr("data-index");
            me.$navWp = null;
            me._clearAddCur(index);
            me.$children = $con.children();
            $con.css({"width":100*me.NavCount+"%","-webkit-transform":"translate(-" + me.singleWidth*index + "%,0) translateZ(0)","-webkit-backface-visibility": "hidden"});
            me.$children.css({"width":me.singleWidth+"%"});

            me.width = $con.width();
            me.childWidth = me.width/me.NavCount;

            me.navClick&&me.$nav.on("click",function(e){
                me._navChange(e);
                me._clearAddCur(me.index);
            });
            $con.on("webkitTransitionEnd",function(){
                $(this).css("-webkit-transition","initial");
            });

            // $con.on("touchstart",function(e){
            //     me._touchstart(e);
            // }).on("touchmove",function(e){
            //     me._touchmove(e);
            // }).on("touchend touchcancel",function(e){
            //     me._touchend(e);
            // });
        },
        _navChange : function(e){
            var me = this,
                $this = $(e.target),
                index = $this.index();
            if(me.index === index) return;
            me.index = index;
            me._stopPro(e);
            me._translate(me.$con, "-" + me.index*me.singleWidth + "%,0,0");
            /*me.$con.animate({"translateX" :  -index*me.singleWidth +"%","translateZ":0},{"duration":me.speed,"easing":"ease-out"});*/
        },
        _touchstart : function(e){
            var me = this,
                et =e.touches[0];
            me._stopPro(e);
            me.startX = et.clientX;
            me.startY = et.clientY;
            me.startLeft = -me.index*(me.childWidth);
        },
        _touchmove : function(e){
            var me = this,
                et =e.touches[0],
                $con = me.$con;
            me._stopPro(e);
            me.moveX = et.clientX;
            me.moveY = et.clientY;
            me.cha = me.startLeft + me.moveX - me.startX;

            if(Math.abs(me.moveY-me.startY)/Math.abs(me.moveX-me.startX)<0.58){
                e.preventDefault();
                if(me.index===0&&me.cha>=0){
                    me._translate($con, "0,0,0");
                    return;
                }
                if((me.index===(me.NavCount-1)&&me.cha<=(-me.index*me.childWidth))){
                    me._translate($con, "-" + me.index*me.singleWidth + "%,0,0");
                    return;
                }
                me._translate($con, "-" + me.cha/me.width*100 + "%,0,0");
            }
        },
        _touchend : function(e){
            var me = this;
            me._stopPro(e);
            if(this.moveX >10){
                var limt = me.moveX-me.startX;
                if((me.index===0&&me.cha>=0)||(me.index===(me.NavCount-1)&&me.cha<=(-me.index*me.childWidth))) return;
                if(limt<-100){
                    me.index++;
                }else if(limt>100){
                    me.index--;
                }
                me._clearAddCur(me.index);
            }
            me._translate(me.$con, "-" + me.index*me.singleWidth + "%,0,0");
            me.moveX = me.moveY = me.startX = me.startY = me.cha =0;
        },
        _translate: function(tag, value) {
            var me = this;
            tag.css({
                "-webkit-transform": "translate3d(" + value + ")",
                "-moz-transform": "translate3d(" + value + ")",
                "transform": "translate3d(" + value + ")",
                // "transition": "all .3s ease-out"
            });
        },
        _stopPro : function(e){
            e.stopPropagation();
            return this;
        },
        _clearAddCur : function(index){
            var me = this,
                cur = me.NavCur;
            me.$nav.removeClass(cur).eq(index).addClass(cur);
            return me;
        }
    };
    $.getMz = function(){
        var data = {};
        data.title ="名站";
        data.des = "收录web开发热门网站";
        data.list=[
            {url: 'http://www.jikexueyuan.com/', title: '极客学院'},
            {url: 'http://www.imooc.com/', title: '慕课网'},
            {url: 'http://www.ycku.com/', title: '瓢城web俱乐部'},
            {url: 'https://m.coding.net/home.html',title: 'coding'},

            {url: 'http://www.php.net/', title: 'php.net'},
            {url: 'https://nodejs.org/en/', title: 'nodejs官网'},
            {url: 'http://m.oschina.net/', title: '开源中国'},
            {url: 'http://fex.baidu.com/', title: 'FEX'},

            {url: 'https://developer.mozilla.org/zh-CN/', title: 'MDN'},
            {url: 'http://www.zhihu.com/', title: '知乎'},
            {url: 'http://www.chinaw3c.org/', title: 'w3c中国'},
            {url: 'http://m.csdn.net/', title: 'CSDN'},
            {url: 'https://github.com/', title: 'GitHub'},

            {url: 'http://www.w3school.com.cn/', title: 'w3cschool'},
            {url: 'http://www.runoob.com/', title: '菜鸟教程'},
            {url: 'https://cnodejs.org/', title: 'cnnodejs'},
            {url: 'http://npm.taobao.org/', title: 'cnpm'},

            {url: 'http://www.css88.com/doc/zeptojs_api/', title: 'zepto手册'},
            {url: 'http://cdn.code.baidu.com/', title: '百度cdn'},
            {url: 'http://www.aliyun.com/', title: '阿里云'},
        ];
        return data;
    };
    $.getFenlei = function(type){
        var data = {title:'', des:'', tab:[]};
        var list, title;
        if(type=="fe"){
            data.title = 'web前端';
            data.des = ""; //前端开发自己的网址导航
            title = '资讯';
            list =[
                [
                    // {url: 'javascript:void(0)', title: '综合'},
                    {url: 'http://fex.baidu.com/', title: 'FEX'},
                    {url: "http://www.w3help.org/zh-cn/", title: "w3help"},
                    {url: "http://www.w3cfuns.com/", title: "w3cfuns"},
                    {url: 'http://www.w3ctech.com/', title: 'w3ctech'},
                    {url: 'http://www.qianduan.net/', title: '前端观察'},
                    {url: "http://fequan.com/", title: "前端圈"},
                    {url: "http://www.w3cplus.com/", title: "w3cplus"},
                    {url: "http://www.daqianduan.com/", title: "大前端"},
                    {url: 'http://www.iqianduan.cn/',title: '星辰网'},
                    {url: "http://www.36kr.com/", title: "36氪"},
                    {url: 'http://www.tuicool.com/',title: '推酷'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                ],
                [
                    {url: 'http://winter-cn.cnblogs.com/',title: 'winter'},
                    {url: 'http://www.ruanyifeng.com/blog/', title: '阮一峰'},
                    {url: 'http://www.cnblogs.com/rubylouvre/',title: '司徒正美'},
                    {url: 'http://blog.sina.com.cn/u/2637630142',title: 'kevin'},
                    {url: 'http://www.aoao.org.cn/',title: '嗷嗷'},
                    {url: 'http://www.zhangxinxu.com/wordpress/category/js/',title: '张鑫旭'},
                    {url: '',title: ''},
                ],
                [
                    {url: 'http://www.csdn.net/article/lastnews',title: 'csdn'},
                    {url: 'http://www.divcss5.com/html/',title: 'divcss5'},
                    {url: 'http://developer.51cto.com/',title: '51cto'},
                    {url: 'http://www.techweb.com.cn/',title: 'techweb'},
                    {url: 'http://www.zan3.com/',title: 'zan3'},
                    {url: 'http://www.html-js.com/', title: '前端乱炖'},
                    {url: 'http://top.css88.com/',title: '前端头条'},
                    {url: "http://www.html5dw.com/", title: "HTML5梦工场"},
                    {url: "http://www.webplatform.org/", title: "WebPlatform"},
                    {url: 'http://f2er.club/',title: 'f2er'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    // {url: 'http://www.html5cn.org/', title: 'html5中国'},
                ],
                [
                    {url: 'http://www.jikexueyuan.com/',title: '教程'},
                    {url: 'http://www.icourse163.org/',title: '慕课'},
                    {url: 'http://m.chuanke.com/',title: '百度传课'},
                    {url: 'http://m.ke.qq.com/',title: '腾讯课堂'},
                    {url: 'http://www.ycku.com/',title: '瓢城web'},
                    {url: 'http://www.5idev.com/',title: '5idev'},
                    {url: 'http://bss.csdn.net/m/topic/learning_path_weixin',title: '微信开发'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                ]
            ];
            data.tab.push({list: list,title: title});

            title = '工具';
            list =[
                [
                    {url: 'http://tool.lu/', title: 'API'},
                    {url: 'http://www.css88.com/book/css/quicksearch.htm',title: 'css'},
                    {url: 'http://www.css88.com/jqapi-1.9/old.html', title:'jquery'},
                    {url: 'http://www.css88.com/doc/zeptojs_api/', title:'zepto'},
                    {url: 'http://mp.weixin.qq.com/wiki/home/index.html',title: '公众号'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                ],
                [
                    {url: 'http://tool.lu/', title: '工具'},
                    {url: 'http://tool.oschina.net/',title: 'oschina'},
                    {url: 'https://tinypng.com/',title: 'tinypng'},
                    {url: 'http://www.fishlee.net/Tools/GetImageBase64Code#codeResult',title: 'base64'},
                    {url: 'http://runjs.cn/',title: 'runjs'},
                    {url: 'http://uaq.baidu.com/?m=Index&a=CloudAnalysis#!/tools',title: 'uaqpng'},
                    {url: 'http://www.sublimetext.com/',title: 'sublime'},
                    {url: 'http://www.jetbrains.com/webstorm/',title: 'webstorm'},
                    {url: 'http://caniuse.com/',title: 'caniuse'},
                ],
                [
                    {url: '',title: '框架'},
                    {url: 'http://fis.baidu.com/',title: 'fis'},
                    {url: 'http://webpack.github.io/',title: 'webpack'},
                    {url: 'http://www.gulpjs.com.cn/',title: 'gulp'},
                    {url: 'http://www.gruntjs.net/',title: 'grunt'},
                    {url: 'http://www.swiper.com.cn/',title: 'swiper'},
                    {url: 'http://cubiq.org/iscroll-5',title: 'iscroll'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                ],
                [
                    {url: '',title: '浏览器'},
                    {url: 'http://m.browser.baidu.com/mb', title:'百度'},
                    {
                        url: "https://www.google.com/intl/zh-CN/chrome/browser/",
                        title: "谷歌"
                    }, {
                        url: "http://browser.qq.com/index_m.html",
                        title: "QQ"
                    }, {
                        url: "http://www.uc.cn/",
                        title: "UC"
                    }, {
                        url: "http://www.firefox.com.cn/",
                        title: "火狐"
                    }, {
                        url: "http://www.opera.com/zh-cn",
                        title: "欧朋"
                    }, {
                        url: "http://www.apple.com/cn/safari/",
                        title: "Safari"
                    }, {
                        url: "http://windows.microsoft.com/zh-cn/internet-explorer/download-ie",
                        title: "IE"
                    }, {
                        url: "http://se.360.cn/",
                        title: "360"
                    }
                ]
            ];
            data.tab.push({list: list,title: title});

            title = '基本';
            list = [
                [
                    {url: 'javascript:void(0)', title: 'html'},
                    {url: 'http://www.fontsquirrel.com/tools/webfont-generator',title: 'webfont'},
                    {url: 'http://font-spider.org/',title: 'font-spider'},
                    {url: 'http://www.ih5.cn/#modal/login/fadeIn',title: 'ih5'},
                    {url: 'http://html5test.com/',title: 'html5test'},
                    {url: 'http://www.html5cn.org/',title: 'html5cn'}
                ],
                [
                    {url: 'http://www.css88.com/', title: 'css'},
                    {url: 'http://www.css88.com/tool/csstidy/',title: 'csstidy'},
                    {url: 'http://less.bootcss.com/',title: 'less'},
                    {url: 'http://sass-lang.com/',title: 'sass'},
                    {url: 'http://www.bootcss.com/',title: 'bootstrap'},
                    {url: '',title: ''}
                ],
                [
                    {url: 'https://developer.mozilla.org/zh-CN/', title: 'JS'},
                    {url: 'http://www.react.org.cn/',title: 'react'},
                    {url: 'http://seajs.org/docs/',title: 'seaJS'},
                    {url: 'http://www.requirejs.org/',title: 'requireJS'},
                    {url: 'http://angularjs.cn/',title: 'angular'},
                    {url: 'http://www.css88.com/doc/backbone/',title: 'backbone'},
                    {url: '',title: ''}
                ],
            ];
            data.tab.push({list: list,title: title});
        }
        else if (type=="php"){
            data.title = 'PHP';
            data.des = ""; //PHP开发网址导航

            title="资讯";
            list=[
                [
                    {url: 'http://php.net/',title: 'PHP'},
                    {url: 'http://school.php1.cn/',title: 'php1.cn'},
                    {url: 'http://www.php100.com/',title: 'php100'},
                    {url: 'http://www.php.net.cn/',title: 'php.net.cn'},
                    {url: 'http://www.thinkphp.cn/',title: 'thinkphp'},
                    {url: 'http://www.xuephp.com/main/index.php',title: 'xuephp'},
                    {url: 'http://down.admin5.com/info/',title: 'admin5'},
                ],
                // [
                //     {url: '',title: 'linux'},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                // ],
                [
                    {url: 'http://www.nginx.cn/',title: 'nginx'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                ],
                // [
                //     {url: '',title: 'mysql'},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                //     {url: '',title: ''},
                // ],
            ]
            data.tab.push({list: list,title: title});
            // title="工具";
            // list=[
            //     [
            //         {url: '',title: '工具'},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //     ],
            //     [
            //         {url: '',title: 'API'},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //     ],
            //     [
            //         {url: '',title: '教程'},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //         {url: '',title: ''},
            //     ],
            // ];
            // data.tab.push({list: list,title: title});
            // title="基本";
            // list = [];
            // data.tab.push({list: list,title: title});
        }
        else if (type=="node"){
            data.title = 'NodeJS';
            data.des = "";
            title = '资讯';
            list =
            [
                [
                    {url: 'http://www.nodejs.net/',title: '官网'},
                    {url: 'https://cnodejs.org/',title: 'cnodejs'},
                    {url: 'http://nodeapi.ucdok.com/',title: 'nodeapi'},
                    {url: 'http://nodejs.cn/api/',title: 'nodejs.cn'},
                    {url: '',title: ''},
                    {url: '',title: ''},
                    {url: '',title: ''},
                ]
            ];
            data.tab.push({list: list,title: title});
        }
        else if (type=="user"){
            data.title="我的网址";
            data.des="定制自己的网址，敬请期待...";
            data.tab=[];
        }
        // console.log(type, data);
        return data;
    }
    $.getcolorblock=function(){
        var data = {};
        data = {width: 414,height: 110};
        return data;
    }
    $.getNews = function(){
        var data = {};
        data.title ="精彩文章";
        data.des = "";
        data.list = [
            {
                title: '糯米移动组件架构演进之路',
                url: 'https://mp.weixin.qq.com/s?__biz=MzA3ODg4MDk0Ng==&mid=2651112195&idx=1&sn=27fa638e90b09a107057e4a5e8d01ab1',
                imgurl: '/haoweb/static/img/nuomi.jpg',
                des: '本文介绍了百度糯米移动App，在面临多业务和多渠道时架构的演进，以及对接入层和Hybrid框架的优化。'
            }
        ];
        return data;
    }
    $.getLink = function(){
        var data = {};
        data.title ="友情链接";
        data.des = "";
        data.list=[
            {url: 'http://www.alexa.cn', title: 'ALEXA'},
            {url: 'http://pr.alexa.cn', title: 'PR查询'},
            {url: 'https://123.sogou.com/', title: '搜狗网址导航'},
            {url: 'http://icp.alexa.cn', title: '备案查询'},
            {url: 'http://hao.360.cn/', title: '360导航'},
            {url: 'http://se.360.cn/', title: '360安全浏览器'},
            {url: 'https://m.hao123.com/', title: 'hao123'},
        ];
        return data;
    };
    $.pageInit = function(){
        var $cardWap = $('#cardWap');
        $cardWap.append($.tpl('mzTpl', $.getMz()));
        // $cardWap.append($.tpl('fenleiTpl', $.getFenlei('user')));
        $cardWap.append($.tpl('fenleiTpl', $.getFenlei('fe')));
        $('#loading').hide();
        $cardWap.append($.tpl('fenleiTpl', $.getFenlei('php')));
        $cardWap.append($.tpl('fenleiTpl', $.getFenlei('node')));
        $cardWap.append($.tpl('newsTpl', $.getNews()));

        $cardWap.append($.tpl('colorblockTpl',$.getcolorblock()));
        // 友情链接
        $cardWap.append($.tpl('mzTpl', $.getLink()));
        var $cn_touch = $(".cn_touch");
        $(".cn_nav").each(function(key,value){
            new $.cardTab({"nav":value,"con":$cn_touch[key],"random":false,"navClick":true});
        });
    };
    $(function(){
        $.pageInit();
        $.fenlei();
        $.card();
    });
})();