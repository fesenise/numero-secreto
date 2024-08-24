//Função Número Secreto
let listaDeNumerosSorteados = [ ];
let tamanhaMaximoLista = 3;
let numeroSecreto = gerarNumeroAleatorio();

//Parâmetro de exibição de texto
function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

//Executar a função para mudar textos de título e parágrafo
function mensagemInicial (){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p','Insira um número de 1 a 10');
}

mensagemInicial();

//Função verificar o chute do usuário
let tentativas = 1;

function verificarChute() {
    let chute = document.querySelector('input').value; // Associar variável com o campo de texto
    console.log(chute == numeroSecreto); // Exibir no console se o usuário acertou o número secreto

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Corrigir plural 
        let mensagemTentativas = `Parabéns por encontrar o número secreto com ${tentativas} ${palavraTentativa}.`
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById ('reiniciar').removeAttribute('disabled');
    }
    else if (chute > numeroSecreto) {
        exibirTextoNaTela('h1', 'Você errou')
        exibirTextoNaTela('p', 'O número secreto é menor')
        tentativas++; // Contar tentativas
        limparCampo(); // função para limpar campo quando o user erra
}
    else {
        exibirTextoNaTela('h1', 'Você errou')
        exibirTextoNaTela('p', 'O número secreto é maior')
        tentativas++; // Contar tentativas
        limparCampo(); // Função para limpar campo quando o user erra
}
}

// Função para gerar e retornar número aleatório
function gerarNumeroAleatorio () {
    let numeroSorteado = parseInt(Math.random()*tamanhaMaximoLista +1);
    let quantidadeNumerosLista = listaDeNumerosSorteados.length;

    //Verificação para limpar lista quando atingir a quantidade limites de números sorteados
    if (quantidadeNumerosLista == tamanhaMaximoLista) {
        listaDeNumerosSorteados = [ ]; 
    }

    //Verificação para não permitir que sortei o mesmo número duas vezes
    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio ();
    }
    else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
    }
}

// Função para limpar campo quando o user erra
function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para criar novo jogo
function novoJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
}


