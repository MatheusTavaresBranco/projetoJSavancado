const contador = document.getElementById('contador');
const contadorTexto = document.getElementById('contador-texto');

function calcularMeiaNoite() {
    const agora = new Date();
    return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 0, 0, 0, 0);
}

const horaFinal = calcularMeiaNoite();

function doisDigitos(numero) {
    if (numero < 10) {
        return '0' + numero;
    }

    return String(numero);
}

function formatarTempo(milissegundos) {
    if (milissegundos < 0) {
        milissegundos = 0;
    }

    const totalSegundos = Math.floor(milissegundos / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${doisDigitos(horas)}:${doisDigitos(minutos)}:${doisDigitos(segundos)}`;
}

function atualizarContador() {
    const restante = horaFinal.getTime() - Date.now();
    const tempo = formatarTempo(restante);

    if (contador) {
        contador.textContent = tempo;
    }

    if (contadorTexto) {
        contadorTexto.textContent = tempo;
    }
}

atualizarContador();
setInterval(atualizarContador, 1000);
