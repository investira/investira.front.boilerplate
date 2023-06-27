import { numbers } from 'investira.sdk';

export const varPercentual = (xFirstValue, xSecondValue) => {
    const isFirstZero = xFirstValue === 0;
    const xDivisor = isFirstZero ? 1 : xFirstValue;
    const xMultiplicador = isFirstZero ? 1 : 100;

    const isNegative = pValue => {
        return isFirstZero ? false : Math.sign(pValue) !== 1;
    };

    const verifySignal = pValue => {
        return isNegative(xFirstValue) ? pValue * -1 : pValue;
    };

    const xPercent = verifySignal(((xSecondValue - xFirstValue) / xDivisor) * xMultiplicador);

    return numbers.round(xPercent, 2);
};

export default { varPercentual };
