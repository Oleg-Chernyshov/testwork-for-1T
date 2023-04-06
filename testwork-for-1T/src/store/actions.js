import { useQuery } from "@vue/apollo-composable";
import { GetGroupById } from "src/api/main/queryes";
import gql from "graphql-tag";
import { GetGroupById } from "src/api/main/queryes";

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
      const { onResult } = useQuery(GetGroupById, {"id":"1358489619049103837"});
      onResult((queryResult) => {
        console.log("result",queryResult.data.get_group.subject);
        commit("setSubjects", queryResult.data.get_group.subject)
      });
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

export const GET_RESPONSIBLES = ({ commit }) => {
  const fetching = async () => {
    try {
      let responsible = [];
      const { onResult, refetch } = useQuery(GetGroupById, {
        id: "1358489619049103837",
      });
      onResult((queryResult) => {
        let options = []
        responsible = queryResult.data.get_group.subject
        for (let subject of responsible) {
          options.push(
            subject.fullname?.first_name + " " + subject.fullname?.last_name
          );
        }
        commit("setResponsibles", { responsible: responsible, options: options, refetch: refetch })
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