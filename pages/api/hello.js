// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // req.query.foo === 'bar'
    // console.log('req.params ', req);
    res.json({ name: 'John Doe' });
}
