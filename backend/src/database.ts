import { Pool } from "pg";
import dotenv from 'dotenv';

// dotenv.config({path: '.env'});
dotenv.config({path: '.env'});


const keys = {
        host: process.env.HOST_DB ,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE_DB,
        port: process.env.PORT_DB,
        ssl: {
            rejectUnauthorized: false,
            ca: process.env.CA_CERTIFICATE
        }
}


export const db = new Pool(keys);


db.connect((err, client, release) => {
    if (err) {
        return console.error('Error en la conexión', err.stack)
    }else{
        return console.log('base de datos conectada')
    }
})