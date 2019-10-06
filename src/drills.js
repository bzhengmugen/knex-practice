require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
  })
console.log('knex and driver installed correctly')


function searchByName(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        })
}

function searchBypage(pageNumber){
    const limitPerPage = 6;
    const offset = (pageNumber - 1) * limitPerPage;
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(limitPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

function searchByDate(daysAgo){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

function totalCost(){
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}

//searchByDate(2)
//searchByName('bull')
//searchBypage(2)
totalCost()