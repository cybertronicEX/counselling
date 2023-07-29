function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
  }
  
  function changeWallpaper() {
    var wallpaperInput = document.getElementById("wallpaperInput");
    var wallpaperUrl = wallpaperInput.value;
    var body = document.body;
    body.style.backgroundImage = `url(${wallpaperUrl})`;
  }
  
  function changeFontSize() {
    var fontSizeInput = document.getElementById("fontSizeInput");
    var fontSize = fontSizeInput.value;
    var body = document.body;
    body.style.fontSize = `${fontSize}px`;
  }
  