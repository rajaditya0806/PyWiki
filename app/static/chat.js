const toggle = document.getElementById("chat-toggle");
const panel = document.getElementById("chat");
const log = document.getElementById("chat-log");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

toggle.addEventListener("click", () => {
  panel.hidden = !panel.hidden;
  if (!panel.hidden) input.focus();
});
document.getElementById("chat-close").addEventListener("click", () => (panel.hidden = true));

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;               // textContent, never innerHTML, for AI output too
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";
  const reply = addMessage("Thinking…", "bot");

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    let data = {};
    try { data = await res.json(); } catch {}          // error pages may not be JSON

    if (!res.ok) {
      reply.textContent = typeof data.detail === "string" ? data.detail : "Something went wrong. Please try again.";
      return;
    }

    reply.textContent = data.answer;

    if (data.sources && data.sources.length) {
      const src = document.createElement("div");
      src.className = "sources";
      src.append("Related: ");
      data.sources.forEach((s, i) => {
        const a = document.createElement("a");
        a.href = s.url;
        a.textContent = s.title;
        src.append(a, i < data.sources.length - 1 ? " · " : "");
      });
      reply.appendChild(src);
    }
  } catch {
    reply.textContent = "Couldn't reach the server. Check your connection.";
  }
  log.scrollTop = log.scrollHeight;
});