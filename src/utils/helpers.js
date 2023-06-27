export function countNewNotifications(pData, pNotifications) {
    const xPrevNotificacoesSize = Object.values(pNotifications).length;
    const xNotificacoesSize = Object.values(pData).length;
    const xNewNotificationsAmount = Math.abs(xPrevNotificacoesSize - xNotificacoesSize);
    return xNewNotificationsAmount;
}

function getPath(pPathname = '', size = 1) {
    const xResult = pPathname.split('/')[size];
    return xResult;
}

function getRoute(pPathname = '', size = 2) {
    let xSize = size - 1;
    if (size <= 1) {
        xSize = 1;
    }
    let xResult = pPathname.split('/');
    const xPathSize = xResult.length;
    console.log(xResult);
    console.log(xResult);

    xResult = xResult.slice(0, xResult - xSize);

    console.log(xResult);
    xResult = xResult.join('/');

    return xResult;
}

const helpers = {
    countNewNotifications,
    getPath,
    getRoute
};

export default helpers;
