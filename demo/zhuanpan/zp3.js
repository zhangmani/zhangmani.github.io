var zp = {
    isring: false,//正在不旋转
    count: 1000,//可以抽奖的次数
    num: 0,
    r: 0,//单个角度
    this_index: 1,//当前指向的 item 序列
    items: [
        {index: 1, name: "1", info: "呀！苹果手表是你的了！", state: 1, rand: 1},
        {index: 2, name: "2", info: "没抽中啊，继续努力吧！", state: 0, rand: 100},
        {index: 3, name: "3", info: "恭喜你获得蓝牙耳机", state: 1, rand: 2},
        {index: 4, name: "4", info: "额，不要气馁啊！", state: 0, rand: 100},
        {index: 5, name: "5", info: "充值卡，给你咯！", state: 1, rand: 10},
        {index: 6, name: "6", info: "不中奖也没关系的。。。", state: 0, rand: 100},
    ],
    random_index: [],
    init: function (e) {
        if (_.local.openObj("count") === null) {
            //初次使用
            _.local.saveObj("count", 0);
        }
        zp.toR = 0;
        zp.speed = 20;

        zp.r = 360 / zp.items.length;//单个旋转角度
        zp.item_count = zp.items.length;//多少个项目

        //根据权重，把项目添加到项目池
        for (var i = 0; i < zp.item_count; i++) {
            var item = zp.items[i];
            for (var ii = 0; ii < item.rand; ii++) {
                zp.random_index.push(zp.items[i].index);
            }

        }
        zp.max_Num = 360 * 10;
        zp.e = document.getElementById("zp");
        /*

         zp.e.style.webkitTransition = "all 5s";
         zp.e.addEventListener("webkitTransitionEnd", function () {
         zp.count--;
         console.log(zp.get);

         zp.isring = false;
         //取得 当前选中的项
         var this_item=zp.items.filter(function(element,pos){return element.index==zp.get})[0];
         console.dir(this_item);
         zp.this_index = zp.get; //设置当前的编号
         zp.alert(this_item);//弹出中奖信息
         });
         */
    },
    to: function (x) {
        zp.toR = 1;
        zp.max_Num = zp.r * (x - 1);
        zp.select_item = zp.items[x - 1];
        var q = Math.round(zp.num / 360) + 12;
        zp.max_Num += q * 360;

    },
    stop: function () {
        zp.isring = true;
        zp.e.style.webkitTransform = 'rotate(' + -60 + 'deg)';
        zp.stoped = true;
    },
    start: function () {
        if (!zp.e) {

        } else {
            if (zp.isring) {

            } else {


                function ring(n) {
                    if (zp.stoped) {

                    } else {
                        zp.num += n;
                        //console.log("n:"+n);
                        zp.e.style.webkitTransform = 'rotate(' + zp.num + 'deg)';
                        setTimeout(function () {

                            if (zp.toR === 0) {
                                n += 0.01;
                                if (n > 11.5) {
                                    n = 11.5;
                                }
                                ring(n);
                            } else {
                                if (zp.num < zp.max_Num) {
                                    n = (zp.max_Num - zp.num) / 300 + 0.2;

                                    ring(n);
                                } else {
                                    //console.log("ok")
                                    zp.isring = false;
                                    zp.alert(zp.select_item);
                                }
                            }

                        }, 1);
                    }

                }
            }
            ring(1);
            zp.isring = true;
        }

    },
    alert:function (obj) {
    if (!obj) {
        alert("您已经抽过奖了");
    } else {
        if (obj.state === 1) {
            //ajax to server

        }
        alert(obj.info);
    }
}
}
var _ = {
    local: {
        saveObj: function (key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },
        openObj: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        delObj: function (key) {
            localStorage.removeItem(key);
        },
        clearObj: function () {
            localStorage.clear();
        }
    },
    select: function () {

    }
}
window.onload = function () {
    zp.init();
    document.getElementById("btn").addEventListener("click", function () {
        zp.start();


        //获得手机号
        var mobile_num = document.getElementById("mob").value;
        zp.mobile = mobile_num;


        //这里做成  ajax  替换 以下代码：
        var played = false;  // 该手机号码是否抽过奖
        if (played) {

            setTimeout(function () {
                zp.stop();
                zp.alert();//提示已经抽过奖了；

            }, 5000);
        } else {
            //模拟 ajax 延时
            setTimeout(function () {
                //真实的：
                zp.get = zp.random_index[Math.ceil(Math.random() * zp.random_index.length) - 1];
                //虚假的 zp.get=2  或 zp.get=4    zp.get=6
                zp.to(zp.get);



            }, Math.ceil(Math.random() * 8000)+1000);
        }


    });
}