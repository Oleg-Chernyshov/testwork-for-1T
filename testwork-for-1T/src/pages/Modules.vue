<template>
  <div class="modules q-pa-md">
    <div class="modules__table table" v-if="showTableModules()">
      <table class="modules__table-modules">
        <thead>
          <tr>
            <th>Модуль</th>
            <th>Ответственный</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Назначенные задачи</th>
            <th>Выполненыне задачи</th>
            <th>Завершеныне задачи</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mod in MODULES" :key="mod.id">
            <td>{{ mod.name }}</td>
            <td>
              {{
                mod.property7?.fullname.first_name +
                " " +
                mod.property7?.fullname.last_name
              }}
            </td>
            <td>{{ mod.property2?.date + " " + mod.property2?.time }}</td>
            <td>{{ mod.property3?.date + " " + mod.property3?.time }}</td>
            <td>
              {{
                mod.property8.reduce(function (a, b) {
                  if (b.property5 == "1700970386717883161") {
                    return ++a;
                  } else return a;
                }, 0)
              }}
            </td>
            <td>
              {{
                mod.property8.reduce(function (a, b) {
                  if (b.property5 == "967659251654331262") {
                    return ++a;
                  } else return a;
                }, 0)
              }}
            </td>
            <td>
              {{
                mod.property8.reduce(function (a, b) {
                  if (b.property5 == "1383309069201480491") {
                    return ++a;
                  } else return a;
                }, 0)
              }}
            </td>
            <td>
              <button
                @click.self="
                  showForm_updateModule = !showForm_updateModule;
                  set_id($event, mod, task);
                "
                class="q-mr-sm btn"
                :id="mod.id"
              >
                Редактировать
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <q-btn
        class="q-mt-sm"
        color="primary"
        @click="showForm_addModule = !showForm_addModule"
        >Добавить модуль</q-btn
      >
    </div>
   
    <modulesModule v-else />

    
    
    <q-dialog v-model="showForm_addModule">
      <FormAddModule />
    </q-dialog>
    <q-dialog v-model="showForm_updateModule">
      <FormUpdateModule :mod="currentModuleClickUp" :idUpdateModule="id" />
    </q-dialog>

  </div>
</template>

<script>
import { computed, reactive, watch, ref } from "vue";
import { useStore } from "vuex";
import { GetPropertyStatus } from "src/api/main/queryes";
import { DeleteTask } from "src/api/main/mutations";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import FormAddModule from "../components/FormAddModule.vue";
import FormAddTask from "../components/FormAddTask.vue";
import FormUpdateTask from "../components/FormUpdateTask.vue";
import FormUpdateModule from "../components/formUpdateModule.vue";
import modulesModule from "../pages/composables/modulesModule.vue"
import { useQuasar } from "quasar";

export default {
  components: {
    FormAddModule,
    FormAddTask,
    FormUpdateTask,
    FormUpdateModule,
    modulesModule
  },

  setup() {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const idModule = ref(0);
    const store = useStore();
    const showForm_updateModule = ref(false);
    const currentModuleClickUp = ref();
    const currentTaskClickUp = ref();
    store.dispatch("GET_MODULES");
    const refetchModules = computed(() => store.getters.REFETCH_MODULES);
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const current_module = reactive({});
    const propertyStatus = reactive({});
    const $q = useQuasar();

    const showTableModules = () => {
      return module_index.value <= -1;
    };
    const get_module = function (module_index) {
      current_module.values = MODULES.value[module_index.value];
    };

    const refetchModulesSetTimeout = function () {
      setTimeout(refetchModules.value, 1000);
    };

    const deleteTask = function (id) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(DeleteTask, () => ({
        variables: {
          id: id,
        },
      }));
      mutate();
      $q.notify({
        type: "positive",
        message: "Задача удалена",
      });
      refetchModulesSetTimeout();
    };

    //Получение свойства Status для определения статуса задачи по id
    const { onResult } = useQuery(GetPropertyStatus);
    onResult((queryResult) => {
      propertyStatus.values = queryResult.data.property.meta.options;
    });

    watch(
      () => store.getters.MODULE_INDEX,
      () => get_module(module_index)
    );
    return {
      current_module,
      showTableModules,
      propertyStatus,
      showForm_updateModule,
      currentModuleClickUp,
      currentTaskClickUp,
      id,
      idModule,
      idUpdateModule,
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

<style lang="scss">
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
