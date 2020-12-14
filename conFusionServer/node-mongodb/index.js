const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper= require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url,(err,client) => {
    assert.equal(err,null); //assert check if it is null

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db,{name:"Hasan",description:'Deneme'},'dishes',(result)=>{
        console.log('Insert Document : \n',result.ops);
        
        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log('Found Documents: \n',docs);
            
            dboper.updateDocument(db,{name:'Hasan'},{description:'Update desc.'},'dishes',(result)=>{
                console.log('Updated Document : \n',result.result);
                
                dboper.findDocuments(db,'dishes',(docs)=>{
                    console.log('Found Documents: \n',docs);

                    db.dropCollection('dishes',(result) =>{
                        console.log('Drop Collection is :\n',result);

                        client.close();
                    });
                });
            });
        });
    });
});

/* output is like that : 

Connected correctly to server
Inserted 1 documents into the collection dishes
Insert Document :
 [
  {
    name: 'Hasan',
    description: 'Deneme',
    _id: 5fd755dbe6cc180d500fe772
  }
]
Found Documents:
 [
  {
    _id: 5fd755dbe6cc180d500fe772,
    name: 'Hasan',
    description: 'Deneme'
  }
]
Updated the document with  { description: 'Update desc.' }
Updated Document :
 { n: 1, nModified: 1, ok: 1 }
Found Documents:
 [
  {
    _id: 5fd755dbe6cc180d500fe772,
    name: 'Hasan',
    description: 'Update desc.'
  }
]
Drop Collection is :
 null

 */