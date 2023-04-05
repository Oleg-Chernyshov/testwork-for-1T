import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const GET_MODULES = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(
        gql`
					{
  paginate_type1(
    page: 1
    perPage: 100
  ) {
    data {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      property2{
        date
        time
      }
      property3{
        date
        time
      }
      property7{
        fullname{
          first_name
          last_name
        }
      }
      property8{
        name
        id
       property5
        property4
        property6{
          fullname{
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
} `
      );
      onResult(queryResult => {
        commit("setModules", { modules: queryResult.data["paginate_type1"].data, refetch: refetch })
      })
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

export const GET_SUBJECTS = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult } = useQuery(
        gql`
					{
          paginate_subject(page: 1, perPage: 100) {
            data {
              id
              type_id
              author_id
              fullname {
                first_name
                last_name
              }
            }
          }
        }`
      );
      onResult((queryResult) => {
        commit("setSubjects", queryResult.data.paginate_subject.data)
      });
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

export const GET_ID = ({ commit }, id) => {
  commit("SetId", id)
}