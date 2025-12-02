// options.js
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function saveOptions(e) {
  e.preventDefault();
  const email = document.querySelector("#baseEmail").value.trim();
  const status = document.querySelector("#status");
  
  if (!email || !validateEmail(email)) {
    status.textContent = "Error: Please enter a valid email address.";
    status.className = "status error";
    return;
  }
  
  browser.storage.local.set({
    baseEmail: email
  }).then(() => {
    status.textContent = "Options saved successfully.";
    status.className = "status success";
    setTimeout(() => {
      status.textContent = "";
      status.className = "status";
    }, 2000);
  });
}

function restoreOptions() {
  browser.storage.local.get("baseEmail").then((result) => {
    document.querySelector("#baseEmail").value = result.baseEmail || "";
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
