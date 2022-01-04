import Document, { Html, Head, Main, NextScript } from 'next/document';

class MainDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                    <meta property="og:image" content="/assets/images/icon.png" />
                    <meta property="og:url" content="https://asterki.ml/" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"></link>
                </Head>
                <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MainDocument;
