// popup.js
document.getElementById('openOptions').addEventListener('click', function() {
  browser.runtime.openOptionsPage();
});

browser.storage.local.get(['baseEmail']).then((result) => {
  const emailStatus = document.getElementById('emailStatus');
  
  if (!result.baseEmail || result.baseEmail.trim() === '' || !result.baseEmail.includes('@')) {
    emailStatus.innerHTML = '<p class="warning">⚠️ No email configured!</p>' +
                           '<p>Please set up your email in the settings.</p>';
  } else {
    emailStatus.innerHTML = '<p>Current email: <strong>' + result.baseEmail + '</strong></p>' +
                           '<p>Ready to use domain tagging.</p>';
  }
});
