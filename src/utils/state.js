// https://stackoverflow.com/a/38134374/2339010
// https://stackoverflow.com/a/35450003/2339010

function encodeState(state) {
	return btoa(JSON.stringify(state));
}

function decodeState(encodedState) {
	if (!encodedState) {
		return {};
	}
	return JSON.parse(atob(encodedState));
}

export { encodeState, decodeState };
