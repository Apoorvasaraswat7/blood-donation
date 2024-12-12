const dbConnect = require('./mongodb');

const update = async () => {
    const db = await dbConnect();
    const result = await db.updateOne(
        { name: 'mahesh' }, {
        $set: { name: 'dinesh', age: '60' },
    }
    );
    console.warn(result);
}

update();