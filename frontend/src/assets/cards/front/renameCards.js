const fs = require('node:fs');
const path = require('node:path');

const directory = './';

const renameMap = {
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  jack: 'jack',
  queen: 'queen',
  king: 'king',
  ace: 'ace',
};

fs.readdir(directory, (err, files) => {
  if (err)
    throw err;

  files.forEach((file) => {
    for (const key in renameMap) {
      if (file.includes(`_${key}.svg`)) {
        const newName = file.replace(`_${key}.svg`, `_${renameMap[key]}.svg`);
        fs.rename(path.join(directory, file), path.join(directory, newName), (err) => {
          if (err)
            throw err;
        });
      }
    }
  });
});
