import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const fetchReadMeDOMFromRepoURL = async function (url) {
  let destinationDOM;

  await fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      const { document } = new JSDOM(data).window;
      const readmeNode = document.querySelector(".markdown-body");
      destinationDOM = readmeNode;
    })
    .catch((err) => {
      console.warn("Could not fetch url: " + url);
    });

  return destinationDOM;
};

export default fetchReadMeDOMFromRepoURL;
