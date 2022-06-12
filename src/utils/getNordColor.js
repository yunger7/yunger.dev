import { palette } from "@styles/theme";

export function getNordColor(color) {
	let nordColor;

	switch (color) {
		case "gray":
			nordColor = palette.nord3;
			break;
		case "brown":
			nordColor = "#93726480";
			break;
		case "orange":
			nordColor = palette.nord12;
			break;
		case "yellow":
			nordColor = palette.nord13;
			break;
		case "green":
			nordColor = palette.nord14;
			break;
		case "blue":
			nordColor = palette.nord10;
			break;
		case "purple":
			nordColor = "#9a6dd780";
			break;
		case "pink":
			nordColor = palette.nord15;
			break;
		case "red":
			nordColor = palette.nord11;
			break;
		case "default":
		default:
			nordColor = "inherit";
	}

	return nordColor;
}
