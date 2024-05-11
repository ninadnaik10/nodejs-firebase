const express = require('express');

const app = express();

const db = require('./firebase');

app.use(express.json());



app.get('/', async (req, res) => {
    const snapshot = await db.collection('posts').get();
    const posts = snapshot.docs.map(doc => doc.data());
    res.json(posts);
});

app.post('/add', async (req, res) => {
    console.log(req)
    const { title, content } = req.body;
    const snapshot = await db.collection('posts').add({ title, content });
    res.json({ id: snapshot.id });
})

app.listen(3000, () => console.log('Server running on port 3000'));