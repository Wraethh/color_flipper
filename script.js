const title = document.querySelector("h2");
const btn = document.getElementById("btn");
const colorId = document.querySelector(".color");
const history = document.getElementById("history");
const hexComponents = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const colorHistory = [];

btn.addEventListener("click", () => {
  let hexColor = "#";

  // Loop to get a random 6-digits hex number based on hexComponents array
  for (let i = 0; i < 6; i++) {
    hexColor += hexComponents[getRandomHexComponent()];
  }

  // Changes the text content of the "color" span with new color
  colorId.textContent = hexColor;

  // Changes the bg color of the body with randomly generated hex color
  document.body.style.backgroundColor = hexColor;

  // Gets the luminance index of the generated hex color
  const lumIndex = getLumIndex(hexColor);

  // Change texts color depending on luminance index for better accessibility
  if (lumIndex < 127) {
    title.style.color = "rgb(230, 230, 230)";
    btn.style.color = "rgb(230, 230, 230)";
    btn.style.borderColor = "rgb(230, 230, 230)";
  } else {
    title.style.color = "rgb(20, 20, 20)";
    btn.style.color = "rgb(20, 20, 20)";
    btn.style.borderColor = "rgb(20, 20, 20)";
  }

  // Creates li item with new color for history section
  const newColor = document.createElement("li");
  newColor.textContent = hexColor;
  newColor.id = hexColor;
  newColor.style.backgroundColor = hexColor;
  lumIndex < 127
    ? (newColor.style.color = "rgb(230, 230, 230)")
    : (newColor.style.color = "rgb(20, 20, 20)");
  history.appendChild(newColor);
  // newColor.classList.toggle("anim-add");
  // setTimeout(() => {
  //   newColor.classList.toggle("anim-add");
  // }, 450);

  // Pushes the new color in colorHistory array
  colorHistory.push(hexColor);

  // colorHistory.forEach((color) => {
  //   const currentColor = document.getElementById(color);
  //   currentColor.classList.toggle("anim-slide");
  //   setTimeout(() => {
  //     currentColor.classList.toggle("anim-slide");
  //   }, 450);
  // });

  // Removes oldest li item if colorHistory exceeds 5
  if (colorHistory.length > 5) {
    const firstColor = document.getElementById(colorHistory[0]);
    // firstColor.classList.add("anim-delete");
    // setTimeout(() => {
    history.removeChild(firstColor);
    // }, 450);
    colorHistory.shift();
  }
});

// Get a random index from hexComponents array
const getRandomHexComponent = () =>
  Math.floor(Math.random() * hexComponents.length);

// Finds if a color is light or dark by translating hex value to rgb and then calculating luminance
const getLumIndex = (color) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma;
};

// Test

title.addEventListener("click", () => {
  title.classList.add("anim-delete");
});
