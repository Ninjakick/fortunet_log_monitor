const fs = require('fs');
require('log-timestamp');

const buttonPressesLogFile = './log/data.log';

console.log(`Watching for file changes on ${buttonPressesLogFile}`);

fs.watchFile(buttonPressesLogFile, (curr, prev) => {
  console.log(`${buttonPressesLogFile} file Changed`);
});