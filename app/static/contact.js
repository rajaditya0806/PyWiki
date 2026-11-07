const form = document.getElementById("contact-form");
const status = document.getElementById("contact-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();                     // stop the browser from reloading the page
  status.textContent = "Sending…";

    try {
    const res = await fetch("https://formspree.io/f/xeaawljk", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: form.email.value, message: form.message.value }),
    });

    if (res.ok) {
      status.textContent = "Thanks! I'll get back to you soon.";
      form.reset();
    } else {
      status.textContent = "Something went wrong. Please check your email and try again.";
    }
  } catch {
    status.textContent = "Couldn't reach the server. Check your connection and try again.";
  }
});