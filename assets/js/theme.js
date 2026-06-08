(function () {
  function updateThemeButton(button, isDark) {
    if (!button) return;
    button.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    window.localStorage.setItem('promptAtlasTheme', isDark ? 'dark' : 'light');
    var button = document.getElementById('themeToggle');
    updateThemeButton(button, isDark);
  }

  function initializeThemeMode() {
    var button = document.getElementById('themeToggle');
    var currentTheme = window.localStorage.getItem('promptAtlasTheme');
    var isDark = currentTheme === 'dark';
    setTheme(isDark);

    if (!button) return;

    button.addEventListener('click', function () {
      var nextDark = !document.documentElement.classList.contains('dark');
      setTheme(nextDark);
    });
  }

  document.addEventListener('DOMContentLoaded', initializeThemeMode);
})();
