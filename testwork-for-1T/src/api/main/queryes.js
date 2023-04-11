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

export const GetPropertyStatus = gql`query {
    property (id: "2850781111748661430") {
      meta
    }
  }
`

export const GetAllTasks = gql`{
  paginate_type2(
    page: 1
    perPage: 100
  ) {
    data {
        id
        name
      property4
      property5
      property6{
        fullname{
          first_name
          last_name
        }
        id
      }
      property8{
        id
      }
    }
  }
}
`

export const GetUserTasks = gql`query
 getUserTasks {
  paginate_subject(page: 1, perPage: 100, where: { column: "user_id", operator: EQ, value: ${currentUserId} }) {
    data {
      id
      type_id
      author_id
      level
      position
      created_at
      updated_at
      user_id
      fullname {
        first_name
        last_name
      }
      property6 {
        id
        name
        property4
        created_at
        property6 {
          id
          fullname {
            first_name
            last_name
          }
        }
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
}`

export const GetUserModules = gql`query getUserModules {
  paginate_subject(page: 1, perPage: 100, where: { column: "user_id", operator: EQ, value: ${currentUserId} }) {
    data {
      id
      type_id
      author_id
      level
      position
      created_at
      updated_at
      user_id
      fullname {
        first_name
        last_name
      }
      property7 {
        id
        name
        created_at
        property7 {
          id
          fullname {
            first_name
            last_name
          }
        }
        property2 {
          date
          time
        }
        property3 {
          date
          time
        }
        property8 {
          id
          property5
        }
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