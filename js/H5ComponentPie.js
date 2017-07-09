/* 饼图组件对象 */
var H5ComponentPie = function (name,cfg) {
    var component = new H5ComponentBase(name, cfg);
// 绘制  背景层
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布（雷达图背景）
    var cns = document.createElement('canvas');//创建画布
    var ctx = cns.getContext('2d'); //画布对象
    $(cns).css('zIndex',1);
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r =w/2;
    //加入一个底图层
    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth1 =1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //绘制数据层

    cns = document.createElement('canvas');//创建画布
    ctx = cns.getContext('2d'); //画布对象
    $(cns).css('zIndex',2);
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var colors = ['red','green','blue','orange','gray']; //定义默认颜色
    var sAngel = 1.5*Math.PI;//设置开的角度在12点的位置
    var eAngel = 0;//结束角度
    var aAngel = Math.PI*2;//100%的圆借宿的角度；360

    var step = cfg.data.length;
    for (var i= 0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());

        eAngel = sAngel+aAngel * item[1]; //结束角度和数据联系

        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.strokeStyle = color;
        ctx.lineWidth1 =.1;

        ctx.moveTo(r,r);
        ctx.arc(r,r,r,sAngel,eAngel);
        ctx.fill();
        ctx.stroke();

        sAngel = eAngel;//变换起点的位置到下上一个数据的终点

        //加入所有的项目文本

        var text= $('<div class="text"></div>');
        var per = $('<div class="per"></div>');
        text.text(cfg.data[i][0]);
        text.css('transition','all 1s ' + i*0.2+'s');//让文本一个一个出现
        per.text(cfg.data[i][1]*100+'%');
        text.append(per);

        var x= r+Math.sin(.5*Math.PI-sAngel)*r;
        var y= r+Math.cos(.5*Math.PI-sAngel)*r;


        if(x>w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }
        if(y>h/2){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2);
        }

        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }


        text.css('opacity',0);
        component.append(text);


    }
    // 加入蒙版层 做动画；
    cns = document.createElement('canvas');//创建画布
    ctx = cns.getContext('2d'); //画布对象
    $(cns).css('zIndex',3);
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.fillStyle='#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth1 =1;

    var draw = function (per) {
        ctx.clearRect(0,0,w,h);

        ctx.beginPath();

        ctx.moveTo(r,r);

        if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI);
        }else{
            ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
        }
        if (per>=1){
            component.find('.text').css('opacity',1);
        }


        if (per>=1){
            component.find('.text').css('opacity',1);
        }
        if (per<=0){
            component.find('.text').css('opacity',0);
        }
        ctx.fill();
        ctx.stroke();

    };
    draw(0);

    //数据动画
    //入场动画
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









