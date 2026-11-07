const form = document.getElementById("contact-form");
const status = document.getElementById("contact-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();                     // stop the browser from reloading the page
  status.textContent = "Sending…";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email.value, message: form.message.value }),
    });

    if (res.ok) {
      status.textContent = "Thanks! I'll get back to you soon.";
      form.reset();
    } else {
      const err = await res.json();
      status.textContent = typeof err.detail === "string" ? err.detail : "Please check your input.";
    }
  } catch {
    status.textContent = "Couldn't reach the server. Try again.";
  }
});