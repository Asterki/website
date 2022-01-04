const locale = require('locale');

const getLang = (header) => {
	const supported = new locale.Locales(['es', 'en']);
	const locales = new locale.Locales(header);
	let lang = locales.best(supported);

	if (lang.code == 'es') return es;
	if (lang.code == 'en') return en;

	return en_US;
};

const en = require('../../languages/en');
const es = require('../../languages/es');

module.exports = { getLang, es, en };
