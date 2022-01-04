const withImages = require('next-images');

module.exports = withImages();
module.exports = {
    reactStrictMode: false,

    async rewrites() {
        return [
            {
                source: "/",
                destination: "/main/"
            },
            {
                source: "/admin",
                destination: "/admin"
            },
        ]
    }
}