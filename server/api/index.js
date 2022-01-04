module.exports = (app) => {
    app.use("/api/content", require("./content"));
} 