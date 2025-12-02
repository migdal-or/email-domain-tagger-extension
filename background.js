// background.js
// Initialize context menu
function createContextMenu() {
  browser.contextMenus.create({
    id: "insert-tagged-email",
    title: "Insert Tagged Email",
    contexts: ["editable"]
  });
}

// Check if email is configured and create menu
function initializeExtension() {
  browser.storage.local.get(['baseEmail']).then((result) => {
    if (result.baseEmail && result.baseEmail.trim() !== '' && result.baseEmail.includes('@')) {
      createContextMenu();
    } else {
      // Remove context menu if it exists but email isn't configured
      browser.contextMenus.removeAll();
    }
  });
}

// Initialize when extension loads
initializeExtension();

// Listen for storage changes to update context menu
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'baseEmail' in changes) {
    initializeExtension();
  }
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "insert-tagged-email") {
    browser.storage.local.get(['baseEmail']).then((result) => {
      if (!result.baseEmail || result.baseEmail.trim() === '' || !result.baseEmail.includes('@')) {
        browser.notifications.create({
          type: "basic",
          title: "Email Domain Tagger",
          message: "Please configure your email in the extension settings first.",
          iconUrl: browser.runtime.getURL("icons/icon-48.png") || ""
        });
        
        // Open options page
        browser.runtime.openOptionsPage();
        return;
      }
      
      browser.tabs.executeScript(tab.id, {
        code: "getCurrentDomain();"
      }).then(results => {
        let domain = results[0] || "unknown";
        domain = domain.replace(/^www\./, "").replace(/[^a-zA-Z0-9]/g, '');
        
        const [username, emailDomain] = result.baseEmail.split('@');
        let taggedEmail = `${username}+${domain}@${emailDomain}`;
        
        browser.tabs.executeScript(tab.id, {
          code: `insertEmail("${taggedEmail}");`
        });
      });
    });
  }
});
