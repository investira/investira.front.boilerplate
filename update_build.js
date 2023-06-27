// Este scripot será sempre executado ao gerar um novo build

const dates = require('investira.sdk').dates;
const formats = require('investira.sdk').formats;

const fs = require('fs');
const filePath = './package.json';

const packageJson = JSON.parse(fs.readFileSync(filePath).toString());

packageJson.buildDate = new Date().getTime();

fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));

const jsonData = {
    buildDate: packageJson.buildDate
};

const jsonContent = JSON.stringify(jsonData);

const xBuildDate = formats.formatDateCustom(dates.toDate(jsonData.buildDate), 'YYYYMMDD.HHmm');

console.log('\x1b[33m%s\x1b[0m', `#BUILD => ${xBuildDate}`);

fs.writeFile('./public/meta.json', jsonContent, 'utf8', function (error) {
    if (error) {
        console.log('Ocorreu um erro ao salvar a data e hora da compilação para meta.json');

        return console.log(error);
    }

    console.log('Última data e hora de compilação atualizada no arquivo meta.json');
});
