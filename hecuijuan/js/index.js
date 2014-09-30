
$(function() {

    //-----广告---//
    (function() {
        var curr = 0;
		$this=$("#Ads")
        var Num = $("#Ads").find("img").length;
        var navW = Math.floor(748 / Num);
        var addValue = 748 % Num;
		$li=$("#AdsNav li");
        $("#AdsNav li").eq(0).find(".trigger").addClass("imgSelected");
        $("#AdsNav li").width(navW);
        $("#AdsNav li").eq(Num - 1).width(navW + addValue);
        $("#AdsNav .trigger").each(function(i) {
            $(this).click(function() {
                curr = i;
                $("#Ads img").eq(i).fadeIn("slow").parents("a").siblings("a").find("IMG").hide();
                $(this).parents(".AdsNav").find(".trigger").removeClass("imgSelected").end();
                $(this).addClass("imgSelected");
                $(".AdsNav_alphBg_o").removeClass("AdsNav_alphBg_o");
                $(this).parent(".AdsNav_txt").siblings(".AdsNav_alphBg").addClass("AdsNav_alphBg_o");
                return false;
            });
        });
		var index=$this.find("#AdsNav li:visible").index();
		var lenght=$li.length;
        /*var pg = function(flag) {
            //flag:true表示前翻， false表示后翻
            if (flag) {
                if (curr == 0) {
                    todo = 2;
                } else {
                    todo = (curr - 1) % Num;
                }
            } else {
                todo = (curr + 1) % Num;
            }
            $("#jsNav .trigger").eq(todo).click();
        };

        //前翻
        $("#prev").click(function() {
            pg(true);
            return false;
        });

        //后翻
        $("#next").click(function() {
           pg(false);
            return false;
        });*/
			var righ=function(){
				index=index+1;
				if(parseInt(index)>lenght-1){	
				index=0;
			}
			$("#Ads img").eq(index).fadeIn("slow").parents("a").siblings("a").find("IMG").hide();
			$("#AdsNav li").eq(index).find(".trigger").addClass("imgSelected");
			$("#AdsNav li").eq(index).siblings().find(".trigger").removeClass("imgSelected");
			$("#AdsNav li").eq(index).find(".AdsNav_alphBg").addClass("AdsNav_alphBg_o");
			$("#AdsNav li").eq(index).siblings().find(".AdsNav_alphBg").removeClass("AdsNav_alphBg_o");
	}
        //自动翻
        var timer = setInterval(function() {
              righ();
			  console.log("1")
        }, 1000);

        //鼠标悬停在触发器上时停止自动翻
        $("#AdsNav a").hover(function() {
            clearInterval(timer);
        },function(){
			timer=setInterval(function(){
				 righ();
			},1000);});
		
    })();

    //右边浮动块的 
    $(".right-float").hover(function() {
        $(this).css("background-color", "#f0f0f0");
    }, function() {
        $(this).css("background-color", "#F7F7F7");
    });
    function init() {
        $(".right-float-fix").css("left", ($(window).width() - 1000) / 2 + 1013);
        t = Math.floor($("#g-warp").offset().top);
    }
    init();

    $(window).scroll(function() {
        var scrollT = $(window).scrollTop();
        if ((scrollT - t) > 0) {
            $(".right-float-self").hide();
            $(".right-float-fix").show();
            $(".products-list-box").find(".products-list-til").hide();
            $(".products-list-box").find(".products-list-til-fix").show();
        } else {
            $(".right-float-self").show();
            $(".right-float-fix").hide();
            $(".products-list-box").find(".products-list-til").show();
            $(".products-list-box").find(".products-list-til-fix").hide();

        }
    });



    //返回顶部
    (function() {

        var $backToTopTxt = "", $backToTopEle = $('<a href="javascript:;" class="backToTop"></a>').appendTo($("body"))

        .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {

            $("html, body").animate({ scrollTop: 0 }, 500);

        }), $backToTopFun = function() {

            var st = $(document).scrollTop(), winh = $(window).height();

            (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();

            //IE6下的定位

            if (!window.XMLHttpRequest) {

                $backToTopEle.css("top", st + winh - 166);

            }

        };

        $(window).bind("scroll", $backToTopFun);

        $(function() { $backToTopFun(); });

    })();

    //头部flash广告

//    setTimeout(function() {
//        //$(".index-top-flash-h400").addClass("index-top-flash-h85");
//        $(".index-top-flash-h400").animate({ height: "70px" }, 1500);
//        setTimeout(function() {
//            $(".index-top-flash-h400").removeClass("index-top-flash-h400");
//        }, 2000);

//    }, 10000);

    //最新成交的产品
    (function() {
        var n = $(".lastSalePro-picList").find("li").length;
        $(".lastSalePro-picList").css("width", 136 * n + "px");
        var listW = $(".lastSalePro-picList").width();
        if (listW <= 680) {
            $(".lastSalePro-l").addClass("lastSalePro-l-no");
            $(".lastSalePro-r").addClass("lastSalePro-r-no");
        } else if (parseInt($(".lastSalePro-picList").css("left")) == 0) {
            $(".lastSalePro-r").addClass("lastSalePro-r-no");
        }
        function leftMove(l) {
            $(".lastSalePro-l").unbind("click");
            var left = parseInt($(".lastSalePro-picList").css("left"));
            $(".lastSalePro-picList").animate({ left: left + l }, 500);
            setTimeout(function() {
                var l = parseInt($(".lastSalePro-picList").css("left"));
                var w = parseInt($(".lastSalePro-picList").width());
                var val = l + w;
                if (val <= 680) {
                    $(".lastSalePro-l").addClass("lastSalePro-l-no");
                }
            }, 510);
            setTimeout(function() {
                $(".lastSalePro-l").bind("click", function() {
                    var l = parseInt($(".lastSalePro-picList").css("left"));
                    var w = parseInt($(".lastSalePro-picList").width());
                    var k = w + l;
                    if (k > 680) {
                        $(".lastSalePro-r-no").removeClass("lastSalePro-r-no");
                        leftMove(-680);
                    }
                });
            }, 520);
        }
        function rightMove(r) {
            $(".lastSalePro-r").unbind("click");
            var left = parseInt($(".lastSalePro-picList").css("left"));
            $(".lastSalePro-picList").animate({ left: left + r }, 500);
            setTimeout(function() {
                var l = parseInt($(".lastSalePro-picList").css("left"));
                if (l >= 0) {
                    $(".lastSalePro-r").addClass("lastSalePro-r-no");
                }
            }, 510);
            setTimeout(function() {
                $(".lastSalePro-r").bind("click", function() {
                    var l = parseInt($(".lastSalePro-picList").css("left"));
                    if (l < 0) {
                        $(".lastSalePro-l-no").removeClass("lastSalePro-l-no");
                        rightMove(680);
                    }
                });

            }, 520);

        }
        $(".lastSalePro-l").click(function() {
            var l = parseInt($(".lastSalePro-picList").css("left"));
            var w = parseInt($(".lastSalePro-picList").width());
            var k = w + l;
            if (k > 680) {
                //                setTimeout(function() {
                //                    $(".lastSalePro-r-no").removeClass("lastSalePro-r-no");
                //                    leftMove(-680);
                //                }, 100);

                leftMove(-680);
                $(".lastSalePro-r-no").removeClass("lastSalePro-r-no");

            }
        })
        $(".lastSalePro-r").click(function() {
            var l = parseInt($(".lastSalePro-picList").css("left"));
            if (l < 0) {
                //                setTimeout(function() {
                //                    $(".lastSalePro-l-no").removeClass("lastSalePro-l-no");
                //                    rightMove(680);
                //                }, 100);

                rightMove(680);
                $(".lastSalePro-l-no").removeClass("lastSalePro-l-no");
            }

        });
    })()


    //商城精选
    if ($(".index-shop-fancy-list").find("li").length > 8) {
        clearInterval(s);
        var long = $(".index-shop-fancy-list").find("li").length;
        var s = setInterval(function() {
            var t = $(".index-shop-fancy-nr").find(".p-a").css("top").replace(/px/, "");
            $(".index-shop-fancy-nr").find(".p-a").css("top", parseInt(t) - 215);
            var tValue = $(".index-shop-fancy-nr").find(".p-a").css("top").replace(/px/, "");
            for (var i = 0; i < 8; i++) {
                var liHtml = $(".index-shop-fancy-list").find("li").eq(0).html();
                $(".index-shop-fancy-list").find("li").eq(0).remove();
                $(".index-shop-fancy-list").append('<li>' + liHtml + '</li>');
                var kk = $(".index-shop-fancy-list").find("li").eq(long - 1).html();
            }
            $(".index-shop-fancy-nr").find(".p-a").animate({ top: "0px" }, 500);
        }, 4000);
        $(".index-shop-fancy-list").hover(function() {
            clearInterval(s);
        }, function() {
            clearInterval(s);
            s = setInterval(function() {
                var t = $(".index-shop-fancy-nr").find(".p-a").css("top").replace(/px/, "");
                $(".index-shop-fancy-nr").find(".p-a").css("top", parseInt(t) - 215);
                var tValue = $(".index-shop-fancy-nr").find(".p-a").css("top").replace(/px/, "");
                for (var i = 0; i < 8; i++) {
                    var liHtml = $(".index-shop-fancy-list").find("li").eq(0).html();
                    $(".index-shop-fancy-list").find("li").eq(0).remove();
                    $(".index-shop-fancy-list").append('<li>' + liHtml + '</li>');
                    var kk = $(".index-shop-fancy-list").find("li").eq(long - 1).html();
                }
                $(".index-shop-fancy-nr").find(".p-a").animate({ top: "0px" }, 500);
            }, 4000);
        });
    }

    //呆滞料
    //new Marquee("ulsmInfo", 0, 2, 725, 210, 20, 5000, 3000, 110);
    var mq_bs = new Marquee("ulsmInfo", 0, 1, 725, 210, 20, 3000, 3000, 210);
    $("#ulsmInfo").mouseover(function() { mq_bs.Stop() }).mouseout(function() { mq_bs.Start() }); //移入列表,停止滚动
    
    //供应商
    function append(t) {
        for (var i = 0; i < 6; i++) {
            var liHtml = $(".applier").find("li").eq(0).html();
            $(".applier").find("li").eq(0).remove();
            $(".applier").append('<li class="f-l">' + liHtml + '</li>');
        }
        $("#applier-scrollDiv").find(".p-a").animate({ top: "0px" }, 500);

    }
    setInterval(function() {
        var t = $("#applier-scrollDiv").find(".p-a").css("top").replace(/px/, "");
        $("#applier-scrollDiv").find(".p-a").css("top", parseInt(t) - 276);
        var tValue = $("#applier-scrollDiv").find(".p-a").css("top").replace(/px/, "");
        for (var i = 0; i < 6; i++) {
            var liHtml = $(".applier").find("li").eq(0).html();
            $(".applier").find("li").eq(0).remove();
            $(".applier").append('<li class="f-l">' + liHtml + '</li>');
        }
        $("#applier-scrollDiv").find(".p-a").animate({ top: "0px" }, 500);
    }, 4500);

    $(".applier-img").each(function() {
        if ($(this).find("img").width() > 155) {
            $(this).find("img").attr("width", "152");
        }
    });



    var demo = $(".askFriendLink-form").Validform({
        tiptype: 3,
        btnSubmit: "#btnSubFLinks",
        datatype: {
            "m1": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|[0-9]{6}$/,
            "url1": /^http:\/\/(\w+:\/\/)?\w+(\.\w+)+.*$/

        },
        ajaxPost: false,
        callback: function() {
            AddFriendlyLink();
            return false;
        }
    });


    //网站公告
    //    $(function() {
    //        //多行应用@Mr.Think
    //        var _wrap = $('ul.shopAnnouncement-mulitline'); //定义滚动区域
    //        var _interval = 3000; //定义滚动间隙时间
    //        var _moving; //需要清除的动画
    //        _wrap.hover(function() {
    //            clearInterval(_moving); //当鼠标在滚动区域中时,停止滚动
    //        }, function() {
    //            _moving = setInterval(function() {
    //                var _field = _wrap.find('li:first'); //此变量不可放置于函数起始处,li:first取值是变化的
    //                var _h = _field.height(); //取得每次滚动高度
    //                _field.animate({ marginTop: -_h + 'px' }, 600, function() {//通过取负margin值,隐藏第一行
    //                    _field.css('marginTop', 0).appendTo(_wrap); //隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
    //                })
    //            }, _interval)//滚动间隔时间取决于_interval
    //        }).trigger('mouseleave'); //函数载入时,模拟执行mouseleave,即自动滚动
    //    });


    //通过$.Tipmsg扩展默认提示信息;
    demo.tipmsg.w["m1"] = "手机号或座机号！";
    demo.addRule([
            {
                ele: ".inputxt:eq(1)",
                datatype: "url1"
            },
            {
                ele: ".inputxt:eq(3)",
                datatype: "m1"
            }
        ]);
});

function showAddFLink() {
    $("input[type=reset]").trigger("click");
    $(".Validform_checktip").html('');
    $.AnXinTanchu({ til: "添加友情链接", id: "askFriendLink", type: "1", width: "510px" });
}

function closeAddFLink() {
    $(".close-tanchu").click();
}

function AddFriendlyLink() {
    var webName = $("#txtLinkName").val();
    var webUrl = $("#txtLinkUrl").val();
    var webContant = $("#txtLink_Contant").val();
    var webPhone = $("#txtLink_Phone").val();
    var webEmail = $("#txtLink_Email").val();

    function PostParam(param) {
        param.WebSiteName = webName;
        param.WebSiteUrl = webUrl;
        param.LinkMan = webContant;
        param.LinkPhone = webPhone;
        param.LinkEmail = webEmail;
        param.Status = 1;
        return param;
    }
    var param = {
        ClassName: "AnxinE.BLL.FriendlyLinkBLL",
        MethodName: "AddOrEditLinksInfo",
        ParamModelName: "AnxinE.Model.DBModel.FriendlyLink",
        onRequest: PostParam,
        onResponse: function(result) {
            if (result == true) {
                $.AnXinTipInfo({ text: "添加成功", state: "ok" });
            } else { $.AnXinTipInfo({ text: "添加失败", state: "no" }); }
            $(".close-tanchu").click();
        }
    };
    $.ajaxRequest(param);
}

$(document).ready(function() {
    $(".lastSalePro-picList-img img[src='']").attr("src", "/image/common/nophoto.gif");
    $(".applier-img img[src='']").attr("src", "/image/common/nophoto.gif");
})

