let isWidth;
let newWidth = 0;

function isOneProcent(number){
   isWidth = number;
   newWidth = newWidth + isWidth;
   if (newWidth >= 92) {
      $(".btn-7").hide();
   }
   if (newWidth >= 98) {
      $(".btn-3").hide();
   }
   if (newWidth >= 100) {
      newWidth = 100;
      $(".btn-1").hide();
      alert("Вы набрали 100% Когратюлейшенс!!!!")}
   $(".progress-bar").width(`${newWidth}%`);
   $(".infoBar").text(newWidth + "%")
}

$('.btn-1, .btn-3, .btn-7').click(function () {
   if (this.id == "button1") {
      isOneProcent(1);
   } else if (this.id == "button2") {
      isOneProcent(3);
   } else if (this.id == "button3") {
      isOneProcent(7);
   }
});

