const btn = document.getElementById("menu-btn");
const backdrop = document.getElementById("backdrop");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  btn.setAttribute("aria-expanded", open);
}

btn.addEventListener("click", () => {
  setMenu(!document.body.classList.contains("menu-open"));
});
backdrop.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});