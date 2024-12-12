const dbConnect = require('./mongodb');

const insert = async()=>{
    const db = await dbConnect();
    const result = await db.insert(
        [
            {name:'max 5',price:"10000"},
            {name:'redmi',price:"10500"},
            {name:'vivo',price:"11000"},
            {name:'v 19',price:"12000"},
        ]
    );
}

insert();