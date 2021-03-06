import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CreateUser from "./components/CreateUser";
import CreateBaby from "./components/CreateBaby";
import Account from "./components/Account";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
	ApolloClient,
	ApolloProvider,
	createNetworkInterface
} from "react-apollo";
import "./index.css";

const networkInterface = createNetworkInterface({
	uri: process.env.REACT_APP_ENDPOINT
});

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([
	{
		applyMiddleware(req, next) {
			if (!req.options.headers) {
				req.options.headers = {};
			}

			// get the authentication token from local storage if it exists
			if (localStorage.getItem("auth0IdToken")) {
				req.options.headers.authorization = `Bearer ${localStorage.getItem(
					"auth0IdToken"
				)}`;
			}
			next();
		}
	}
]);

const client = new ApolloClient({
	networkInterface
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/signup" component={CreateUser} />
				<Route path="/baby" component={CreateBaby} />
				<Route path="/account" component={Account} />
			</div>
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);
