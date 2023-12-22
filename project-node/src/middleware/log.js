export const log = (req, res, next) => {
    res.on("finish", () => {
        const date = new Date();
        console.log(
            `[${new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
            ).toISOString()}] From: ${req.ip} -> Request: ${req.method} ${
                req.originalUrl
            } -> ${res.statusCode}`
        );
    });

    next();
};
