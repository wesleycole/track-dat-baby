import React from "react";
import { gql, graphql } from "react-apollo";
import Timeline from "./timeline/Timeline";
import Reports from "./reports/Reports";
import styled from "styled-components";

export const Container = styled.div`display: flex;`;

const EntriesList = props => {
	if (props.data.loading) {
		return <p>Loading ...</p>;
	}
	if (props.data.error) {
		return (
			<p>
				{props.data.error.message}
			</p>
		);
	}

	return (
		<Container>
			<Timeline {...props} entries={props.data.user.baby.entries} />
			<Reports entries={props.data.user.baby.entries} />
		</Container>
	);
};

export const entriesListQuery = gql`
	query paginateEntries($startDate: DateTime, $endDate: DateTime) {
		user {
			id
			baby {
				id
				entries(
					orderBy: time_ASC
					filter: { time_lte: $endDate, time_gte: $startDate }
				) {
					id
					parentType
					childType
					time
				}
			}
		}
	}
`;

const EntriesListWithData = graphql(entriesListQuery)(EntriesList);

export default EntriesListWithData;
