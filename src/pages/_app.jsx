import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';

import '../assets/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
			</Head>
			<SSRProvider>
				<Component {...pageProps} />
			</SSRProvider>
		</>
	);
}

export default App;
