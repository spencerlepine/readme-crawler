import fetchAndProcessRepo from "./src/processRepo/fetchAndProcessRepo.js";
import saveLinkToQueue from "./src/processLinkQueue/saveLinkToQueue.js";
import getNextLinkFromQueue from "./src/processLinkQueue/getNextLinkFromQueue.js";
import fs from "fs";

/* Author: @spencerlepine
   _______  _____  ______________    __   _______  _____  ______
  / __/ _ \/ __/ |/ / ___/ __/ _ \  / /  / __/ _ \/  _/ |/ / __/
 _\ \/ ___/ _//    / /__/ _// , _/ / /__/ _// ___// //    / _/
/___/_/  /___/_/|_/\___/___/_/|_| /____/___/_/  /___/_/|_/___/
*/

class ReadMeCrawler {
  constructor({ startUrl, followReadMeLinks, outputFolderPath }) {
    this.outputFolderPath = outputFolderPath;
    this.startUrl = startUrl;
    this.followReadMeLinks =
      followReadMeLinks !== undefined ? followReadMeLinks : false;

    if (
      !(
        typeof this.outputFolderPath === "string" &&
        typeof this.followReadMeLinks === "boolean" &&
        typeof this.startUrl === "string"
      )
    ) {
      throw new Error("Invalid configuration object");
    }
  }

  async run() {
    const repositoriesFolder = this.outputFolderPath + "repositories/";
    const linkQueueFile = "linkQueue.txt";

    const linkListCallback = async function (linkList) {
      const outputFolderPath = this.outputFolderPath;
      if (this.followReadMeLinks) {
        await linkList.forEach(async (link) => {
          await saveLinkToQueue(link, outputFolderPath, linkQueueFile);
        });
      }
    }.bind(this);

    if (!fs.existsSync(this.outputFolderPath)) {
      fs.mkdirSync(this.outputFolderPath);
      fs.mkdirSync(repositoriesFolder);
      fs.writeFile(this.outputFolderPath + "linkQueue.txt", "", () => { });
    }

    let nextURL = this.startUrl;
    if (this.followReadMeLinks) {
      nextURL =
        (await getNextLinkFromQueue(this.outputFolderPath, linkQueueFile)) ||
        this.startUrl;
    }

    while (nextURL) {
      fetchAndProcessRepo(nextURL, repositoriesFolder, linkListCallback);
      nextURL = await getNextLinkFromQueue(this.outputFolderPath, linkQueueFile);
    }

  }
}

export default ReadMeCrawler;
