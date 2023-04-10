import { useQuery } from "@vue/apollo-composable";
import { GetGroupById, GetAllTasks } from "src/api/main/queryes";
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
        let options = []
        let modules = queryResult.data["paginate_type1"].data
        for (let module of modules) {
          options.push(
            module.name
          );
        }
        commit("setModules", { modules: modules, refetch: refetch, optionsModules: options })
      })
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

// export const GET_SUBJECTS = ({ commit }) => {
//   const fetching = async () => {
//     try {
//       const { onResult } = useQuery(GetGroupById, { "id": "1358489619049103837" });
//       onResult((queryResult) => {
//         commit("setSubjects", queryResult.data.get_group.subject)
//       });
//     } catch (e) {
//       console.log("Ошибка:", e);
//     }
//   };
//   fetching();
// }

export const GET_RESPONSIBLES = ({ commit }) => {
  const fetching = async () => {
    try {
      let responsibles = [];
      const { onResult, refetch } = useQuery(GetGroupById, {
        id: "3662509860808044515",
      });
      onResult((queryResult) => {
        let options = []
        responsibles = queryResult.data.get_group.subject
        for (let subject of responsibles) {
          options.push(
            subject.fullname?.first_name + " " + subject.fullname?.last_name
          );
        }
        commit("setResponsibles", { responsibles: responsibles, optionsForResponsibles: options, refetch: refetch })
      });
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

export const GET_EXECUTORS = ({ commit }) => {
  const fetching = async () => {
    try {
      let executors = [];
      const { onResult, refetch } = useQuery(GetGroupById, {
        id: "4428325871296613250",
      });
      onResult((queryResult) => {
        let options = []
        executors = queryResult.data.get_group.subject
        for (let subject of executors) {
          options.push(
            subject.fullname?.first_name + " " + subject.fullname?.last_name
          );
        }
        console.log(123);
        commit("setExecutors", { executors: executors, optionsForExecutors: options, refetch: refetch })
      });
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

export const GET_ALL_TASKS = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(GetAllTasks);
      onResult((queryResult) => {
        commit("setAllTasks", { allTasks: queryResult.data.paginate_type2.data, refetch: refetch })
      });
    } catch (e) {
      console.log("Ошибка:", e);
    }
  };
  fetching();
}

export const GET_ALL_TASKS = ({ commit }) => {
  const fetching = async () => {
    try {
      const { onResult, refetch } = useQuery(GetAllTasks);
      onResult((queryResult) => {
        commit("setAllTasks", { allTasks: queryResult.data.paginate_type2.data, refetch: refetch })
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