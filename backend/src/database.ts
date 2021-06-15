import { createPool } from 'mysql2/promise';
import config from './config'

const connection = async () => {
    const connect = await createPool({
        host: config.MYSQL_HOST,
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        port: 3310,
        connectionLimit: 10
    });

    return connect;

}

export default connection;