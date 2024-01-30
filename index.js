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
    sortedJson.push(tableHeaderSorted);

    for (const row of result) {
      const tempRow = [];

      for (const value of tableHeaderSorted) {
        tempRow.push(row[value]);
      }

      sortedJson.push(tempRow);
    }

    console.log(asTable(sortedJson));
  });
