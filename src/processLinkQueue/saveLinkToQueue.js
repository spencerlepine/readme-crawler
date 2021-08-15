import fs from "fs";

const saveLinkToQueue = function (linkStr, outputFolderPath, outputFileName) {
  try {
    const filePath = outputFolderPath + outputFileName;
    if (fs.existsSync(filePath)) {
      fs.appendFile(filePath, linkStr + "\r\n", function (err) {
        if (err) throw err;
        // console.log('added link to queue file');
      });
    } else {
      fs.writeFile(filePath, linkStr + "\r\n", function (err) {
        if (err) throw err;
        // console.log('added link to queue file');
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export default saveLinkToQueue;
