const style = document.createElement("style");
style.textContent = `
:root {
    --user-select-accessibility-setting: default !important;
}

* {
  user-select: var(--user-select-accessibility-setting) !important;
}
`;

document.head.appendChild(style);

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === 1) { // element node
        if (node.matches && node.matches('div[class^="_HiddenAt"]')) {
          node.style.display = 'none';
        } else {
          const hiddenDescendants = node.querySelectorAll('div[class^="_HiddenAt"]');
          hiddenDescendants.forEach(el => {
            el.style.display = 'none';
          });
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial hide on page load
document.querySelectorAll('div[class^="_HiddenAt"]').forEach(el => {
  el.style.display = 'none';
});
