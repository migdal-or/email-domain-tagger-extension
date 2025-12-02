// content.js
function getCurrentDomain() {
  return window.location.hostname;
}

function insertEmail(email) {
  const activeElement = document.activeElement;
  
  if (activeElement && 
      (activeElement.isContentEditable || 
       activeElement.tagName === 'TEXTAREA' || 
       activeElement.tagName === 'INPUT')) {
    
    // Get current cursor position
    const startPos = activeElement.selectionStart || 0;
    const endPos = activeElement.selectionEnd || 0;
    
    if (activeElement.isContentEditable) {
      // Handle contentEditable elements
      document.execCommand('insertText', false, email);
    } else {
      // Handle input and textarea elements
      const value = activeElement.value;
      activeElement.value = value.substring(0, startPos) + 
                            email + 
                            value.substring(endPos);
      
      // Set cursor position after the inserted email
      activeElement.selectionStart = activeElement.selectionEnd = startPos + email.length;
    }
  }
}
