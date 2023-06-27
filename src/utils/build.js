/**
 * Remove console.log do build de produção
 */

export const noLog = () => {
    function noop() {}

    if (process.env.NODE_ENV !== 'development') {
        console.log = noop;
    }
};

export const noTrace = () => {
    function noop() {}

    if (process.env.NODE_ENV !== 'development') {
        console.trace = noop;
    }
};

export default { noLog, noTrace };
