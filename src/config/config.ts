export const configuration = () => ({
    production: false,
    port: 3000,
    token_secret: 'my_token_secret_word',
    salt: 5,
    multer_destination: './public/static/upload',
    multer_filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + '-' + file.originalname);
    }
});