const deconstructURL = (url) => {
    const pattern = /(?:https?:\/\/)?(?:www\.)?([^./]+)/;
    const matches = url.match(pattern);
    return matches ? matches[1] : '';
  }

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        console.log(tab.url)
        const updateProperties = {
            url: 'https://google.com'
        }
        // deconstructURL(tab.url)
        if (deconstructURL(tab.url) == 'facebook') {
            chrome.tabs.update( tabId,updateProperties)
        }
    }
);