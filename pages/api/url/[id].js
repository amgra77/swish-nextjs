import { client, buildShort } from '../../../core/db';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

const getOne = async (id, origin) => {
    const SQL = `SELECT id, urlCode, longUrl, counter FROM ${SCHEMA}.${TABLE} WHERE id = "${id}" LIMIT 1`;
    try {
        const list = await client.query(SQL);
        if (list.data && list.data[0]) {
            const item = list.data[0];
            item.shortUrl = buildShort(origin, item.urlCode);
            return item;
        }
        else {
            throw new Error();
        }
    } catch (error) {
        return {error: true, message: 'NOT_FOUND'};
    }
};

const deleteOne = async (id) => {
    const SQL = `DELETE FROM ${SCHEMA}.${TABLE} WHERE id = "${id}"`;
    try {
        const deletedResult = await client.query(SQL);
        if (!deletedResult.data.deleted_hashes.length) {
            return {error: true};
        }
        return {error: false};
    } catch (error) {
        return {error: true};
    }
};

export default async function handler(req, res) {
    const id = req.query.id; // ae85c06b-0102-42fc-b993-425673b1aebb
    switch (req.method) {
        case 'GET':
            const item = await getOne(id, req.headers.host);
            res.status(item.error ? 404 : 200).json(item);
            break;
        case 'DELETE':
            const deleteResult = await deleteOne(id);
            res.status(deleteResult.error ? 404 : 204).end();
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
            break;
    }
}