// Shared by every page: the drifting flowers and the entrance animation.

// The flowers are decoration only, so they are added here once instead of being copied into each page.
document.body.insertAdjacentHTML('afterbegin', `
<div class="flowers" aria-hidden="true">
  <svg width="0" height="0"><symbol id="flower" viewBox="-50 -50 100 100">
    <g fill="currentColor">
      <ellipse cy="-26" rx="13" ry="24"/>
      <ellipse cy="-26" rx="13" ry="24" transform="rotate(72)"/>
      <ellipse cy="-26" rx="13" ry="24" transform="rotate(144)"/>
      <ellipse cy="-26" rx="13" ry="24" transform="rotate(216)"/>
      <ellipse cy="-26" rx="13" ry="24" transform="rotate(288)"/>
    </g>
    <circle r="8" fill="#ffe9a8"/>
  </symbol></svg>
  <svg style="--x:68%;--y:5%;--s:64px;--b:3px;--d:8s"><use href="#flower"/></svg>
  <svg style="--x:82%;--y:2%;--s:90px;--b:7px;--d:11s;--c:#d59cff"><use href="#flower"/></svg>
  <svg style="--x:92%;--y:14%;--s:54px;--b:4px;--d:7s;--c:#ff9ecb"><use href="#flower"/></svg>
  <svg style="--x:74%;--y:17%;--s:36px;--b:2px;--d:10s;--c:#d59cff"><use href="#flower"/></svg>
  <svg style="--x:4%;--y:20%;--s:44px;--b:6px;--d:12s;--c:#ff9ecb"><use href="#flower"/></svg>
  <svg style="--x:-2%;--y:58%;--s:100px;--b:12px;--d:13s"><use href="#flower"/></svg>
  <svg style="--x:94%;--y:48%;--s:48px;--b:8px;--d:9s"><use href="#flower"/></svg>
  <svg style="--x:90%;--y:80%;--s:120px;--b:14px;--d:14s;--c:#d59cff"><use href="#flower"/></svg>
  <svg style="--x:3%;--y:90%;--s:60px;--b:5px;--d:10s;--c:#ff9ecb"><use href="#flower"/></svg>
</div>
`);

// Entrance animation: wrap each word of the intro in a span so it can appear on its own delay,
// then queue the project cards after the last word. Without JavaScript the page just shows as normal.
(() => {
  let delay = 550; // the name finishes writing first
  const nodes = [];
  const intro = document.querySelector('.intro'); // only the home page has one
  const walker = intro && document.createTreeWalker(intro, NodeFilter.SHOW_TEXT);
  while (walker?.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const parent = node.parentElement;
    if (parent.closest('h1') || !node.textContent.trim()) continue;
    if (parent.tagName === 'MARK') { // a highlighted phrase arrives whole, so its box never shows up empty
      parent.classList.add('w');
      parent.style.animationDelay = `${delay += 22}ms`;
      continue;
    }
    const words = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part.trim()) { words.append(part); continue; }
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = part;
      span.style.animationDelay = `${delay += 22}ms`;
      words.append(span);
    }
    node.replaceWith(words);
  }
  for (const el of document.querySelectorAll('#projects-title, .grid li, .project')) {
    el.classList.add('pop');
    el.style.animationDelay = `${delay += 90}ms`;
  }
})();
