import { nordPalette } from "../theme";

export function getNordColor(color) {
  let nordColor;

  switch(color) {
    case "default":
      nordColor = nordPalette.nord1;
      break;
    case "gray":
      nordColor = nordPalette.nord3;
      break;
    case "brown":
      nordColor = "#93726480";
      break;
    case "orange":
      nordColor = nordPalette.nord12;
      break;
    case "yellow":
      nordColor = nordPalette.nord13;
      break;
    case "green":
      nordColor = nordPalette.nord14;
      break;
    case "blue":
      nordColor = nordPalette.nord10;
      break;
    case "purple":
      nordColor = "#9a6dd780";
      break;
    case "pink":
      nordColor = nordPalette.nord15;
      break;
    case "red":
      nordColor = nordPalette.nord11;
      break;
  }

  return nordColor;
}