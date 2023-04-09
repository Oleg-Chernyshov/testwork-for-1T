<template>
  <q-page class="">
    <div class="modules__module">
      <h5>ВСЕ ЗАДАЧИ</h5>
      <table class="modules__table-module table" v-if="!allTasks.length == 0">
        <thead>
          <tr>
            <th>Задача</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Исполнитель</th>
            <!-- <th>Действия</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in allTasks" :key="task.id">
            <td>{{ task.name }}</td>
            <td>
              {{ task.property4 }}
            </td>
            <td
              :class="
                task.property5 == 1700970386717883161
                  ? 'assigned'
                  : task.property5 == 967659251654331262
                  ? 'accomplished'
                  : 'completed'
              "
            >
              {{
                (function () {
                  if (task.property5 == "1700970386717883161") {
                    return "Назначена";
                  } else if (task.property5 == "967659251654331262")
                    return "Выполнена";
                  else if (task.property5 == "1383309069201480491")
                    return "Завершена";
                })()
              }}
            </td>
            <td>
              {{
                task.property6?.fullname.first_name +
                " " +
                task.property6?.fullname.last_name
              }}
            </td>
            <td>
              <button
                class="q-mr-sm btn"
                @click.self="
                  showForm_updateTask = !showForm_updateTask;
                  set_id(task);
                "
              >
                Редактировать
              </button>
              <!-- <button class="btn" @click="deleteTask(task.id)">Удалить</button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>Список задач пуст</div>
      <!-- <q-btn
        class="q-mt-sm"
        color="primary"
        @click="
          showForm_addTask = !showForm_addTask;
          set_id_module(module_index);
        "
        >Добавить задачу</q-btn
      > -->
    </div>
    <q-dialog v-model="showForm_updateTask">
      <FormUpdateTask :task="currentTaskClickUp" />
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, reactive, watch, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import FormUpdateTask from "../components/FormUpdateTask.vue";
const currentTaskClickUp = ref();
import { GetPropertyStatus } from "src/api/main/queryes";
import { DeleteTask } from "src/api/main/mutations";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import FormAddModule from "../components/FormAddModule.vue";
import FormAddTask from "../components/FormAddTask.vue";
import FormUpdateModule from "../components/formUpdateModule.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  components: {
    FormUpdateTask,
  },
  setup() {
    const showForm_updateTask = ref(false);
    const store = useStore();
    store.dispatch("GET_ALL_TASKS");
    const allTasks = computed(() => store.getters.ALL_TASKS);
    const refetchTasks = computed(() => store.getters.REFETCH_MODULES);

    return {
      allTasks,
      showForm_updateTask,
      currentTaskClickUp,
      set_id(task) {
        currentTaskClickUp.value = task;
      },
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
</style>
