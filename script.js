// Simple boot screen
setTimeout(() => {
  document.getElementById("boot-screen").style.display = "none";
}, 0);

// Drag logic
const windowIds = ["windowIntro", "windowIntro2", "window3"]; // Replace with your actual window IDs

windowIds.forEach(id => {
  const win = document.getElementById(id);
  if (!win) return;

  const header = win.querySelector(".title-bar");
  let offsetX, offsetY, isDragging = false;

  if (header) {
    header.addEventListener("mousedown", e => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;

      // Dynamically set zIndex to bring the window to the front
      const maxZIndex = windowIds.reduce((max, id) => {
        const el = document.getElementById(id);
        return el ? Math.max(max, parseInt(window.getComputedStyle(el).zIndex) || 0) : max;
      }, 0);
      win.style.zIndex = maxZIndex + 1;

      // Add event listeners dynamically
      const onMouseMove = e => {
        if (isDragging) {
          win.style.left = (e.clientX - offsetX) + "px";
          win.style.top = (e.clientY - offsetY) + "px";
        }
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  // Close button
  const closeBtn = win.querySelector(".btn-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      win.style.display = "none";
    });
  }
});
