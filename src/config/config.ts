export const configuration = () => ({
    production: false,
    port: 3000,
    token_secret: 'my_token_secret_word',
    salt: 5,
    multer_destination: './static/upload',
    multer_filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
});