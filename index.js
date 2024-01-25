const asTable = require('as-table');
const csv = require('csvtojson');

const csvFilePath = './sample1.csv';
csv()
  .fromFile(csvFilePath)
  .then((result) => {
    // a futile attempt to sort the object
    const tableHeader = Object.keys(result[0]);
    const tableHeaderNumbers = tableHeader.filter(item => typeof +item === 'number' && !isNaN(+item)).sort((a, b) => +a - +b);
    const tableHeaderStrings = tableHeader.filter(item => typeof item === 'string' && isNaN(+item)).sort((a, b) => b < a ? -1 : 1);
    const tableHeaderSorted = [...tableHeaderStrings, ...tableHeaderNumbers];
    const sortedJson = [];

    for (const row of result) {
      const map = new Map();
      const sortedRow = tableHeaderSorted.reduce((obj, header) => {
        obj[String(header)] = row[header];
        return obj;
      }, map);
      sortedJson.push(sortedRow);
    }

    console.log(asTable(sortedJson));
  });
