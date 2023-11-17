let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto;
let chute;

let tentativas = 1;
let mensagemTentativa;
let palavraTentativas = tentativas > 1 ? "tentativa" : "tentativas";

exibirTextoNaTela = (tag, text) => {
  let campo = document.querySelector(tag);
  campo.innerHTML = text;
  responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
};

exibirMensagemInicial = () => {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "escolha um número de 1 à 10");
};

verificarChute = () => {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");

    mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
    palavraTentativas;
    exibirTextoNaTela("p", mensagemTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor do que o chute");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
};

exibirMensagemInicial();

gerarNumeroAleatorio = () => {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
};

limparCampo = () => {
  chute = document.querySelector("input");
  chute.value = "";
};

reiniciarJogo = () => {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
};

numeroSecreto = gerarNumeroAleatorio();

exibirMensagemInicial();