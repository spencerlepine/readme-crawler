import fs from "fs";
var { promises: fsPromise } = fs;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getNextLinkFromQueue = async function (outputFolderPath, outputFileName) {
  const filePath = outputFolderPath + outputFileName;
  let deletedLine = "";
  const setDeletedLine = (line) => (deletedLine = line);

  await sleep(300);
  await readPromise(filePath, setDeletedLine);
  return deletedLine;
};

const readPromise = async (filePath, cb) => {
  if (fs.existsSync(filePath)) {
    await fsPromise
      .readFile(filePath, "utf8", function (err, data) {
        if (err) {
          console.log("Error retrieving the next line from link queue.");
        }
      })
      .then(async (data) => {
        const lines = data.split("\n");
        const linesExceptFirst = lines.slice(1).join("\n");

        await fsPromise
          .writeFile(filePath, linesExceptFirst, function (err) {
            if (err) throw err;
            // console.log("deleted line successfully.");
          })
          .then((res) => {
            cb(lines[0]);
          });
      });
  }
};

export default getNextLinkFromQueue;
