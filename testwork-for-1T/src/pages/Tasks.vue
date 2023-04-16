<template>
  <q-page class="">
    <div class="modules__module">
      <h5>ВСЕ ЗАДАЧИ</h5>
      <q-table v-if="!allTasks.length == 0"
      :rows="allTasks"
      :columns="columns"
      :pagination="pagination"
      :pagination-labels="{rowsPerPage: 'Строк на странице', rowsPerPageAll: 'Все'}"
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
                props.row.property5 == 1700970386717883161
                  ? 'assigned'
                  : props.row.property5 == 967659251654331262
                  ? 'accomplished'
                  : 'completed'
              "
            >
              {{
                (function () {
                  if (props.row.property5 == "1700970386717883161") {
                    return "Назначена";
                  } else if (props.row.property5 == "967659251654331262")
                    return "Выполнена";
                  else if (props.row.property5 == "1383309069201480491")
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
import FormUpdateTask from "../components/FormUpdateTask.vue";
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { getClientOptions } from "src/apollo/index";
import { updateUser } from "../api/main/mutations";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { response } from "../functions/functions";

export default defineComponent({
  components: {
    FormUpdateTask,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const currentTaskClickUp = ref();

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: 'name',
    })


  const columns = [
  { name: 'Задача', align: 'left', label: 'Задача', field: 'Задача' },
  { name: 'Описание', align: 'left', label: 'Описание', field: 'Описание'  },
  { name: 'Статус', align: 'left', label: 'Статус', field: 'Статус',  },
  { name: 'Исполнитель', align: 'left', label: 'Исполнитель', field: 'Исполнитель'},
  { name: 'Действия', align: 'left', label: 'Действия', field: 'Действия' },
]

    store.dispatch("GET_ALL_TASKS");  
    const allTasks = computed(() => store.getters.ALL_TASKS);

    const updateTask = function (task) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(updateUser, () => ({
        variables: {
          input: {
            name: task.name,
            property4: task.property4,
            property5: "967659251654331262",
            property6: {
              "2598174384277431501": task.property6.id,
            },
            property8: {
              "2673961667589284866": task.property8.id,
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
