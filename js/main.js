const randomizeButton = document.querySelector('.btn');

// Get relative luminance
function getLuminance(hex) {
  const rgb = parseInt(hex.replace('#', ''), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const [R, G, B] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Get contrast ratio between two hex colors
function getContrast(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Generate a random hex color
function getRandomHexColor() {
  return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function randomizeColor() {
  let bgColor = getRandomHexColor();
  let textColor = getRandomHexColor();

  // Ensure contrast is at least 4.5:1 (AA standard)
  while (getContrast('#' + bgColor, '#' + textColor) < 4.5) {
    textColor = getRandomHexColor(); // Regenerate text color
  }

  const cardResult = document.querySelector('.card-result');
  const cardInfo = document.querySelectorAll('.card-info');

  cardResult.style.background = '#' + bgColor;
  cardResult.style.color = '#' + textColor;

  cardInfo[0].style.background = '#' + textColor;
  cardInfo[0].style.color = '#' + bgColor;
  cardInfo[0].lastElementChild.innerHTML = '#' + textColor;

  cardInfo[1].style.background = '#' + bgColor;
  cardInfo[1].style.color = '#' + textColor;
  cardInfo[1].lastElementChild.innerHTML = '#' + bgColor;
}

randomizeButton.addEventListener('click', randomizeColor);

// Light/Dark Mode
const LightDarkMode = document.querySelector('.light-dark-mode');

function switchColorMode(){
  const lightMode = document.querySelector('.light');

  if (lightMode.classList.contains('bi-sun-fill')) {
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
    lightMode.style.color = '#fff';
    randomizeButton.style.background = '#fff';
    randomizeButton.style.color = '#000';
  } else if (lightMode.classList.contains('bi-moon-fill')) {
    document.body.style.background = '#fff';
    document.body.style.color = '#000';
    lightMode.style.color = '#000';
    randomizeButton.style.background = '#000';
    randomizeButton.style.color = '#fff';
  }

  // Toggle
  lightMode.classList.toggle('bi-sun-fill');
  lightMode.classList.toggle('bi-moon-fill');


}

LightDarkMode.addEventListener('click', switchColorMode);
