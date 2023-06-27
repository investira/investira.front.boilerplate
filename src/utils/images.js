export function imageSet(pImageUrl, pImageName) {
    const xImage = pImageUrl + pImageName;
    return [
        {
            srcSet: `${xImage}@1x.png 1x, ${xImage}@2x.png 2x, ${xImage}@3x.png 3x`
        }
    ];
}

export function toDataUrl(pUrl) {
    return fetch(pUrl)
        .then(response => response.blob())
        .then(blob => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        });
}

export default {
    imageSet,
    toDataUrl
};
