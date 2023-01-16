/*A ideia do código é criar um jogo do genius, onde a cada rodada é acrescentada
uma cor na sequência e você tem que ir clicando e acertando a sequência*/
//as variáveis de cores dos quatro botões
var buttonColours = ["red", "blue", "green", "yellow"];
//criando um dicionário vazio para o padrão do jogo e uma do usuário
var gamePattern = [];
var userClickedPattern = [];
//iniciando as variáveis de iniciar do jogo e do nível zero que será acrescentado
//por um a cada rodada
var started = false;
var level = 0;
/*aqui começa a sequência lógico do jogo. Como explicado no material extra, o
$ com o nome no (), significa que aquele documento será manipulado. Aqui é o controle
do level, além de controle de iniciação com o started = true */
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
/*essa função vai detectar o clique em qualquer um dos botões da classe
botão, (".btn"), lembrando que click é uma função do jquery que detecta
quando algo é clicado, nesse caso, ele dispara a função quando o botão é clicado
Já a variável userChosenColour vai receber a própria função com o atributo id,
ou seja, o botão clicado vai alimentar a variável e essa mesma variável vai
ser usada para adicionar (push) mais uma escolha ao array. Também são passadas
aqui a função para tocar o som, animar o botão e checar a resposta, ou seja,
tudo o que precisa acontecer quando o botão é clicado*/
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
/*função para checar a resposta, só leva em conta a jogada atual, se
o array do jogo for igual ao array do usuário, ou seja, se a sequência de cliques
escolhidas randomicamente for igual a sequência de cliques, e se o comprimento
dos dois arrays for igual, depois de um segundo, é chamada a função próxima sequência.
Do contrário, else, será chamada a função abaixo criada: playSound que tocará o som
chamado wrong, vai modificar body, acrescentando a classe game-over que deixará
o fundo vermelho e mudará o texto do título, por fim, depois de dois segundos,
é removida a classe e o aspecto volta ao normal, também é chamada a função para
começar tudo de novo. Reparar a identação, apesar do JS não exigir, facilita
o entendimento */
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

/*essa é a função que controla a sequência do jogo, primeiro a variável
userClickedPattern é chamada dentro da função, e é adicionado um ao level, que
foi iniciado com zero, depois o jquery $ chama o id do título de nível
e o modifica adicionando o número nível atual, então é criada uma variável
para escolher um número randômico até 4, e usado o math.floor para ser um número
inteiro. Então a variável randomChosenColour recebe a variável buttonColours
que foi criada no começo do código já com a cor determinada pela posição dentro
do dicionário, ou seja, o número randômico será de 0 a 4 e essa também
será a cor de acordo com a posição da mesma no dicionário. Então, é inserido
esse número através da função push, no dicionário gamePattern. Por fim, o
# com o nome da cor escolhida pelo sistema acende, apaga e acende de novo o
botão, além de tocar o som atribuído.*/
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
/*essa função vai ser chamada para animar o botão, para isso, foi passado
o atributo da cor corrente, esse atributo não existe mais no código, somente
aqui, ??? depois o jquery usa o # mais o atributo e adiciona a classe pressed
que foi criada no css e deixa o botão com uma borda e cinza e uma cor acizentada
, depois é chamada a função setTimeout e dentro da função a classe é removida
e o botão volta a sua forma original em 100 milisegundos */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
/*função para tocar os sons, o que ela faz é usar o atributo do nome do Audio
para ser o critério dentro das outras funções, assim, quando for chamado
playSound(green), por exemplo, ele já executa e toca o áudio. */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
/*função que é chamada quando o usuário erra, ela zera o nível e o array =,
além do started que é o controle se o jogo foi iniciado ou não*/
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
