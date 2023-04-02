import gql from "graphql-tag"

export const UserQuery = gql`query User($id: String!) {
	user(id: $id) {
		id
		current_space_id
		email
		name
		surname
		registration_passed
		socials
		spaces
		avatar
		telegram_chat_id
		updated_at
		created_at
		deleted_at
	}
}`