const express = require('express');
const cors = require('cors');
const { getLang } = require('../utils/language');

const router = express.Router();

router.use(cors());

router.get('/language', (req, res) => {
	if (!req.body.page || !req.body.category) return res.status(403).send({ error: 'No page specified' });
	let lang = getLang(req.headers['accept-language']);

	return res.status(200).send({ lang: lang[req.body.category][req.body.page] });
});

module.exports = router;
