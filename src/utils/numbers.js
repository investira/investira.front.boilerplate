export const removeDecimals = pNumber => {
    const xNumber = parseFloat(String(pNumber).replace(',', '.'));

    if (xNumber % 1 === 0) {
        return xNumber.toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    } else {
        return xNumber.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
};

const numbers = {
    removeDecimals
};

export default numbers;
