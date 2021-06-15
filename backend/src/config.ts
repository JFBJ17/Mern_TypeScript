import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.HOST)

export default {
    MYSQL_DATABASE: 'mern_database',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: '',
    MYSQL_HOST: 'localhost'
}