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
                  if (b.property5 == "3173475364523847130") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              {{
                mod.property8.reduce(function (a, b) {
                  if (b.property5 == "9117798227215343609") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              {{
                mod.property8.reduce(function (a, b) {
                  if (b.property5 == "4106452242288243072") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              <button
                @click.self="
                  showForm_updateModule = !showForm_updateModule;
                  set_id($event);
                "
                class="q-mr-sm"
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
    <div class="modules__module" v-else>
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
                task.property5 == 3173475364523847130
                  ? 'assigned'
                  : task.property5 == 9117798227215343609
                  ? 'accomplished'
                  : 'completed'
              "
            >
              {{
                (function () {
                  if (task.property5 == "3173475364523847130") {
                    return "Назначена";
                  } else if (task.property5 == "9117798227215343609")
                    return "Выполнена";
                  else if (task.property5 == "4106452242288243072")
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
                @click.self="
                  showForm_updateTask = !showForm_updateTask;
                  set_id($event);
                "
                :id="task.id"
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
        @click="
          showForm_addTask = !showForm_addTask;
          set_id_module(module_index);
        "
        >Добавить задачу</q-btn
      >
      <div v-if="MODULES[module_index].property8.length == 0">
        Список задач пуст
      </div>
    </div>
    <q-dialog v-model="showForm_addTask">
      <FormAddTask :idModule="idModule" />
    </q-dialog>
    <q-dialog v-model="showForm_updateTask">
      <FormUpdateTask :id="id" />
    </q-dialog>
    <q-dialog v-model="showForm_addModule">
      <FormAddModule />
    </q-dialog>
    <q-dialog v-model="showForm_updateModule">
      <FormUpdateModule :idUpdateModule="id" />
    </q-dialog>
  </div>
</template>

<script>
import { computed, reactive, watch, ref } from "vue";
import { useStore } from "vuex";
import { GetPropertyStatus } from "src/api/main/queryes";
import { useQuery } from "@vue/apollo-composable";
import FormAddModule from "../components/FormAddModule.vue";
import FormAddTask from "../components/FormAddTask.vue";
import FormUpdateTask from "../components/FormUpdateTask.vue";
import FormUpdateModule from "../components/formUpdateModule.vue";

export default {
  components: {
    FormAddModule,
    FormAddTask,
    FormUpdateTask,
    FormUpdateModule,
  },

  setup(props) {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const idModule = ref(0);
    const showForm_addModule = ref(false);
    const showForm_addTask = ref(false);
    const showForm_updateTask = ref(false);
    const showForm_updateModule = ref(false);
    const store = useStore();
    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const current_module = reactive({});
    const propertyStatus = reactive({});

    const showTableModules = () => {
      return module_index.value <= -1;
    };
    const get_module = function (module_index) {
      current_module.values = MODULES.value[module_index.value];
      console.log(current_module);
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
      showForm_addTask,
      showForm_addModule,
      MODULES,
      current_module,
      showTableModules,
      module_index,
      propertyStatus,
      showForm_updateTask,
      showForm_updateModule,
      id,
      idModule,
      idUpdateModule,
      set_id_module(id) {
        idModule.value = id;
      },
      set_id(env) {
        id.value = env.target.id;
        idUpdateModule.value = env.target.id;
      },
    };
  },
};
</script>

<style lang="scss">
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
