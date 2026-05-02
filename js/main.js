const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Load saved theme
document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("theme") || "light"
);
