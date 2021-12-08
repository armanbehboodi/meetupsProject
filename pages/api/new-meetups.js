// how to send request to this server? => /api/new-meetups

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://armanBehboodi:0445473789@cluster0.ufwsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        const close = await client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;