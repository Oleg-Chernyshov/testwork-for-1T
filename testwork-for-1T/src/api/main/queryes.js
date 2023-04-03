import gql from "graphql-tag"

export const GetAllPages = gql`
    query {
        pages(perPage: 10, page: 1) {
        data {
            id
            parent_id
            page_type
            title
            content
            icon
            level
            is_public
            is_block
            position
            config
            created_at
            updated_at
        object {
            id
            type_id
            }
        }
        paginatorInfo {
            perPage
            count
            total
            currentPage
            from
            to
            lastPage
            hasMorePages
            }
        }
    }
`

export const GetAllTypes = gql`{
    types(perPage: 10, page: 1) {
        data {
            id
            name
            label
            description
            system
            searchable
            id_ai
            author_id
            meta {
                headline
                icon
            }
            created_at
            updated_at
            properties {
                id
                name
                data_type
                label
            }
        }
        paginatorInfo {
            perPage
            currentPage
            lastPage
            total
            count
            from
            to
            hasMorePages
            }
        }
    }
`

export const GetGroupById = gql`query($id: String!){
    get_group(id: $id) {
      name
      subject {
        id
        type_id
        email {
          email
        }
        fullname {
          first_name
          last_name
        }
      }
    }
  }
`
