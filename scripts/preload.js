const fs = require('fs');

const pathToEntry = './build/index.html';
const mediaDirectoryPath = './build/static/media';

const bundlesRegExp = /\/static\/\w+\/\w+.[a-z0-9]+.[a-z0-9]+.\w{2,3}/g;
const splitBy = '</title>';

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const links = builtHTMLContent.match(bundlesRegExp);
const parts = builtHTMLContent.split(splitBy);
let fileWithPreload = [parts[0], splitBy];
let imagesPrefetch = [];

function task(pCallback) {
    links.forEach(link => {
        console.log(`[preload] ${link}`);
        let fileType = 'script';

        if (/\.css$/.test(link)) {
            fileType = 'style';
        }

        fileWithPreload = [
            ...fileWithPreload,
            `<link rel="preload" href=".${link}" as="${fileType}">`
        ];
    });

    fs.readdir(mediaDirectoryPath, (err, files) => {
        if (err) {
            return console.log(
                '\x1b[41m%s\x1b[0m',
                `Pasta '${mediaDirectoryPath}' não encontrada`
            );
        }

        for (filename of files) {
            console.log(`[prefetch] /static/media/${filename}`);
            imagesPrefetch = [
                ...imagesPrefetch,
                `<link rel="prefetch" src="./static/media/${filename}" as="image" />`
            ];
        }

        fileWithPreload = [...fileWithPreload, ...imagesPrefetch, parts[1]];
        fs.writeFileSync(pathToEntry, fileWithPreload.join(''));
        pCallback && pCallback();
    });
}

task(() =>
    console.log(
        '\x1b[32m%s\x1b[0m',
        `Preloads e Prefetchs adiconados com sucesso! 💯 👍 `
    )
);
