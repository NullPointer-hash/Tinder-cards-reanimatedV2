

$(document).ready(function(){
    
    const obj = {
        interval: null,
        timeout: null,
        i:1,
    };

    $('.material-btn').on('touchstart mousedown', function(e){
        e.preventDefault();
        clearInterval(obj.interval);
        const widthp = this.offsetWidth;
        const heightp = this.offsetHeight;
        var x = (e.pageX || 0) - $(this).offset().left;
        var y = (e.pageY || 0) - $(this).offset().top;
        if (e.type == "touchstart") {
            x = e.originalEvent.touches[0].pageX - $(this).offset().left;
            y = e.originalEvent.touches[0].pageY - $(this).offset().top;
        }
        const width = Math.max(widthp,heightp) + 2*Math.abs(x-widthp/2) + 2*Math.abs(y-heightp/2)+60;
        $(this).data('width',width);
        let circle = document.createElement('div');
        circle.classList.add('ripple-circle');
        this.appendChild(circle);
        let count = $(this).children('.ripple-circle').length;
        $(this).children('.ripple-circle').eq(count-1).css({
            position: 'absolute',
            borderRadius: '50%',
            width: '1px',
            height: '1px',
            backgroundColor: $(this).data('color'),
            left: (x-0.5)+'px',
            top: (y-0.5)+'px',
            
        });

        obj.interval = setInterval(() => {
            $(this).children('.ripple-circle').eq(count-1).css('transform',`scale(${obj.i})`);
            obj.i+=width/63;
            obj.i*=0.984;
            
            if(obj.i>1.1*width) {
                clearInterval(obj.interval);
                $(this).children('.ripple-circle').eq(count-1).css('transform',`scale(${1.1*width})`);
                $(this).children('.ripple-circle').eq(count-1).css('opacity','0');
                obj.i=1;
                
            }
            
        },1000/60);
    });

    $('.material-btn').on('touchend mouseup', function(e){
        e.preventDefault();
        const width = $(this).data('width');
        let count = $(this).children('.ripple-circle').length;
        $(this).children('.ripple-circle').eq(count-1).css('transition','transform 0.6s cubic-bezier(0.35, 0.95, 0.87, 0.73),opacity 0.6s cubic-bezier(0.6, -0.1, 0.97, 0.6)');
        $(this).children('.ripple-circle').eq(count-1).css('transform',`scale(${width})`);
        $(this).children('.ripple-circle').eq(count-1).css('opacity','0');
        clearInterval(obj.interval);
        obj.i=1;
        if(count>5) {
            $(this).children('.ripple-circle').eq(0).remove();
        }
    });

    $('.material-btn').on('mouseleave', function(e){
        e.preventDefault();
        const width = $(this).data('width');
        let count = $(this).children('.ripple-circle').length;
        $(this).children('.ripple-circle').eq(count-1).css('transition','transform 0.6s cubic-bezier(0.35, 0.95, 0.87, 0.73),opacity 0.6s cubic-bezier(0.6, -0.1, 0.97, 0.6)');
        $(this).children('.ripple-circle').eq(count-1).css('transform',`scale(${width})`);
        $(this).children('.ripple-circle').eq(count-1).css('opacity','0');
        clearInterval(obj.interval);
        obj.i=1;
        if(count>5) {
            $(this).children('.ripple-circle').eq(0).remove();
        }
    });

 });