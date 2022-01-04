import * as mysql from 'mysql';
import { database_config } from "../config";
import { MySQL_Default_Response } from "../types"


//crearte a connection
const pool = mysql.createPool(database_config);

export const Query = <T = MySQL_Default_Response>(
    sql_string: string, values?: unknown[]) => {

    // callback function includes resolve and reject
    return new Promise<T>((resolve, reject) => {

        const formatted_sql = mysql.format(sql_string, values);
        console.log({ formatted_sql });

        pool.query(formatted_sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}


