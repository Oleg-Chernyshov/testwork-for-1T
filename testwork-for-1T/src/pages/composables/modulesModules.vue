<template>
  <div class="modules__table table">
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
import { useQuery } from "@vue/apollo-composable";
import FormAddModule from "components/FormAddModule.vue";
import FormUpdateModule from "src/components/FormUpdateModule.vue";

export default {
  components: {
    FormAddModule,
    FormUpdateModule,
  },

  setup() {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const idModule = ref(0);
    const store = useStore();
    const showForm_addModule = ref(false);
    const showForm_updateModule = ref(false);
    const currentModuleClickUp = ref();
    const currentTaskClickUp = ref();
    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const current_module = reactive({});
    const propertyStatus = reactive({});

    const get_module = function (module_index) {
      current_module.values = MODULES.value[module_index.value];
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
      propertyStatus,
      showForm_updateModule,
      currentModuleClickUp,
      id,
      idModule,
      idUpdateModule,
      showForm_updateModule,
      showForm_addModule,
      MODULES,
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
