import dotenv from 'dotenv';
dotenv.config();

export default {
    MYSQL_DATABASE: process.env.DATABASE,
    MYSQL_USER: process.env.USER,
    MYSQL_PASSWORD: process.env.PASSWORD,
    MYSQL_HOST: process.env.HOST
}