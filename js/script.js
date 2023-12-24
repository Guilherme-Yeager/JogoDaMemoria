let jogadas = [],
  opcoes = [];
let checarPos = 0,
  level = 1,
  goOpcoes = false;

document.getElementById("play").addEventListener("click", play);
document.getElementById("resetar").addEventListener("click", resetar);
document.getElementById("verde").addEventListener("click", function () {
  if (opcoes.length == level && goOpcoes) {
    jogadas.push("nova-cor-verde");
    checarPos--;
    atualizaPassos(checarPos);
    vencedor();
  }
});

document.getElementById("vermelho").addEventListener("click", function () {
  if (opcoes.length == level && goOpcoes) {
    jogadas.push("nova-cor-vermelho");
    checarPos--;
    atualizaPassos(checarPos);
    vencedor();
  }
});

document.getElementById("amarelo").addEventListener("click", function () {
  if (opcoes.length == level && goOpcoes) {
    jogadas.push("nova-cor-amarelo");
    checarPos--;
    atualizaPassos(checarPos);
    vencedor();
  }
});

document.getElementById("azul").addEventListener("click", function () {
  if (opcoes.length == level && goOpcoes) {
    jogadas.push("nova-cor-azul");
    checarPos--;
    atualizaPassos(checarPos);
    vencedor();
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function play() {
  if (checarPos == 0) {
    let rodadas = level;
    opcoes = [];
    jogadas = [];
    checarPos = level;
    while (rodadas > 0) {
      let pos = Math.floor(Math.random() * 4) + 1;
      let cor = "nova-cor-";
      switch (pos) {
        case 1:
          cor += "verde";
          break;
        case 2:
          cor += "vermelho";
          break;
        case 3:
          cor += "amarelo";
          break;
        case 4:
          cor += "azul";
          break;
      }
      opcoes.push(cor);
      document.getElementById(cor).style.display = "flex";
      await sleep(250);
      document.getElementById(cor).style.display = "none";
      await sleep(350);
      rodadas--;
      goOpcoes = true;
    }
    atualizaPassos(level);
  }
}

async function animacaoOp(cor) {
  var elementosDoJogo = document.getElementsByClassName("posicoes");
  const cores = ["verde", "amarelo", "azul", "vermelho"];
  cores.forEach((element) => {
    document.getElementById(element).style.display = "none";
  });
  for (let i = 0; i < 3; i++) {
    for (let i = 0; i < elementosDoJogo.length; i++) {
      elementosDoJogo[i].style.backgroundColor = cor;
    }
    await sleep(50);
    for (let i = 0; i < elementosDoJogo.length; i++) {
      elementosDoJogo[i].style.backgroundColor = "#000000";
    }
    await sleep(80);
  }
  cores.forEach((element) => {
    document.getElementById(element).style.display = "flex";
  });
}

function vencedor() {
  if (checarPos == 0 || goOpcoes) {
    for (let i = 0; i < jogadas.length; i++) {
      if (jogadas[i] !== opcoes[i]) {
        resetar();
        return;
      }
    }
    if (checarPos != 0) {
      return;
    }
    animacaoOp("#53f15b");
    level++;
    goOpcoes = false;
    document.getElementById("texto").style.display = "none";
  }
}

function resetar() {
  opcoes = jogadas = [];
  (checarPos = 0), (level = 1), (goOpcoes = false);
  animacaoOp("#e10505");
  document.getElementById("texto").style.display = "none";
}

function atualizaPassos(quantPassos) {
  document.getElementById("texto").style.display = "flex";
  const text = "Selecione mais " + quantPassos + " passo(s) da sequência.";
  document.getElementById("texto").innerHTML = text;
}
