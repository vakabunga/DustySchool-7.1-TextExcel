const asTable = require('as-table');
const helper = require('csvtojson');

const csvFilePath = './sample1.csv';
const csv = require('csvtojson')
csv()
  .fromFile(csvFilePath)
  .then((result) => {
    const tableHeader = Object.keys(result[0]);
    const tableHeaderNumbers = tableHeader.filter(item => typeof +item === 'number' && !isNaN(+item)).sort((a, b) => +a - +b);
    const tableHeaderStrings = tableHeader.filter(item => typeof item === 'string' && isNaN(+item)).sort((a, b) => b < a ? -1 : 1);
    const tableHeaderSorted = [...tableHeaderStrings, ...tableHeaderNumbers];
    const sortedJson = [];

    // Sorting the Object by sorted Keys doesn't work
    for (const row of result) {
      const sortedRow = tableHeaderSorted.reduce((obj, header) => {
        obj[header] = row[header];
        return obj;
      }, {});
      sortedJson.push(sortedRow);
    }

    console.log(asTable(sortedJson));
  });
