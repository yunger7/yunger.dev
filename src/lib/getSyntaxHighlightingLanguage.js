export function getSyntaxHighlightingLanguage(notionAPILanguage) {
	switch (notionAPILanguage) {
		case "c++":
			return "cpp";
		case "c#":
			return "csharp";
		case "f#":
			return "fsharp";
		case "html":
			return "jsx";
		case "objective-c":
			return "objectivec";
		case "shell":
			return "shellSession";
		case "vb.net":
			return "vbnet";
		case "xml":
			return "xmlDoc";
		case "webassembly":
			return "wasm";
		case "java/c/c++/c#":
			return "java";
		case "plain text":
			return undefined;
		default:
			return notionAPILanguage;
	}
}
