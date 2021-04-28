var beepHover = $(".soundHover")[0];
var beepTransition = $(".soundTransition")[0];
var beepTranReverse = $(".soundTranReverse")[0];
var sound = true;

$(document).ready(function () {

  $(".btnSound").click(function (e) {
    if (($(this).hasClass("active") === false) && ($(this).hasClass("btnOn") === true)) {
      $(this).addClass("active");
      $(".btnOff").removeClass("active");
      sound = true;
    } else {
      $(".btnOn").removeClass("active");
      $(this).addClass("active");
      sound = false;
    }
  });

  $(".btn").hover(function () {
    beepHover.play();
  }, function () {});

  $(".btn-menu").click(function (e) {
    beepTransition.play();
  });

  $(".btn-reverse").click(function (e) {
    beepTranReverse.play();
  });

  $("#btnSolo").click(function () {
    $(".menu").remove();
    $(".estrellas").remove();
    $(".brillando").remove();
    $(".nubes").remove();
    $(".navbar").show();
    $(".d-none").removeClass();
    init();
  });

});

