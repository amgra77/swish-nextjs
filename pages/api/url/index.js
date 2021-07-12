import db from '../../../core/db';
import shortId from 'shortid';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

function buildShort(origin, shortUrl) {
    return '//' + origin + '/api/go/' + shortUrl;
}

const getAllUrls = async (origin) => {
    const SQL = `SELECT id, urlCode, longUrl, counter FROM ${SCHEMA}.${TABLE}`;
    try {
        const list = await db.query(SQL);
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

const createUrl = async (longUrl, origin) => {
    const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE longUrl="${longUrl}" LIMIT 1`;
    const exists = await db.query(QUERY);
    if (exists.data.length) {
        const { id, urlCode, longUrl, counter } = exists.data[0];
        const shortUrl = buildShort(origin, urlCode);
        return { id, urlCode, longUrl, shortUrl, counter };
    } else {
        const urlCode = shortId.generate();
        try {
            const newUrl = {
                longUrl,
                urlCode,
                counter: 0,
            };
            const data = await db.insert({
                table: TABLE,
                schema: SCHEMA,
                records: [newUrl],
            });
            return {
                ...newUrl,
                shortUrl: buildShort(origin, urlCode),
                id: data.data.inserted_hashes,
            };
        }
        catch (error) {
            console.error('error ', error);
            return {
                error: true,
                message: 'Cannot insert URL'
            };
        }
    }
}


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const list = await getAllUrls(req.headers.host);
            res.json(list);
            break;
        case 'POST':
            const { longUrl } = req.body;
            const data = await createUrl(longUrl, req.headers.host);
            res.status(data.error ? 405 : 201).json(data);
            break;
        case 'OPTIONS':
            res.setHeader('Allow', ['GET','POST']);
            res.end();
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
            break;
    }
}