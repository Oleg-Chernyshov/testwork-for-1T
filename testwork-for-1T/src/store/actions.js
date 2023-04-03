import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const GET_MODULES = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult } = useQuery(
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
        console.log(queryResult.data["paginate_type1"].data);
        commit("setModules", queryResult.data["paginate_type1"].data)
      })
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}