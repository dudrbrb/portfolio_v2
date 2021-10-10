$(window).on('load',function(){
    Motion();
})

$('.box_btn').on('click', function(){
    var idx = $(this).index('.box_btn') + 1;
    var ht;

    if(idx == 1) ht = 2441
    else if ( idx == 2 ) ht = 2415
    else ht = 2348;

    $('.arr' + idx).toggleClass('on');
    
    if( $('.arr' + idx).hasClass('on')) arrMotion(idx, 180, ht, 1, 0.4);
    else arrMotion(idx, 0, 0, 0, 0);
   
});

function arrMotion(idx, r, ht, o,d){
    TweenMax.set($('.arr' + idx), {rotation: r})
    TweenMax.to(('.box' + idx), 0.6, {height: ht})
    TweenMax.to(('.box' + idx + ' .top_img'), 0.6, { opacity: o, delay: d})
}