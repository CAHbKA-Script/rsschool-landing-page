let lightTheme = localStorage.getItem('theme') !== 'false';
console.log(localStorage.getItem('theme'))
if (!lightTheme) {
    document.body.classList.toggle('dark-theme');
}

let toggleSun = document.getElementsByClassName('toggle__sun')[0];
let toggleMoon = document.getElementsByClassName('toggle__moon')[0];

toggleSun.addEventListener('click', ()=> {
  if (!lightTheme) {
    lightTheme = true;
    localStorage.setItem('theme', JSON.stringify(lightTheme));
    document.body.classList.toggle('dark-theme');
  }
});

toggleMoon.addEventListener('click', ()=> {
  if (lightTheme) {
    lightTheme = false;
    localStorage.setItem('theme', JSON.stringify(lightTheme));
    document.body.classList.toggle('dark-theme');
  }
});