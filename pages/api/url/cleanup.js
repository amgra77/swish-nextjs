import { client, buildShort } from '../../../core/db';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

async function cleanUp() {
    const SQL = `DELETE FROM ${SCHEMA}.${TABLE} WHERE longUrl IS NULL`;
    try {
        await client.query(SQL);
    }
    catch (error) {
        console.error('error ', error);
    }
}
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await cleanUp();
            res.end()
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
            break;
    }
}