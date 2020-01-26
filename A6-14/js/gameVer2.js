const numDivs = 36;
const maxTurns = 10;

let counter1;
let hitsCorrect = 0;
let firstHitTime = 0;
let hitMiss = 0;
let turns = 0;
let totalPlayedSeconds;

// 4) создаем переменную divSelector и запускаем randomDivId();
function round() {
  $(".col").removeClass("target"); //после каждого запуска функции уберает из .col класс target
  let divSelector = randomDivId(); // получаем случайное число
  $(`#slot-${divSelector}`).addClass("target"); // в полученный ID добовляем класс target
  $(`#slot-${divSelector}`).text(turns + 1); //в полученный ID добовляем текс с номером ячейки
  $(".counter").text(`Ход № ${turns},Попали: ${hitsCorrect}, Промазали: ${hitMiss}`);
  // если это наш первый ход то запписываем переменную firstHitTime
  if (turns === 0) {
    firstHitTime = getTimestamp();
  }
  if (turns === maxTurns) {
    endGame();
  }
}
// получаем время
function getTimestamp() {
  let d = new Date();
  console.log(d.getTime() / 1000)
  return d.getTime();
}
// здесь генерерируем число
function randomDivId() {
  let d = Math.floor(Math.random() * 36) + 1;
  console.log(d);
  return `${d}`;
}
// последння функция которая выводит нужную нам информацию и считает время
function endGame() {
  $(".container1").hide();
  $(".counter").text("");
  $(".col").removeClass("target");
  $("#win-message").removeClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  textMessage();
};

function textMessage() {
  $("span#total-correct").text(hitsCorrect);
  $("span#maxTurns").text(maxTurns);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#start-new-game").show();
  $("#return-main-page").show();
  
};


function handleClick(event) {
  $(".col").text('');
  $(".col").removeClass("miss");
  if ($(event.target).hasClass("target")) {
    hitsCorrect += 1;
    turns += 1;
    round();
  } else {
    $(event.target).addClass("miss");
    hitMiss += 1;
    turns += 1;
    $(event.target).text('miss');
    round();
  }
}

function start() {
  $(".counter").text("Начали");
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();
  });
};

// создаем функцию паузы с запуском через 3 сек.
function pause() {
  $(".container1").show();
  $("#start-game").hide();
  $(".counter").text('Старт через 3 секунды');
  // указываем что запустить функцию start() через 3 сек
  setTimeout(function () {
    start();
  }, 3000);
}

// для начала делаем паузу для подготовки
function init() {
  $("#start-game").click(pause)

};

// 1) выжидаем полной загрузки страницы 
$(document).ready(pause)