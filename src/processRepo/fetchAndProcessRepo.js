import fetchReadMeDOMFromRepoURL from "./fetchReadMeDOMFromRepoURL.js";
import exportRepoDOM from "./exportRepoDOM.js";
import parseGitHubUrl from "parse-github-url";
import getLinksFromDOM from "./getLinksFromDOM.js";

const fetchAndProcessRepo = async function (url, outputPath, linkListCallback) {
  const readmeNode = await fetchReadMeDOMFromRepoURL(url);
  exportRepoDOM(readmeNode, url, outputPath);

  const repoLinks = getLinksFromDOM(readmeNode, (link) => {
    const githubUrl = parseGitHubUrl(link);
    return githubUrl && githubUrl.host === "github.com";
  });

  linkListCallback(repoLinks);
};

export default fetchAndProcessRepo;
