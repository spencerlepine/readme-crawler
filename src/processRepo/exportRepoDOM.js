// const spellCheckCmd = 'yaspeller -l en output/ellisonleao_magictools_README.md --find-repeat-words --ignore-digits --ignore-urls --only-errors &> output/output.txt'
import parseGitHubUrl from "parse-github-url";
import fs from "fs";
import { getLinksFromDOM } from "./getLinksFromDOM.js";
import TurndownService from "turndown";

const turndownService = new TurndownService();

export const exportRepoDOM = async function (
  readmeNode,
  repoURL,
  outputFolderPath
) {
  if (readmeNode) {
    const { name, owner, href } = parseGitHubUrl(repoURL);
    const folderDestination = `${outputFolderPath}${owner}-${name}/`;

    if (!fs.existsSync(folderDestination)) {
      fs.mkdirSync(folderDestination);
    }

    const markdown = turndownService.turndown(readmeNode.outerHTML);
    createMarkdownFile(markdown, folderDestination);

    const info = `URL=${href}\nGIT_URL=${href}.git\nREPO_NAME=${name}\nOWNER=${owner}\n`;
    createInfoFile(info, folderDestination);
  }
};

const createMarkdownFile = function (markdown, outputFolderPath) {
  const filepath = outputFolderPath + "README.md";
  if (!fs.existsSync(filepath)) {
    fs.writeFile(filepath, markdown, function (err) {
      if (err) throw err;
      // console.log('created README.md');
    });
  }
};

const createInfoFile = function (info, outputFolderPath) {
  const filepath = outputFolderPath + "info.txt";
  if (!fs.existsSync(filepath)) {
    fs.writeFile(filepath, info, function (err) {
      if (err) throw err;
      // console.log('created info.txt');
    });
  }
};

export default exportRepoDOM;
