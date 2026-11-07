const input = document.getElementById("search");
const results = document.getElementById("results");
let index = [];

// Fetch the article list once, when the page loads
fetch("/api/search-index")
  .then((res) => res.json())
  .then((data) => { index = data; });

input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  results.innerHTML = "";

  if (!q) {
    results.hidden = true;
    return;
  }

  const matches = index
    .filter((a) => a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q))
    // title matches first
    .sort((a, b) => b.title.toLowerCase().includes(q) - a.title.toLowerCase().includes(q))
    .slice(0, 8);

  if (matches.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No results";
    results.appendChild(li);
  }

  for (const m of matches) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = m.url;
    link.textContent = m.title;          // textContent, not innerHTML
    const tag = document.createElement("span");
    tag.textContent = m.category;
    link.appendChild(tag);
    li.appendChild(link);
    results.appendChild(li);
  }
  results.hidden = false;
});

// Press "/" anywhere to jump to search; Escape to close
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== input) {
    e.preventDefault();
    input.focus();
  }
  if (e.key === "Escape") {
    results.hidden = true;
    input.blur();
  }
});

// Click outside closes the dropdown
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search")) results.hidden = true;
});