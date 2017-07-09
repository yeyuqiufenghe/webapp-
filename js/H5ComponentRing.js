/* 环图组件对象 */
var H5ComponentRing = function (name,cfg) {
    var component = new H5ComponentBase(name,cfg);
// 绘制  背景层
    var w = cfg.width;
    var h = cfg.height;
    var cns = document.createElement('canvas');//创建画布
    var ctx = cns.getContext('2d'); //画布对象
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;
//底层
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fillStyle ='#ccc';
    ctx.strokeStyle='#ccc';
    ctx.fill();
    ctx.stroke();
//数据层
    cns = document.createElement('canvas');//创建画布
    ctx = cns.getContext('2d'); //画布对象
    $(cns).css('zIndex',2);
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    var sAngel = 1.5*Math.PI;//设置开的角度在12点的位置
    var eAngel = cfg.data[0][1]*2*Math.PI;//结束角度


    ctx.beginPath();
    ctx.fillStyle='red';
    ctx.strokeStyle = 'red';
    ctx.lineWidth1 =.1;

    ctx.moveTo(r,r);
    ctx.arc(r,r,r,sAngel,eAngel-1.5*Math.PI);
    ctx.fill();
    ctx.stroke();
//文本层
    cns = document.createElement('canvas');//创建画布
    ctx = cns.getContext('2d'); //画布对象
    $(cns).css('zIndex',3);
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.beginPath();
    ctx.arc(r,r,r-30,0,2*Math.PI);
    ctx.fillStyle ='#fff';
    ctx.strokeStyle='#fff';
    ctx.fill();
    ctx.stroke();

    var text= $('<div class="text"></div>');
    var per = $('<div class="per"></div>');
    text.text(cfg.data[0][0]);
    text.css('fontSize',cfg.fontSize);
    per.text(cfg.data[0][1]*100+'%');
    text.append(per);
    component.append(text);




    // 数据动画
    // 入场动画
    component.on('onLoad',function () {
        var s= 0;
        for (i=0;i<100;i++){
            setTimeout(function () {
                s += 0.01;
                draw(s);
            },i*10+500)//闭包的存在
        }
    });
    //出厂动画
    component.on('onLeave',function () {
        var s= 1;
        for (i=0;i<100;i++){
            setTimeout(function () {
                s -= 0.01;
                draw(s);
            },i*10+500)
        }
    });

    return component;
};
