$(".close").on("click", function () {
  window.open("https://hsc.ifdev.cc/pni", "_self");
});

$(".next").on("click", function () {
  window.location.href = "#sub1";
});

var popupBt = $(".popup_btn");
var popupCloseBt = $(".popup_close");

$(popupBt).on("click", function () {
  var num = $(this).attr("name");
  $(".popupWrapper").show();
  $(".popup").attr("src", "images/" + num + "/pop.png");
});

$(popupCloseBt).on("click", function () {
  $(".popupWrapper").hide();
});
