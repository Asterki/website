const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

	app.use(cookieParser());
	app.disable('x-powered-by');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(express.static('../public'));
	app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

    require('./api/index.js')(app);

	app.all('*', (req, res) => {
		return handle(req, res);
	});

	app.listen(PORT, () => {
		console.log(`> Ready on http://localhost:${PORT}`);
	});
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})
