export const getLinksFromDOM = function (jsDOM, verifyLinkCallback) {
  try {
    const validLinks = [];

    const linkElements = (jsDOM && jsDOM.getElementsByTagName("a")) || [];
    for (let i = 0; i < linkElements.length; i++) {
      const thisElement = linkElements[i];
      const thisUrl = thisElement.href;

      if (verifyLinkCallback(thisUrl)) {
        const validHref =
          /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;
        if (validHref.test(thisUrl)) {
          validLinks.push(thisUrl);
        }
      }
    }

    return validLinks;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getLinksFromDOM;
