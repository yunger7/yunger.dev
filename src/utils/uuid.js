function removeDashes(uuid) {
	return uuid.replace(/-/g, "");
}

function addDashes(uuid) {
	return (
		uuid.substr(0, 8) +
		"-" +
		uuid.substr(8, 4) +
		"-" +
		uuid.substr(12, 4) +
		"-" +
		uuid.substr(16, 4) +
		"-" +
		uuid.substr(20)
	);
}

function ensureDashes(uuid) {
	const uuidWithoutDashes = removeDashes(uuid);
	const uuidWithDashes = addDashes(uuidWithoutDashes);

	return uuidWithDashes;
}

export const UUID = {
	removeDashes,
	addDashes,
	ensureDashes,
};
