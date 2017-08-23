import React from "react";
import { gql, graphql } from "react-apollo";
import Timeline from "./timeline/Timeline";
import Reports from "./reports/Reports";
import styled from "styled-components";

export const Container = styled.div`display: flex;`;

class EntriesList extends React.Component {
	render() {
		if (this.props.data.loading) {
			return <p>Loading ...</p>;
		}
		if (this.props.data.error) {
			return (
				<p>
					{this.props.data.error.message}
				</p>
			);
		}

		return (
			<Container>
				<Timeline
					{...this.props}
					entries={this.props.data.user.entries}
				/>
				<Reports entries={this.props.data.user.entries} />
			</Container>
		);
	}
}

export const entriesListQuery = gql`
	query paginateEntries($startDate: DateTime, $endDate: DateTime) {
		user {
			id
			entries(filter: { time_lte: $endDate, time_gte: $startDate }) {
				id
				parentType
				childType
				time
			}
		}
	}
`;

const EntriesListWithData = graphql(entriesListQuery)(EntriesList);

export default EntriesListWithData;
