/* 雷达图组件对象 */
var H5ComponentRadar = function (name,cfg) {
    var component = new H5ComponentBase(name,cfg);
// 绘制  背景层
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布（雷达图背景）
    var cns = document.createElement('canvas');//创建画布
    var ctx = cns.getContext('2d'); //画布对象
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;
    var step = cfg.data.length;

    ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI);
    ctx.stroke();


    //计算圆周上的点坐标
    //一直圆心坐标（a，b）半径 R 角度 deg
    //rad = (2*Math.PI/360)*(360/step)*i
    // x = a+Math.sin(rad)*r
    // y = b+Math.cos(rad)*r

    //绘制网格背景图（分面绘制，分为10分）
    var isBlue = true;
    for(var s=10;s>0;s--){
        ctx.beginPath();
        for (var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i;

            var x = r + Math.sin(rad)*r*(s/10);
            var y = r + Math.cos(rad)*r*(s/10);


            // ctx.arc(x,y,5,0,2*Math.PI); //画出5个点在圆周上
            // ctx.moveTo(r,r); //将圆点和其他点分别连起来
            // ctx.lineTo(x,y);
            ctx.lineTo(x,y);
        }
        ctx.closePath(); //闭合各个点
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';//两种颜色替换填充
        ctx.fill();
    }

    //绘制伞骨
    for (i=0;i<step;i++){
         rad = (2*Math.PI/360)*(360/step)*i;
         x = r + Math.sin(rad)*r;
         y = r + Math.cos(rad)*r;

        ctx.moveTo(r,r); //将圆点和其他点分别连起来
        ctx.lineTo(x,y);

        //输出项目文字
        var text= $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        text.css('transition','all 1s ' + i*0.2+'s');//让文本一个一个出现

        //定义文本的位置
        if(x>w/2){
            text.css('left',x/2+5);
        }else{
            text.css('right',(w-x)/2+5);
        }
        if(y>h/2){
            text.css('top',y/2+5);
        }else{
            text.css('bottom',(h-y)/2+5);
        }

        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);
        component.append(text);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();


    //数据层的开发
    //加入一个画布（数据层）
    cns = document.createElement('canvas');//创建画布
    ctx = cns.getContext('2d'); //画布对象
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.strokeStyle = '#f00';

    var draw = function (per) {
        if(per>=1){
            component.find('.text').css('opacity',1);
        }// 判断在数据加载完成后再让文本出现
        if(per<=01){
            component.find('.text').css('opacity',0);
        }// 判断在数据退场后再让文本隐藏

        ctx.clearRect(0,0,w,h);  //清除画布
        //雷达图生长动画函数
        //画数据
        for (i=0;i<step;i++){
            rad = (2*Math.PI/360)*(360/step)*i;
            var rate = cfg.data[i][1]*per;
            x = r + Math.sin(rad)*r*rate;
            y = r + Math.cos(rad)*r*rate;
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();

        //画数据点
        ctx.fillStyle = '#ff7676';
        for (i=0;i<step;i++){
            rad = (2*Math.PI/360)*(360/step)*i;
            rate = cfg.data[i][1]*per;
            x = r + Math.sin(rad)*r*rate;
            y = r + Math.cos(rad)*r*rate;

            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    };


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
