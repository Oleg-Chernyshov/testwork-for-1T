<template>
  <div class="modules">
    <h5>Modules</h5>
    <div class="modules__table">
      <table class="table">
        <thead>
          <tr>
            <th>Модуль</th>
            <th>Ответственный</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Назначенные задачи</th>
            <th>Выполненыне задачи</th>
            <th>Завершеныне задачи</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="module in MODULES" :key="module.id">
            <td>{{ module.name }}</td>
            <td>
              {{
                module.property7.fullname.first_name +
                " " +
                module.property7.fullname.last_name
              }}
            </td>
            <td>{{ module.property2.date + " " + module.property2.time }}</td>
            <td>{{ module.property3.date + " " + module.property3.time }}</td>
            <td>
              {{
                module.property8.reduce(function (a, b) {
                  if (b.property5 == "3173475364523847130") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              {{
                module.property8.reduce(function (a, b) {
                  if (b.property5 == "9117798227215343609") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              {{
                module.property8.reduce(function (a, b) {
                  if (b.property5 == "4106452242288243072") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
          </tr>
        </tbody>
      </table>
      {{ current_module.values }}
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  components: {},

  setup(props) {
    console.log("props", props);
    const store = useStore();
    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const current_module = reactive({});

    const get_module = function (module_index) {
      // const { onResult } = useQuery(
      //   gql`
      //     {
      //       get_type1(id: MODULES[module_index]) {
      //         id
      //         name
      //         author_id
      //         property8 {
      //           name
      //           property4
      //           property5
      //         }
      //       }
      //     }
      //   `
      // );
      // onResult((queryResult) => {
      //   current_module.values = queryResult.data;
      // });
      current_module.values = MODULES.value[module_index.value];
      console.log(MODULES.value[module_index.value]);
    };

    watch(
      () => store.getters.MODULE_INDEX,
      () => get_module(module_index)
    );

    return {
      MODULES,
      current_module,
    };
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
}
.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #d8d8d8;
  font-size: 14px;
}
.table thead tr th:first-child {
  border-radius: 8px 0 0 8px;
}
.table thead tr th:last-child {
  border-radius: 0 8px 8px 0;
}
.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.table tbody tr:nth-child(even) {
  background: #f3f3f3;
}
.table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
.table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
}
</style>
