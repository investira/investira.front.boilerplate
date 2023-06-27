export const errorThrow = pError => {
    if (pError) {
        throw new Error(pError);
    }
};

export default { errorThrow };
