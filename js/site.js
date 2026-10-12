// Theme button (auto / light / dark, remembered per browser) and the figure lightbox.
(function () {
  var KEY = "sg.theme", order = ["auto", "light", "dark"], label = { auto: "◐ Auto", light: "☀ Light", dark: "☾ Dark" };
  var root = document.documentElement, btn = document.getElementById("themeBtn");
  function current() { return root.dataset.theme || "auto"; }
  function paint() { if (btn) { btn.textContent = label[current()]; btn.setAttribute("aria-label", "Theme: " + current()); } }
  if (btn) btn.addEventListener("click", function () {
    var next = order[(order.indexOf(current()) + 1) % order.length];
    if (next === "auto") delete root.dataset.theme; else root.dataset.theme = next;
    try { if (next === "auto") localStorage.removeItem(KEY); else localStorage.setItem(KEY, next); } catch (e) {}
    paint();
  });
  paint();

  var box = document.createElement("div");
  box.className = "lightbox"; box.hidden = true;
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  function close() { box.hidden = true; }
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest(".figure img");
    if (!img) return;
    box.firstChild.src = img.currentSrc || img.src; box.firstChild.alt = img.alt; box.hidden = false;
  });
})();
