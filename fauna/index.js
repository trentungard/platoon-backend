const faunadb = require('faunadb');
const q = faunadb.query;
const config = require('../config.js').config;

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

// exports.getUser = () => {
//   return faunaClient.query(
//     q.CreateIndex({
//       name: 'users_by_id',
//       source: q.Collection('User'),
//       terms: [{ field: ['firstName']}]
//     })
//   )
// }

exports.addUser = ({firstName, lastName, userName, undercover, uid, setupComplete}) => {
  return faunaClient.query(
    q.Create(
      q.Collection('User'),
      {
        data: {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          undercover: undercover,
          uid: uid,
          setupComplete: setupComplete
        }
      }
    )
  )
}

exports.removeUser = ({uid}) => {
  faunaClient.query(
    q.Delete(
      q.Ref(q.Collection("User"), "316542557371760705")
    )
  )
  .then((res) => console.log('response', res))
  .catch((e) => console.log('error', e))
}

// faunaClient.query(
//     q.CreateCollection({ name: 'photos' })
// )
//     .then((ret) => console.log(ret))
//     .catch((err) => console.error('Error: %s', err))

exports.faunaClient = faunaClient;