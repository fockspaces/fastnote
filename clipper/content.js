chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check that the message type is 'clipText'
  if (message.type === "clipText") {
    // Get the selected text on the page
    const selectedText = window.getSelection().toString();
    // Send the selected text back to the background script
    sendResponse(selectedText);
  }
});
