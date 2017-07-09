/* 柱图组件对象 */
var H5ComponentPolyline= function (name,cfg) {
    var component = new H5ComponentBase(name,cfg);
// 绘制网格线 背景层
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布（网格线背景）
    var cns = document.createElement('canvas');//创建画布
    var ctx = cns.getContext('2d'); //画布对象
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    //水平网格线 100 ——> 10份
    var stepX = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#AAAAAA";

    window.ctx = ctx ;
    for (var i=0;i<stepX+1;i++){
        var y= (h/stepX)*i;

        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    ctx.stroke();
    //垂直网格线（根据项目的个数去分）
    var stepY = cfg.data.length+1;
    var text_w = w/stepY >> 0;
    for (var j=0;j<stepY+1;j++){
        var x = (w/stepY)*j;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);

        //项目文本
        if(cfg.data[j]){
            var text= $('<div class="text"></div>');
            text.text(cfg.data[j][0]);
            text.css('width',text_w/2).css('left',(x/2-text_w/4)+text_w/2);
            component.append(text);
        }
    }
    ctx.stroke();



        //绘制折线数据 数据层  点的绘制
        //@param {float} per 0到1之间的数据，会根据这个值绘制最终的数据状态
        //return {dom} component元素
        //
        var cns = document.createElement('canvas');//创建画布
        var ctx = cns.getContext('2d'); //画布对象
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        component.append(cns);
    var draw = function (per) {
        //清空画布
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";

        var row_w = (w/(cfg.data.length+1));

        //画点
        for(i in cfg.data){
            var item = cfg.data[i];

            x=row_w*i+row_w;
            y=h-(item[1]*h*per);

            ctx.moveTo(x,y);
            ctx.arc(x,y,5,0,2*Math.PI);
        }
        //数据层 连线
        //移动画笔到第一个点的位置
        ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
        for (i in cfg.data){
            var item = cfg.data[i];
            x=row_w*i+row_w;
            y=h-(item[1]*h*per);
            ctx.lineTo(x,y);
        }
        ctx.stroke(); //收线
        ctx.lineWidth=1; //再设置线宽

        // 绘制阴影
        ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle='rgba(255,118,118,0.3)';
        ctx.fill();


        //写数据
        for(i in cfg.data){
            var item = cfg.data[i];

            x=row_w*i+row_w;
            y=h-(item[1]*h*per);

            ctx.moveTo(x,y);

            ctx.fillStyle = item[2] ? item[2] : '#595959';

            ctx.fillText((item[1]*100)+"%",x-10,y-10)
        }
        ctx.stroke();
    };
    //数据动画

    //入场动画
    component.on('onLoad',function () {
        var s= 0;
        for (i=0;i<100;i++){
            setTimeout(function () {
                s += 0.01;
                draw(s);
            },i*10+1000)//闭包的存在
        }
    });
    //出厂动画
    component.on('onLeave',function () {
        var s= 1;
        for (i=0;i<100;i++){
            setTimeout(function () {
                s -= 0.01;
                draw(s);
            },i*10+1000)
        }
    });

    //项目文本动画 利用css是实现

    return component;
};
