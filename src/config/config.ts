export const configuration = () => ({
    production: false,
    port: parseInt(process.env.PORT, 10) || 3000,
    token_secret: process.env.TOKEN_SECRET || 'my_token_secret_word',
    salt: process.env.BCRYPT_SALT || 5
});