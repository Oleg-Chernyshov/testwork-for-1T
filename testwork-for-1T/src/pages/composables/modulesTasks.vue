<template>
  <!-- Я убрал v-else -->
  <div class="modules__module">
    <h5>{{ MODULES[module_index].name }}</h5>
    <table
      class="modules__table-module table"
      v-if="!MODULES[module_index].property8.length == 0"
    >
      <thead>
        <tr>
          <th>Задача</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Исполнитель</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in MODULES[module_index]?.property8" :key="task.id">
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
                set_id($event, mod, task);
              "
              :id="task.id"
            >
              Редактировать
            </button>
            <button class="btn" @click="deleteTask(task.id)">Удалить</button>
            <button
              class="btn"
              @click="showForm_filesForm = !showForm_filesForm"
            >
              Файлы
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
import { computed, ref } from "vue";
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
import { response } from "../../functions/functions";

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
    const currentModuleClickUp = ref();
    const currentTaskClickUp = ref();
    const $q = useQuasar();

    store.dispatch("GET_MODULES");
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
      set_id_module(id) {
        idModule.value = id;
      },
      set_id(env, mod, task) {
        id.value = env.target.id;
        idUpdateModule.value = env.target.id;
        currentModuleClickUp.value = mod;
        currentTaskClickUp.value = task;
      },
    };
  },
};
</script>

<style></style>
