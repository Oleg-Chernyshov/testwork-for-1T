<template>
  <div>
    <h5>{{ MODULES[module_index].name }}</h5>

    <q-table
      v-if="!MODULES[module_index].property8.length == 0"
      :rows="MODULES[module_index].property8"
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
            <button
              class="q-mr-sm btn"
              @click.self="set_id($event, props.row)"
              :id="props.row.id"
            >
              Редактировать
            </button>
            <button class="btn" @click="deleteTask(props.row.id)">
              Удалить
            </button>
            <button
              class="btn"
              @click="showForm_filesForm = !showForm_filesForm"
            >
              Файлы
            </button>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-btn
      class="q-mt-sm"
      color="green"
      @click="
        showForm_addTask = !showForm_addTask;
        set_id_module(module_index);
      "
      >Добавить задачу</q-btn
    >
    <div v-if="MODULES[module_index].property8.length == 0">
      Список задач пуст
    </div>

    <q-dialog v-model="showForm_addTask">
      <FormAddTask :idModule="idModule" />
    </q-dialog>

    <q-dialog v-model="showForm_updateTask">
      <FormUpdateTask :task="currentTaskClickUp" :id="id" />
    </q-dialog>

    <q-dialog v-model="showForm_filesForm">
      <FormFiles />
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import FormAddTask from "components/FormAddTask.vue";
import FormUpdateTask from "components/FormUpdateTask.vue";
import FormFiles from "components/Files.vue";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { DeleteTask } from "src/api/main/mutations.js";
import { useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { response } from "../functions/functions";

export default {
  components: {
    FormAddTask,
    FormUpdateTask,
    FormFiles,
  },

  setup() {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const idModule = ref(0);
    const store = useStore();
    const showForm_addTask = ref(false);
    const showForm_updateTask = ref(false);
    const showForm_filesForm = ref(false);
    const currentTaskClickUp = ref();
    const $q = useQuasar();

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

    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);

    const deleteTask = function (id) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(DeleteTask, () => ({
        variables: {
          id: id,
        },
      }));
      response("Задача удалена", "Ошибка", mutate, $q);
    };

    return {
      showForm_addTask,
      showForm_updateTask,
      module_index,
      showForm_filesForm,
      deleteTask,
      id,
      idModule,
      idUpdateModule,
      currentTaskClickUp,
      MODULES,
      columns,
      pagination,
      set_id_module(id) {
        idModule.value = id;
        console.log(id, "sdofjso");
      },
      set_id(env, task) {
        id.value = env.target.id;
        idUpdateModule.value = env.target.id;
        currentTaskClickUp.value = task;
        showForm_updateTask.value = !showForm_updateTask.value;
      },
    };
  },
};
</script>

<style>
.assigned {
  background-color: rgb(199, 21, 160) !important;
}
.accomplished {
  background-color: rgb(235, 220, 20) !important;
}
.completed {
  background-color: rgb(100, 207, 67) !important;
}
</style>
