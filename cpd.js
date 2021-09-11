"use strict";

document.addEventListener("DOMContentLoaded", selectColor());
// selectHarmony();
function selectColor() {
  const colorWheel = document.querySelector("#colorwheel");
  colorWheel.addEventListener("input", controlCenter);
}
function selectHarmony(hslObject) {
  const harmony = document.querySelector("#harmony").value;

  if (harmony === "analogous") {
    console.log("analogous");

    const arrOfColors = [];
    for (let i = 1; i < 5; i++) {
      arrOfColors[i] = Object.assign({}, hslObject);
    }
    arrOfColors[1].h = Math.floor(Math.random() * 360);
    arrOfColors[2].h = Math.floor(Math.random() * 360);
    arrOfColors[3].h = Math.floor(Math.random() * 360);
    arrOfColors[4].h = Math.floor(Math.random() * 360);
    return arrOfColors;
  } else if (harmony === "monochromatic") {
    console.log("monochromatic");
    const arrOfColors = [];
    for (let i = 1; i < 5; i++) {
      arrOfColors[i] = Object.assign({}, hslObject);
    }
    arrOfColors[1].s = Math.floor(Math.random() * 360);
    arrOfColors[2].s = Math.floor(Math.random() * 360);
    arrOfColors[3].l = Math.floor(Math.random() * 360);
    arrOfColors[4].l = Math.floor(Math.random() * 360);
    return arrOfColors;
  } else if (harmony === "triad") {
    console.log("triad");
    const arrOfColors = [];
    for (let i = 1; i < 5; i++) {
      arrOfColors[i] = Object.assign({}, hslObject);
    }
    let newh = hslObject.h + 120;
    let newh1 = hslObject.h + 60;
    if (newh >= 360) {
      arrOfColors[1].h = newh %= 360;
      arrOfColors[2].h = newh1 %= 360;
      arrOfColors[3].h = newh %= 360;
      arrOfColors[4].h = newh1 %= 360;
    } else {
      arrOfColors[1].h = newh;
      arrOfColors[2].h = newh1;
      arrOfColors[3].h = newh;
      arrOfColors[4].h = newh1;
      arrOfColors[3].l = Math.floor(Math.random() * 360);
      arrOfColors[4].l = Math.floor(Math.random() * 360);
    }
    return arrOfColors;
  } else if (harmony === "complementary") {
    console.log("complementary");
    const arrOfColors = [];
    for (let i = 1; i < 5; i++) {
      arrOfColors[i] = Object.assign({}, hslObject);
    }
    let newh = hslObject.h + 180;
    if (newh >= 360) {
      arrOfColors[1].h = newh %= 360;
    } else {
      arrOfColors[1].h = newh;
    }
    arrOfColors[2].h = newh - 20;
    arrOfColors[3].h = newh + 90;
    arrOfColors[4].h = newh - 90;
    console.log(newh);
    return arrOfColors;
  } else if (harmony === "compound") {
    console.log("compound");
    const arrOfColors = [];
    for (let i = 1; i < 5; i++) {
      arrOfColors[i] = Object.assign({}, hslObject);
    }
    arrOfColors[1].h = Math.floor(Math.random() * 360);
    arrOfColors[2].h = Math.floor(Math.random() * 360);
    arrOfColors[3].s = Math.floor(Math.random() * 360);
    arrOfColors[4].l = Math.floor(Math.random() * 360);
    return arrOfColors;
  } else if (harmony === "shades") {
    console.log("shades");
    const arrOfColors = [];
    for (let i = 1; i < 5; i++) {
      arrOfColors[i] = Object.assign({}, hslObject);
    }
    arrOfColors[1].l = Math.floor(Math.random() * 360);
    arrOfColors[2].l = Math.floor(Math.random() * 360);
    arrOfColors[3].l = Math.floor(Math.random() * 360);
    arrOfColors[4].l = Math.floor(Math.random() * 360);
    return arrOfColors;
  }
}
function controlCenter() {
  const hexCode = findHex();
  const RGB = hexToRgb(hexCode);

  const hsl = rgbToHsl(RGB);
  let h = hsl.h;
  let s = hsl.s;
  let l = hsl.l;
  let hslObject = { h, s, l };
  rgbToHex(RGB);

  const hslArray = selectHarmony(hslObject);
  let rgbArray = [];
  hslArray.forEach((e) => {
    let rgbObj = hslToRgb(e);
    rgbArray.push(rgbObj);
  });

  let hexArray = [];
  rgbArray.forEach((e) => {
    let hexObj = rgbToHex(e);
    hexArray.push(hexObj);
  });

  console.log(hexArray);
  console.log(rgbArray);
  showHex(hexCode, hexArray);
  showColors(hexCode, hexArray);
  showHsl(hsl, hslArray);
  showRgb(RGB, rgbArray);
}

function findHex() {
  const hexCode = document.querySelector("input").value;
  return hexCode;
}
function hexToRgb(hexCode) {
  let red = hexCode.substring(1, 3);
  let green = hexCode.substring(3, 5);
  let blue = hexCode.substring(5, 7);
  console.log(red, green, blue);

  let r = parseInt(`0x${red}`, 16);
  let g = parseInt(`0x${green}`, 16);
  let b = parseInt(`0x${blue}`, 16);

  console.log(r, g, b);
  return { r, g, b };
}
function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  //   console.log("hsl(%f,%f%,%f%)", h, s, l);
  return { h, s, l };
}

function hslToRgb(hsl) {
  let h = hsl.h;
  let s = hsl.s / 100;
  let l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  const rgb = { r, g, b };
  return rgb;
}
function rgbToHex(rgb, RGB2) {
  const redhex = Number(rgb.r).toString(16);
  const greenhex = Number(rgb.g).toString(16);
  const bluehex = Number(rgb.b).toString(16);
  const hex = `#${redhex}${greenhex}${bluehex}`;
  if (hex.length < 2) {
    hex = "0" + hex;
  }

  return hex;
}
function showHex(hexCode, hexArray) {
  const hexDiv0 = document.getElementById("hexDiv0");
  hexDiv0.textContent = `HEX: ${hexCode}`;
  const hexDiv1 = document.getElementById("hexDiv1");
  hexDiv1.textContent = `HEX: ${hexArray[0]}`;
  const hexDiv2 = document.getElementById("hexDiv2");
  hexDiv2.textContent = `HEX: ${hexArray[1]}`;
  const hexDiv3 = document.getElementById("hexDiv3");
  hexDiv3.textContent = `HEX: ${hexArray[2]}`;
  const hexDiv4 = document.getElementById("hexDiv4");
  hexDiv4.textContent = `HEX: ${hexArray[3]}`;
}
function showRgb(rgb, rgbArray) {
  const rgbDiv0 = document.getElementById("rgbDiv0");
  rgbDiv0.textContent = `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const rgbDiv1 = document.getElementById("rgbDiv1");
  rgbDiv1.textContent = `RGB(${rgbArray[0].r}, ${rgbArray[0].g}, ${rgbArray[0].b})`;
  const rgbDiv2 = document.getElementById("rgbDiv2");
  rgbDiv2.textContent = `RGB(${rgbArray[1].r}, ${rgbArray[1].g}, ${rgbArray[1].b})`;
  const rgbDiv3 = document.getElementById("rgbDiv3");
  rgbDiv3.textContent = `RGB(${rgbArray[2].r}, ${rgbArray[2].g}, ${rgbArray[2].b})`;
  const rgbDiv4 = document.getElementById("rgbDiv4");
  rgbDiv4.textContent = `RGB(${rgbArray[3].r}, ${rgbArray[3].g}, ${rgbArray[3].b})`;
  //   const rgbString = rgbDiv.textContent;
  //   return rgbString;
}
function showHsl(hsl, colorArray) {
  const hslDiv0 = document.getElementById("hslDiv0");
  hslDiv0.textContent = `H: ${hsl.h} S: ${hsl.s} L: ${hsl.l}`;
  const hslDiv1 = document.getElementById("hslDiv1");
  hslDiv1.textContent = `H: ${colorArray[1].h} S: ${colorArray[1].s} L: ${colorArray[1].l}`;
  const hslDiv2 = document.getElementById("hslDiv2");
  hslDiv2.textContent = `H: ${colorArray[2].h} S: ${colorArray[2].s} L: ${colorArray[2].l}`;
  const hslDiv3 = document.getElementById("hslDiv3");
  hslDiv3.textContent = `H: ${colorArray[3].h} S: ${colorArray[3].s} L: ${colorArray[3].l}`;
  const hslDiv4 = document.getElementById("hslDiv4");
  hslDiv4.textContent = `H: ${colorArray[4].h} S: ${colorArray[4].s} L: ${colorArray[4].l}`;
}
function showColors(hexCode, hexArray) {
  const box0Display = document.getElementById("color0");
  const box1Display = document.getElementById("color1");
  const box2Display = document.getElementById("color2");
  const box3Display = document.getElementById("color3");
  const box4Display = document.getElementById("color4");
  box0Display.style.backgroundColor = `${hexCode}`;
  box1Display.style.backgroundColor = `${hexArray[0]}`;
  box2Display.style.backgroundColor = `${hexArray[1]}`;
  box3Display.style.backgroundColor = `${hexArray[2]}`;
  box4Display.style.backgroundColor = `${hexArray[3]}`;
}
function bringIntoInterval(number, max) {
  while (number < 0) {
    number = number + max;
  }
}
