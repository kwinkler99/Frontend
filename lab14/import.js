const normalizr = require('normalizr');
const axios = require('axios');


const idSchema = new normalizr.schema.Entity('id', {}, {
    idAttribute: '_id'
})

const titleSchema = new normalizr.schema.Entity('title')


const articleSchema = new normalizr.schema.Entity('article', {
    id: idSchema,
    title: titleSchema
});


axios.get('https://inf.ug.edu.pl/~wlojkowski/assets/files/fd/articles.json')
.then(res => {
    const normalizedData = normalizr.normalize(res.data, [articleSchema]);
    // const result = normalizedData.reduce((acc, curr) => {
    //     console.log(curr)
    //     //acc[entities][articles][allIds].push(curr)
    // }, {entities: {articles: { allIds: [], byId: {} }}})

    console.log(normalizedData)

})
.catch(err => console.log(err))

