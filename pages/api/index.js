// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import stats from "../../package.json";

export default function handler(req, res) {
    // req.query.foo === 'bar'
    // console.log('req.params ', req);
    res.json({ name: stats.name, version: stats.version, description: stats.description });
}
