const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const app = express();

app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, _ => console.log(`server has started on PORT ${PORT}`))