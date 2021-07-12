import db from '../../../core/db';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

export default async function handler(req, res) {
    const urlCode = req.query.urlCode; // ae85c06b-0102-42fc-b993-425673b1aebb
    const SQL = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE urlCode = "${urlCode}" LIMIT 1`;
    try {
        const list = await db.query(SQL);
        if (list.data.length && list.data[0].longUrl) {
            res.redirect(list.data[0].longUrl);
        }
        else {
            res.send('***');
        }
    } catch (error) {
        res.send('NOT_FOUND');
    }
}