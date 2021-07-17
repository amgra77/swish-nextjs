import { client, buildShort } from '../../../core/db';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

async function getPopular(origin) {
    const SQL = `SELECT id, urlCode, longUrl, counter FROM ${SCHEMA}.${TABLE} ORDER BY counter DESC LIMIT 5`;
    try {
        const list = await client.query(SQL);
        list.data.map(one => {
            one.shortUrl = buildShort(origin, one.urlCode);
        });
        return list.data;
    }
    catch (error) {
        console.error('error ', error);
        return [];
    }
}
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            console.log('req ');
            const list = await getPopular(req.headers.host);
            res.json(list);
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
            break;
    }
}