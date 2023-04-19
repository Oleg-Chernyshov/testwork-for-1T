<template>
  <q-page class="">
    <div class="modules__module">
      <h5>ВСЕ ЗАДАЧИ</h5>
      <q-table
        v-if="!allTasks.length == 0"
        class="q-mx-lg"
        :rows="allTasks"
        :columns="columns"
        :pagination="pagination"
        :pagination-labels="{
          rowsPerPage: 'Строк на странице',
          rowsPerPageAll: 'Все',
        }"
        :rows-per-page-options="[5, 10, 20]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>{{ props.row.name }}</q-td>

            <q-td>
              {{ props.row.property4 }}
            </q-td>

            <q-td
              :class="
                props.row.property5 == 4900427590773954314
                  ? 'assigned'
                  : props.row.property5 == 2492600062570616217
                  ? 'accomplished'
                  : 'completed'
              "
            >
              {{
                (function () {
                  if (props.row.property5 == "4900427590773954314") {
                    return "Назначена";
                  } else if (props.row.property5 == "2492600062570616217")
                    return "Выполнена";
                  else if (props.row.property5 == "3524495676216750814")
                    return "Завершена";
                })()
              }}
            </q-td>

            <q-td>
              {{
                props.row.property6?.fullname.first_name +
                " " +
                props.row.property6?.fullname.last_name
              }}
            </q-td>

            <q-td>
              <button class="q-mr-sm btn" @click.self="updateTask(props.row)">
                Выполнена
              </button>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div v-else>Список задач пуст</div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { getClientOptions } from "src/apollo/index";
import { updateUser } from "../api/main/mutations";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";

export default defineComponent({
  setup() {
    const store = useStore();
    const currentTaskClickUp = ref();

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: "name",
    });

    const columns = [
      { name: "Задача", align: "left", label: "Задача", field: "Задача" },
      { name: "Описание", align: "left", label: "Описание", field: "Описание" },
      { name: "Статус", align: "left", label: "Статус", field: "Статус" },
      {
        name: "Исполнитель",
        align: "left",
        label: "Исполнитель",
        field: "Исполнитель",
      },
      { name: "Действия", align: "left", label: "Действия", field: "Действия" },
    ];
    console.log(process.env.VUE_APP_API_URL);
    const allTasks = computed(() => store.getters.ALL_TASKS);

    const updateTask = function (task) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(updateUser, () => ({
        variables: {
          input: {
            name: task.name,
            property4: task.property4,
            property5: "2492600062570616217",
            property6: {
              "3922421966920449006": task.property6.id,
            },
            property8: {
              "1998660948760442394": task.property8.id,
            },
          },
          id: task.id,
        },
      }));
      mutate();
    };

    return {
      allTasks,
      updateTask,
      currentTaskClickUp,
      columns,
      pagination,
    };
  },
});
</script>

<style scoped lang="scss">
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

button.btn {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-block;
  width: 130px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 8px 16px;
  margin: 0 20px 0 0;
  text-decoration: none;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
}
button.btn {
  background-color: rgb(62, 123, 255);
  border: 1px solid rgb(0, 0, 0);
}

button.btn:hover {
  background-color: rgb(26, 80, 161);
}

.assigned {
  background-color: rgb(199, 21, 160);
}
.accomplished {
  background-color: rgb(235, 220, 20);
}
.completed {
  background-color: rgb(100, 207, 67);
}
</style>
