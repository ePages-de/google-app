
var getFirstBrowserLanguage = function () {
	var nav = window.navigator,
	browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
	i,
	language;

	if (Array.isArray(nav.languages)) {
		for (i = 0; i < nav.languages.length; i++) {
			language = nav.languages[i];
			if (language && language.length) {
				return language;
			}
		}
	}
	for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
		language = nav[browserLanguagePropertyKeys[i]];
		if (language && language.length) {
			return language;
		}
	}
	return 'en';
}

const LanguageDetector = {
	type: 'languageDetector',
	init: function() {},
	detect: function() {
		return getFirstBrowserLanguage();
	},
	cacheUserLanguage: function() {} 
};

export default LanguageDetector;
