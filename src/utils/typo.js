export function capitalize(string) {
    if (process.env.NODE_ENV !== 'production' && typeof string !== 'string') {
        throw new Error('Investira: capitalize(string) espera uma string.');
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFirstLetters(pFrase = '', pUppercase = false) {
    // Dividir a frase em palavras separadas
    const xPalavras = pFrase.split(' ');

    // Array para armazenar as primeiras letras
    const xPrimeirasLetras = [];

    // Iterar sobre as palavras
    for (let i = 0; i < xPalavras.length; i++) {
        const xPalavra = xPalavras[i];

        // Obter a primeira letra da palavra e adicioná-la ao array
        const xPrimeiraLetra = xPalavra.charAt(0);
        xPrimeirasLetras.push(xPrimeiraLetra);
    }

    const xResult = xPrimeirasLetras.join('');

    if (pUppercase) {
        return xResult.toUpperCase();
    }

    // Retornar as primeiras letras como uma string
    return xResult;
}

export default {
    capitalize,
    getFirstLetters
};
