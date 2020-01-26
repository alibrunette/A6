const numDivs = 36;
const maxTurns = 10;


let hitsCorrect = 0;
let firstHitTime = 0;
let hitMiss = 0;
let turns = 0;

// 4) создаем переменную divSelector и запускаем randomDivId();
function round() {
  $(".col").removeClass("target");
  let divSelector = randomDivId();
  $(`#slot-${divSelector}`).addClass("target");
  console.log(divSelector);
  $(`#slot-${divSelector}`).text(turns + 1);
  if (turns === 0) {
    firstHitTime = getTimestamp();
  }
  if (turns === maxTurns) {
    endGame();
  }
}

function getTimestamp() {
  let d = new Date();
  console.log(d.getTime() / 1000)
  return d.getTime();
}
// 5) здесь генерерируем два числа по ветикали и по горезонтали???
function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
    return `${d}${n}`;
}

function endGame() {
  $(".col").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#win-message").removeClass("d-none");
  $("span#total-correct").text(hitsCorrect);
  $("span#maxTurns").text(maxTurns);
  $("#total-time-played").text(totalPlayedSeconds);
  $(".game-button").show();

  
  
}

function handleClick(event) {
  $(".col").text("");
  $(".col").removeClass("miss");
  if ($(event.target).hasClass("target")) {
    hitsCorrect = hitsCorrect + 1;
    turns = turns + 1;
    round();
  }
  else {$(event.target).addClass("miss");
      hitMiss = hitMiss + 1;
      turns = turns + 1;
      $(event.target).text('miss');
      round();
  }
} 
// 2) прячем кнопку показываем поле
function init() {
    $("#start-game").hide();
    // 3) стартуем round()
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();
  });
}
// 1) выжидаем полной загрузки страницы 
$(document).ready(init);