/**
 * Define um conjunto de dados vazios para serem usados enquanto uma chamada async não retorna
 *
 * @constructor
 * @param {object} pObject objeto com valores vazios
 * @param {object} pSize tamanho do array
 * @return {Array}
 */

export const dummyData = (pObject, pSize) => {
    let xData = [];
    for (let i = 0; i < pSize; i++) {
        xData.push(pObject);
    }
    return xData;
};

export const dummyObjectData = (pObject, pSize) => {
    let xData = [];
    for (let i = 0; i < pSize; i++) {
        xData.push(pObject);
    }
    return xData;
};

/**
 * Retorna um array de objetos ordenado pelo campo definido no parametro pAttr
 * @param {Array | Object} pData array ou objeto de objetos
 * @param {string} pAttr campo a ser ordenado
 */
export const sortByAttr = (pData, pAttr) => {
    const xDataOrdered = Object.values(pData).sort((a, b) => {
        if (a[pAttr] < b[pAttr]) {
            return -1;
        }
        if (a[pAttr] > b[pAttr]) {
            return 1;
        }
        return 0;
    });

    return xDataOrdered;
};

/**
 *
 *
 * @param {Array} pData
 * @param {string} [pOrder='asc']
 * @param {string} [pAttrData='data']
 * @returns
 */
const sortByDate = (pData, pOrder = 'asc', pAttrData = 'data') => {
    const xDataOrdered = Object.values(pData).sort((a, b) => {
        let xDataA = new Date(a[pAttrData]);
        let xDataB = new Date(b[pAttrData]);

        if (pOrder === 'asc') {
            return xDataA - xDataB;
        } else {
            return xDataB - xDataA;
        }
    });

    return xDataOrdered;
};

export const filterByAttr = (pData, pAttr, pValue) => {
    const xDataFiltered = Object.values(pData).filter(x => x[pAttr] === pValue);

    return xDataFiltered;
};

/**
 * Reduz os dados em meses para anos
 *
 * @constructor
 * @param {Array} pArray Array de objetos
 * @return {object}
 */

export const reduceByPeriod = (pArray, pPeriod) => {
    let xResult = [];
    let xCounter = 0;
    //let xScaleCounter = 1;

    xResult.push(pArray[0]);

    for (let xI = 0; xI < pArray.length; xI++) {
        if (xCounter === pPeriod || xI === pArray.length - 1) {
            //pArray[xI].x = xScaleCounter.toString();
            xResult.push(pArray[xI]);
            xCounter = 0;

            //xScaleCounter++;
        }
        xCounter++;
    }

    return xResult;
};

export const reduceToYear = pArray => {
    let xResult = reduceByPeriod(pArray, 12);
    return xResult;
};

export const reduceToHalf = pArray => {
    let xResult = reduceByPeriod(pArray, 6);
    return xResult;
};

export const reduceToQuarter = pArray => {
    let xResult = reduceByPeriod(pArray, 3);
    return xResult;
};

export const dataScaleByPeriod = pData => {
    let xDatalengh = pData.length;
    let xScale = [];

    if (xDatalengh > 121) {
        xScale = reduceToYear(pData);
    } else if (xDatalengh <= 121 && xDatalengh > 50) {
        xScale = reduceToHalf(pData);
    } else if (xDatalengh <= 50 && xDatalengh > 26) {
        xScale = reduceToQuarter(pData);
    } else {
        xScale = pData;
    }

    return xScale;
};

const arrays = {
    sortByAttr,
    filterByAttr,
    dummyData,
    dummyObjectData,
    reduceByPeriod,
    reduceToYear,
    reduceToHalf,
    reduceToQuarter,
    dataScaleByPeriod,
    sortByDate
};

export default arrays;
