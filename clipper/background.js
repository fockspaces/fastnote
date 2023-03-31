chrome.browserAction.onClicked.addListener(() => {
  // Send a message to the content script to clip the selected text
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "clipText" }, (response) => {
      // Create a new tab with the clipped text
      chrome.tabs.create({
        url: `https://example.com/clip?text=${encodeURIComponent(response)}`,
      });
    });
  });
});
