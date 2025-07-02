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
        // Find all spans with data-sentry-mask inside the newly added node
        const spans = node.querySelectorAll('span[data-sentry-mask="true"]');
        spans.forEach(span => {
          span.style.display = 'none';
        });
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Also hide any already present masked spans on page load
document.querySelectorAll('span[data-sentry-mask="true"]').forEach(span => {
  span.style.display = 'none';
});
