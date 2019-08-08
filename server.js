const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')

const app = express();

//Allow Cross origin
app.use(cors())

// Error handler
const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
	  return next(err);
	}
	const { status } = err;
	res.status(status).json(err);
  };
  app.use(errorHandler);

app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, _ => console.log(`server has started on PORT ${PORT}`))