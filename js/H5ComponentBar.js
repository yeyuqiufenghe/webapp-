/* 柱图组件对象 */
var H5ComponentBar = function (name,cfg) {
    var component = new H5ComponentBase(name,cfg);
    $.each(cfg.data,function (idx,item) {
       var line = $('<div class="line"></div>');
       var name = $('<div class="name"></div>');
       var rate = $('<div class="rate"></div>');
       var per = $('<div class="per"></div>');
       var width = item[1]*100+'%';

       name.text(item[0]);
       rate.css('width',width);
       rate.html('<div class="bg"></div>');
       per.text(width);

       var bgColor ='';
       if(item[2]){
          bgColor = 'style="background-color:'+item[2]+'"';
          rate.html('<div class="bg"'+bgColor+' ></div>');
       }

       line.append(name).append(rate).append(per);
       component.append(line);
    });

    return component;
};
