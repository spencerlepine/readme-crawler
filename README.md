# README Crawler

A Node.js webcrawler to navigate README links.

Download default README files from a GitHub repository [URL](https://github.com/example-user/awesome-project).

## Installation
```npm install --save readme-crawler```

## Usage
Create a new crawler instance and pass in a configuration object. Call the ```run``` method to download the README at the given URL.
```
  import readMeCrawler from 'readme-crawler';

  var crawler = new readMeCrawler({
    startUrl: 'https://github.com/jnv/lists',
    followReadMeLinks: true,
    outputFolderPath: './output/'
  });

  crawler.run();
```

### Configuration Properties

| Name              | Type     | Description                                                    |
| ---------------   | -------- | ---------------------------------------------------------------|
| startUrl          | `string` | GitHub repository URL formated 'https://github.com/user/repo'   |
| followReadMeLinks | `boolean` | Override or extend the styles applied to the component.       |
| outputFolderPath  | `string` | Folder in for README downloads starting in project root        |

> [spencerlepine.com](https://www.spencerlepine.com) &nbsp;&middot;&nbsp; GitHub [@spencerlepine](https://github.com/spencerlepine) &nbsp;&middot;&nbsp; Twitter [@spencerlepine](http://twitter.com/spencerlepine)
