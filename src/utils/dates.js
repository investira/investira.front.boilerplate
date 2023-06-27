import { dates as invDates, formats } from 'investira.sdk';

function humanizeDate(pStrDate, pPrefix = {}) {
    const xDate = invDates.toDate(pStrDate);
    const xNow = invDates.toDate();

    const xPrefix = { hoje: '', ontem: '', amanha: '', mes: '', ano: '', ...pPrefix };

    // Verifica se a xDate é hoje
    if (xDate.toDateString() === xNow.toDateString()) {
        return `${xPrefix.hoje} hoje`;
    }

    // Verifica se a xDate é ontem
    const xYesterday = new Date(xNow);
    xYesterday.setDate(xYesterday.getDate() - 1);
    if (xDate.toDateString() === xYesterday.toDateString()) {
        return `${xPrefix.ontem} ontem`;
    }

    // Verifica se a xDate é amanhã
    const xTomorrow = new Date(xNow);
    xTomorrow.setDate(xTomorrow.getDate() + 1);

    if (xDate.toDateString() === xTomorrow.toDateString()) {
        return `${xPrefix.amanha} amanhã`;
    }

    // Verifica se a xDate está no mesmo ano
    if (xDate.getFullYear() === xNow.getFullYear()) {
        return `${xPrefix.mes} ${formats.formatDateCustom(xDate, 'DD/MM')}`;
    }

    // Data em outro ano
    return `${xPrefix.ano} ${formats.formatDateCustom(xDate, 'DD/MM/YYYY')}`;
}

const dates = {
    humanizeDate
};

export default dates;
