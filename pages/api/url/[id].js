import db from '../../../core/db';
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'url_records';

const getOne = async (id, origin) => {
    const SQL = `SELECT id, urlCode, longUrl, counter FROM ${SCHEMA}.${TABLE} WHERE id = "${id}" LIMIT 1`;
    try {
        const list = await db.query(SQL);
        list.data.map(one => one.shortUrl = origin + '/' + one.urlCode);
        return {...list.data[0]}
    } catch (error) {
        return {error: true, message: 'NOT_FOUND'};
    }
};

const deleteOne = async (id) => {
    const SQL = `DELETE FROM ${SCHEMA}.${TABLE} WHERE id = "${id}"`;
    try {
        const deletedResult = await db.query(SQL);
        if (!deletedResult.data.deleted_hashes.length) {
            return {error: true};
        }
        return {};
    } catch (error) {
        return {error: true};
    }
};

export default async function handler(req, res) {
    const id = req.query.id; // ae85c06b-0102-42fc-b993-425673b1aebb
    switch (req.method) {
        case 'GET':
            const item = await getOne(id, 'http://10.0.1.111:3000');
            res.status(item.error ? 401 : 200).json(item);
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