function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const storageKey = 'theme-preference';

  // detect system preference
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // initialize
  function applyTheme(theme){
    if(theme === 'light'){
      root.classList.add('light');
      toggle.setAttribute('aria-checked','true');
    } else {
      root.classList.remove('light');
      toggle.setAttribute('aria-checked','false');
    }
  }

  const saved = localStorage.getItem(storageKey);
  if(saved === 'light' || saved === 'dark'){
    applyTheme(saved);
  } else {
    applyTheme(systemDark ? 'dark' : 'light');
  }

  // toggle handler
  if(toggle){
      toggle.addEventListener('click', () => {
        // if reduced motion, keep it simple
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isLight = root.classList.contains('light');
        const newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(storageKey, newTheme);

        // Add a little class to animate a micro-burst if motion allowed
        if(!prefersReduced){
          root.classList.add('theme-switching');
          window.setTimeout(()=>root.classList.remove('theme-switching'), 500);
        }
      });

      // keyboard accessibility
      toggle.addEventListener('keydown', (e)=> {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          toggle.click();
        }
      });
  }
})();