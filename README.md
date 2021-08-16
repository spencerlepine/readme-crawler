# README Crawler (npm package)

[![version](https://img.shields.io/npm/v/readme-crawler.svg?style=flat-square)](http://npm.im/readme-crawler)
[![downloads](https://img.shields.io/npm/dm/readme-crawler.svg?style=flat-square)](http://npm-stat.com/charts.html?package=readme-crawler&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/readme-crawler.svg?style=flat-square)](http://opensource.org/licenses/MIT)

A Node.js webcrawler to download README files and recursively follow contained GitHub repository links. Read more [here](https://spencerlepine.com/blog/building-a-readme-crawler-with-node-js).

Fetch the default README files display at a GitHub repository [URL](https://github.com/example-user/awesome-project).

## Installation
```npm install --save readme-crawler```

## Usage
Create a new crawler instance and pass in a configuration object. Call the ```run``` method to download the README at the given URL.
```js
  import ReadMeCrawler from 'readme-crawler';

  var crawler = new ReadMeCrawler({
    startUrl: 'https://github.com/jnv/lists',
    followReadMeLinks: true,
    outputFolderPath: './output/'
  });

  // -> fetch https://github.com/jnv/lists
  // -> download README in project root directory
  // -> export to new folder in root/output/repositories
  // -> generate list of other repository links
  // -> repeat steps on each link
  crawler.run();
```

### Configuration Properties

| Name              | Type      | Description                                                    |
| ---------------   | --------- | ---------------------------------------------------------------|
| startUrl          | `string`  | GitHub repository URL formated 'https://github.com/user/repo'  |
| followReadMeLinks | `boolean` | Recursively follow README links and export data at each repo   |
| outputFolderPath  | `string`  | Folder in for README downloads starting in project root        |

---

## Crawler Error

***Issue:*** each repo link will be written to a file named ```linkQueue.txt```. There could be issues writing to this file asynchronously while the crawler is activated.

***Solution:*** restart the crawler with ```craweler.run()``` again. The link queue should contain links to use, but the crawler tried to read from the file before the file was finished writing.

---

> [spencerlepine.com](https://www.spencerlepine.com) &nbsp;&middot;&nbsp; GitHub [@spencerlepine](https://github.com/spencerlepine) &nbsp;&middot;&nbsp; Twitter [@spencerlepine](http://twitter.com/spencerlepine)
