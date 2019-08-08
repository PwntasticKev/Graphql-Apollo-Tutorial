import React from 'react';
import './App.css';
import logo from './apollo.png'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Launches from './components/launches'

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
	  <ApolloProvider client={client}>
		<div className="container">
			<img src={ logo } alt="" style={{ width: "300px" }}/>
			<Launches/>
		</div>
	</ApolloProvider>
  );
}

export default App;
