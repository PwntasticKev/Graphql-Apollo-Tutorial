const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios')

// create a schema related to your data. structure based on your api or your database

//Launch Type
const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		flight_number: { type: GraphQLInt },
		mission_name: { type: GraphQLString },
		launch_year: { type: GraphQLString },
		launch_date_local: { type: GraphQLString },
		launch_success: { type: GraphQLBoolean },
		rocket: { type: RocketType },
	})
})

// Rocket Type

const RocketType = new GraphQLObjectType({
	name: 'Rocket',
	fields: () => ({
		rocket_id: { type: GraphQLString },
		rocket_name: { type: GraphQLString },
		rocket_type: { type: GraphQLString },
	})
})

//Root Query

const RootQuery = new GraphQLObjectType({
		name: "RootQueryType",
		fields: {
			launches: {
				type: new GraphQLList(LaunchType),
				resolve( parent, args ) {
					//inside here is where we get our data
					return axios.get(`https://api.spacexdata.com/v3/launches`).then(res => res.data)
				}
			},
			launch: {
				type: LaunchType,
				args: {
					flight_number: { type: GraphQLInt }
				},
				resolve( parent, args ) {
					return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res=> res.data)
				}
			},
			rockets: {
				type: new GraphQLList(RocketType),
				resolve( parent, args ) {
					//inside here is where we get our data
					return axios.get(`https://api.spacexdata.com/v3/rockets`).then(res => res.data)
				}
			},
			rocket: {
				type: RocketType,
				args: {
					rocket_id: { type: GraphQLString }
				},
				resolve( parent, args ) {
					return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`).then(res=> res.data)
				}
			}
		}
	})

module.exports = new GraphQLSchema({
	// mutations go here
	query: RootQuery
})