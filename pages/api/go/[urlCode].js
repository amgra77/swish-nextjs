import db from '../../../core/db';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

export default async function handler(req, res) {
    const urlCode = req.query.urlCode; // ae85c06b-0102-42fc-b993-425673b1aebb
    const SQL = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE urlCode = "${urlCode}" LIMIT 1`;

    async function increaseCounter(item) {
        const counter = item.counter + 1;
        const SQL = `UPDATE ${SCHEMA}.${TABLE} SET counter=${counter} WHERE id="${item.id}"`;
        await db.query(SQL);    
    };

    try {
        const list = await db.query(SQL);
        if (list.data.length && list.data[0].longUrl) {
            const current = list.data[0];
            res.redirect(current.longUrl);
            await increaseCounter(current);
        }
        else {
            res.status(404).send('NOT_FOUND');
        }
    } catch (error) {
        res.status(404).send('NOT_FOUND');
    }
}