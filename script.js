// Simple boot screen
setTimeout(() => {
  document.getElementById("boot-screen").style.display = "none";
}, 2000);

// Drag logic
const windows = document.querySelectorAll(".window");

windows.forEach(win => {
  const header = win.querySelector(".title-bar");
  let offsetX, offsetY, isDragging = false;

  header.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = 999;
  });

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Close button
  const closeBtn = win.querySelector(".btn-close");
  closeBtn.addEventListener("click", () => {
    win.style.display = "none";
  });
});
