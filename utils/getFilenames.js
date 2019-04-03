const { readdir, writeFile } = require('fs');
const { resolve } = require('path');

const FOLDERPATH = 'docs/vue';

readdir(FOLDERPATH, (err, files) => {
  let filenames = [];
  files.forEach(file => {
    if (file === 'README.md') {
      file = `''`;
    } else {
      file = file.replace('.md', '');
      file = `'${file}'`;
    }
    filenames.push(file);
  });

  filenames.sort(); // 排序

  writeFile(resolve(__dirname, './filenames.js'), `[${filenames}]`, () => {
    console.log('文件名获取完成.');
  })
});

