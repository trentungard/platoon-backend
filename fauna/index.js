const faunadb = require('faunadb');
const q = faunadb.query
const config = require('../config.js').config;

console.log('here', config.db_secret)
if (typeof config.db_secret === 'undefined' || config.db_secret === '') {
    console.error('The FAUNADB_SECRET environment variable is not set, exiting.')
    process.exit(1)
  }
  
//   var mg, domain, port, scheme
//   if ((mg = endpoint.match(/^(https?):\/\/([^:]+)(:(\d+))?/))) {
//     scheme = mg[1] || 'https'
//     domain = mg[2] || 'db.fauna.com'
//     port = mg[4] || 443
//   }
  
const faunaClient = new faunadb.Client({
    secret: config.db_secret,
    domain: 'db.us.fauna.com',
    port: 443
})

  
  // Create a collection called 'myCollection'
faunaClient.query(
    q.CreateCollection({ name: 'photos' })
)
    .then((ret) => console.log(ret))
    .catch((err) => console.error('Error: %s', err))

exports.faunaClient = faunaClient;