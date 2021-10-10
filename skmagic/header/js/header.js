$(window).on("load", function () {
    var tit = document.location.href.split('/')[4];
    $('.h-tit').attr('src', '../header/img/' + tit + '.png')
})


$('.mainBtn').on('click', function () {
    window.open('https://dudrbrb.github.io/portfolio/main/index.html', '_self')
})
